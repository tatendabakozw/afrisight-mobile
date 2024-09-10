import React, { useEffect, useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '@/services/auth';
import Colors from '@/constants/Colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import AuthNavigator from './AuthNavigator';
import CoreAppNavigator from './TabNavigator';
import OnboardingScreen from '@/screens/auth/OnboardingScreen';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useAuth } from '@/services/auth/hooks';
import { SurveyProvider } from '../detail/context';
import { SQLiteProvider } from 'expo-sqlite';
import { SavedSurveysProvider } from '@/contexts/SavedSurveysContext';
import { StatusBar } from 'react-native';
import { PostHogProvider } from 'posthog-react-native';
import { SystemPreferencesProvider } from '@/contexts/SystemPreferencesContext';
import PostAuthOnboardingNavigator from './PostAuthOnboardingNavigator';
import { useSystemPreferences } from '@/contexts/SystemPreferencesContext';
import { FEATURE_FLAGS } from '@/contexts/SystemPreferencesContext';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export type RootStackParamList = {
    Onboarding: undefined;
    Auth: undefined;
    Main: undefined
    PostAuthOnboarding: undefined;
};

export type AuthStackParamList = {
    Login: undefined;
    SignUp: {
        emailAddress: string;
    };
};

export type MainStackParamList = {
    Explore: undefined;
    // Add other main screens here
};

const Stack = createStackNavigator<RootStackParamList>();
const client = new QueryClient();

function RootNavigatorContent() {
    const { isAuthenticated, isLoading, user } = useAuth();
    const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);
    const [hasCompletedPostAuthOnboarding, setHasCompletedPostAuthOnboarding] = useState<boolean | null>(null);
    const [isReady, setIsReady] = useState(false);
    const { isFeatureEnabled } = useSystemPreferences();

    useEffect(() => {
        async function prepare() {
            try {
                const onboardingStatus = await AsyncStorage.getItem('hasSeenOnboarding');
                setHasSeenOnboarding(onboardingStatus === 'true');

                const postAuthOnboardingStatus = await AsyncStorage.getItem('hasCompletedPostAuthOnboarding');
                setHasCompletedPostAuthOnboarding(postAuthOnboardingStatus === 'true');
            } catch (e) {
                console.warn('Failed to fetch onboarding status');
            } finally {
                setIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (isReady && !isLoading) {
            await SplashScreen.hideAsync();
        }
    }, [isReady, isLoading]);

    if (!isReady || isLoading) {
        return null;
    }




    return (
        <QueryClientProvider client={client}>
            <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {!hasSeenOnboarding && (
                        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                    )}
                    <Stack.Screen name="PostAuthOnboarding" component={PostAuthOnboardingNavigator} />

                    <Stack.Screen name="Main" component={CoreAppNavigator} />

                    <Stack.Screen name="Auth" component={AuthNavigator} />

                </Stack.Navigator>
            </View>
        </QueryClientProvider>
    );
}

function RootNavigator() {
    return (
        <SurveyProvider>
            <SavedSurveysProvider>
                <SystemPreferencesProvider>
                    <GestureHandlerRootView style={{ flex: 1 }}>
                        <NavigationContainer>
                            <PostHogProvider apiKey="phc_vxCHVGyr69GJAPuWujqSCDkLnkflcAFq4dB8MaW16Dh" options={{
                                host: "https://us.i.posthog.com",
                            }}>
                                <SafeAreaProvider style={{ backgroundColor: Colors.design.white }}>
                                    <BottomSheetModalProvider>
                                        <AuthProvider>
                                            <RootNavigatorContent />
                                        </AuthProvider>
                                    </BottomSheetModalProvider>
                                </SafeAreaProvider>
                            </PostHogProvider>
                        </NavigationContainer>
                    </GestureHandlerRootView>
                </SystemPreferencesProvider>
            </SavedSurveysProvider>
        </SurveyProvider>
    );
}

export default RootNavigator;