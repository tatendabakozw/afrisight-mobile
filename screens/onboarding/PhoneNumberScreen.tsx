import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PostAuthOnboardingStackParamList } from '@/screens/navigation/PostAuthOnboardingNavigator';
import OnboardingScreenBase from '@/components/onboarding/OnboardingScreenBase';
import Colors from '@/constants/Colors';
import { Fonts, Typography } from '@/constants/typography';
import { useAuth } from '@/services/auth/hooks';
import TextInput from '@/components/ui/TextInput';

type PhoneNumberScreenNavigationProp = StackNavigationProp<
    PostAuthOnboardingStackParamList,
    'PhoneNumber'
>;

interface PhoneNumberScreenProps {
    navigation: PhoneNumberScreenNavigationProp;
}

const PhoneNumberScreen: React.FC<PhoneNumberScreenProps> = ({ navigation }) => {
    const { user, updateUser } = useAuth();
    const [phoneNumber, setPhoneNumber] = useState(user?.profile.phoneNumber || '');

    const handleNext = async () => {
        if (phoneNumber.trim()) {
            await updateUser({ profile: { ...user?.profile, phoneNumber } });
            navigation.navigate('ProfilePicture');
        } else {
            // Show error message
        }
    };

    return (
        <OnboardingScreenBase
            title="Phone Number"
            currentStep={3}
            totalSteps={5}
            onNext={handleNext}
            onBack={() => navigation.goBack()}
        >
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
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
        borderRadius: 16,
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginBottom: 10,
        fontFamily: Fonts.Inter_600SemiBold,
        fontSize: Typography.body,
    },
});

export default PhoneNumberScreen;