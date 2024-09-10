import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PostAuthOnboardingStackParamList } from '@/screens/navigation/PostAuthOnboardingNavigator';
import OnboardingScreenBase from '@/components/onboarding/OnboardingScreenBase';
import Colors from '@/constants/Colors';
import { Fonts, Typography } from '@/constants/typography';
import { useAuth } from '@/services/auth/hooks';
import TextInput from '@/components/ui/TextInput';

type PersonalInfoScreenNavigationProp = StackNavigationProp<
    PostAuthOnboardingStackParamList,
    'PersonalInfo'
>;

interface PersonalInfoScreenProps {
    navigation: PersonalInfoScreenNavigationProp;
}

const PersonalInfoScreen: React.FC<PersonalInfoScreenProps> = ({ navigation }) => {
    const { user, updateUser } = useAuth();
    const [firstName, setFirstName] = useState(user?.profile.firstname || '');
    const [surname, setSurname] = useState(user?.profile.surname || '');

    const handleNext = async () => {
        if (firstName.trim() && surname.trim()) {
            await updateUser({ profile: { ...user?.profile, firstname: firstName, surname: surname } });
            navigation.navigate('Bio');
        } else {
            // Show error message
        }
    };

    return (
        <OnboardingScreenBase
            title="Personal Information"
            currentStep={0}
            totalSteps={5}
            onNext={handleNext}
        >
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    value={firstName}
                    onChangeText={setFirstName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Surname"
                    value={surname}
                    onChangeText={setSurname}
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
        borderColor: Colors.design.mutedText,
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginBottom: 10,
        fontFamily: Fonts.Inter_600SemiBold,
        fontSize: Typography.body,
        borderRadius: 16
    },
});

export default PersonalInfoScreen;