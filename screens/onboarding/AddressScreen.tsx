import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PostAuthOnboardingStackParamList } from '@/screens/navigation/PostAuthOnboardingNavigator';
import OnboardingScreenBase from '@/components/onboarding/OnboardingScreenBase';
import Colors from '@/constants/Colors';
import { Fonts, Typography } from '@/constants/typography';
import { useAuth } from '@/services/auth/hooks';
import TextInput from '@/components/ui/TextInput';

type AddressScreenNavigationProp = StackNavigationProp<
    PostAuthOnboardingStackParamList,
    'Address'
>;

interface AddressScreenProps {
    navigation: AddressScreenNavigationProp;
}

const AddressScreen: React.FC<AddressScreenProps> = ({ navigation }) => {
    const { user, updateUser } = useAuth();
    const [street, setStreet] = useState(user?.profile.address?.street || '');
    const [city, setCity] = useState(user?.profile.address?.city || '');
    const [state, setState] = useState(user?.profile.address?.state || '');
    const [zipCode, setZipCode] = useState(user?.profile.address?.zipCode || '');

    const handleNext = async () => {
        if (street && city && state && zipCode) {
            await updateUser({
                profile: {
                    ...user?.profile,
                    address: { street, city, state, zipCode }
                }
            });
            navigation.navigate('PhoneNumber');
        } else {
        }
    };

    return (
        <OnboardingScreenBase
            title="Your Address"
            currentStep={2}
            totalSteps={5}
            onNext={handleNext}
            onBack={() => navigation.goBack()}
        >
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Street Address"
                    value={street}
                    onChangeText={setStreet}
                />
                <TextInput
                    style={styles.input}
                    placeholder="City"
                    value={city}
                    onChangeText={setCity}
                />
                <TextInput
                    style={styles.input}
                    placeholder="State"
                    value={state}
                    onChangeText={setState}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Zip Code"
                    value={zipCode}
                    onChangeText={setZipCode}
                    keyboardType="numeric"
                />
            </View>
        </OnboardingScreenBase>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.design.mutedText,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginBottom: 10,
        fontFamily: Fonts.Inter_600SemiBold,
        fontSize: Typography.body,
    },
});

export default AddressScreen;