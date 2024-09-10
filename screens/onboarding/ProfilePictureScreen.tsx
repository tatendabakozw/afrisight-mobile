import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PostAuthOnboardingStackParamList } from '@/screens/navigation/PostAuthOnboardingNavigator';
import OnboardingScreenBase from '@/components/onboarding/OnboardingScreenBase';
import { useSystemPreferences } from '@/contexts/SystemPreferencesContext';
import { useNavigation } from '@react-navigation/native';
import Text from '@/components/ui/Text';
import Colors from '@/constants/Colors';
import { Fonts, Typography } from '@/constants/typography';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '@/services/auth/hooks';

type ProfilePictureScreenNavigationProp = StackNavigationProp<
    PostAuthOnboardingStackParamList,
    'ProfilePicture'
>;

const ProfilePictureScreen: React.FC = () => {
    const { completePostAuthOnboarding } = useSystemPreferences();
    const navigation = useNavigation<ProfilePictureScreenNavigationProp>();
    const { user, updateUser } = useAuth();
    const [image, setImage] = useState<string | null>(user?.profile.profilePicture || null);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleFinish = async () => {
        if (image) {
            await updateUser({ profile: { ...user?.profile, profilePicture: image } });
        }
        await completePostAuthOnboarding();
        navigation.reset({
            index: 0,
            routes: [{ name: 'Main' as never }],
        });
    };

    return (
        <OnboardingScreenBase
            title="Profile Picture"
            currentStep={4}
            totalSteps={5}
            onNext={handleFinish}
            onBack={() => navigation.goBack()}
        >
            <View style={styles.container}>
                <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
                    {image ? (
                        <Image source={{ uri: image }} style={styles.image} />
                    ) : (
                        <Text style={styles.placeholderText}>Tap to select an image</Text>
                    )}
                </TouchableOpacity>
            </View>
        </OnboardingScreenBase>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: Colors.design.mutedText,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    placeholderText: {
        fontFamily: Fonts.Inter_400Regular,
        fontSize: Typography.body,
        color: Colors.design.white,
        textAlign: 'center',
    },
});

export default ProfilePictureScreen;