import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PostAuthOnboardingStackParamList } from '@/screens/navigation/PostAuthOnboardingNavigator';
import OnboardingScreenBase from '@/components/onboarding/OnboardingScreenBase';
import Colors from '@/constants/Colors';
import { Fonts, Typography } from '@/constants/typography';
import { useAuth } from '@/services/auth/hooks';
import TextInput from '@/components/ui/TextInput';

type BioScreenNavigationProp = StackNavigationProp<
    PostAuthOnboardingStackParamList,
    'Bio'
>;

interface BioScreenProps {
    navigation: BioScreenNavigationProp;
}

const BioScreen: React.FC<BioScreenProps> = ({ navigation }) => {
    const { user, updateUser } = useAuth();
    const [bio, setBio] = useState(user?.profile.bio || '');

    const handleNext = async () => {
        if (bio.trim()) {
            await updateUser({ profile: { ...user?.profile, bio } });
            navigation.navigate('Address');
        } else {
            // Show error message
        }
    };

    return (
        <OnboardingScreenBase
            title="About You"
            currentStep={1}
            totalSteps={5}
            onNext={handleNext}
            onBack={() => navigation.goBack()}
        >
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Tell us about yourself"
                    value={bio}
                    onChangeText={setBio}
                    multiline
                    numberOfLines={4}
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
        height: 100,
        textAlignVertical: 'top',
    },
});

export default BioScreen;