import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PersonalInfoScreen from '@/screens/onboarding/PersonalInfoScreen';
import BioScreen from '@/screens/onboarding/BioScreen';
import AddressScreen from '@/screens/onboarding/AddressScreen';
import PhoneNumberScreen from '@/screens/onboarding/PhoneNumberScreen';
import ProfilePictureScreen from '@/screens/onboarding/ProfilePictureScreen';
import { AuthGuard } from '@/services/auth/AuthGuard';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './RootNavigator';
import { useSystemPreferences } from '@/contexts/SystemPreferencesContext';
import { useAuth } from '@/services/auth/hooks';

export type PostAuthOnboardingStackParamList = {
    PersonalInfo: undefined;
    Bio: undefined;
    Address: undefined;
    PhoneNumber: undefined;
    ProfilePicture: undefined;
};

const Stack = createStackNavigator<PostAuthOnboardingStackParamList>();

const PostAuthOnboardingNavigator = () => {
    const { isAuthenticated, isLoading } = useAuth()
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()
    const { preferences } = useSystemPreferences()

    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            navigation.navigate("Auth")
            return
        }

        if (preferences.hasCompletedPostAuthOnboarding) {
            navigation.navigate("Main")
        }
    }, [preferences, isAuthenticated, isLoading])

    console.log({ preferences })


    return (
        <AuthGuard>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
                <Stack.Screen name="Bio" component={BioScreen} />
                <Stack.Screen name="Address" component={AddressScreen} />
                <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
                <Stack.Screen name="ProfilePicture" component={ProfilePictureScreen} />
            </Stack.Navigator>
        </AuthGuard>
    );
};

export default PostAuthOnboardingNavigator;