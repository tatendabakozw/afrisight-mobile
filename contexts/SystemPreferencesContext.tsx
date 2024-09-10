import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePostHog } from 'posthog-react-native';

export const FEATURE_FLAGS = {
    WITHDRAWAL_METHODS: 'withdrawal-methods',
    PRIVACY_SECURITY: 'privacy-security',
    NOTIFICATION_SETTINGS: 'notification-settings',
    SURVEY_PREFERENCES: 'survey-preferences',
    POST_AUTH_ONBOARDING: 'post-auth-onboarding',
    DARK_MODE: 'dark-mode',
    CX_STORE_ENABLED: 'cx-store-enabled'
}

interface SystemPreferences {
    darkMode: boolean;
    notificationsEnabled: boolean;
    surveyPreferences: {
        [key: string]: boolean;
    };
    privacySettings: {
        [key: string]: boolean;
    };
    hasCompletedPostAuthOnboarding: boolean;
}

interface SystemPreferencesContextType {
    preferences: SystemPreferences;
    updatePreference: (key: string, value: any) => Promise<void>;
    isFeatureEnabled: (featureKey: string) => boolean;
    completePostAuthOnboarding: () => Promise<void>;
    resetPreferences: () => Promise<void>;
}

const defaultPreferences: SystemPreferences = {
    darkMode: false,
    notificationsEnabled: true,
    surveyPreferences: {},
    privacySettings: {},
    hasCompletedPostAuthOnboarding: false,
};

const SystemPreferencesContext = createContext<SystemPreferencesContextType | undefined>(undefined);

export const useSystemPreferences = () => {
    const context = useContext(SystemPreferencesContext);
    if (!context) {
        throw new Error('useSystemPreferences must be used within a SystemPreferencesProvider');
    }
    return context;
};

export const SystemPreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [preferences, setPreferences] = useState<SystemPreferences>(defaultPreferences);
    const posthog = usePostHog();

    useEffect(() => {
        loadPreferences();
    }, []);

    const loadPreferences = async () => {
        try {
            const storedPreferences = await AsyncStorage.getItem('systemPreferences');
            if (storedPreferences) {
                setPreferences(JSON.parse(storedPreferences));
            }
        } catch (error) {
            console.error('Error loading system preferences:', error);
        }
    };

    const updatePreference = async (key: string, value: any) => {
        try {
            const updatedPreferences = { ...preferences, [key]: value };
            setPreferences(updatedPreferences);
            await AsyncStorage.setItem('systemPreferences', JSON.stringify(updatedPreferences));
        } catch (error) {
            console.error('Error updating system preference:', error);
        }
    };

    const isFeatureEnabled = (featureKey: string) => {
        return posthog?.isFeatureEnabled(featureKey) ?? false;
    };

    const completePostAuthOnboarding = async () => {
        try {
            await AsyncStorage.setItem('hasCompletedPostAuthOnboarding', 'true');
            await updatePreference('hasCompletedPostAuthOnboarding', true);
            // You might want to update the user's profile on your backend here
        } catch (error) {
            console.error('Error completing post-auth onboarding:', error);
        }
    };

    const resetPreferences = async () => {
        try {
            await AsyncStorage.removeItem('systemPreferences');
            setPreferences(defaultPreferences);
        } catch (error) {
            console.error('Error resetting system preferences:', error);
        }
    };

    return (
        <SystemPreferencesContext.Provider value={{
            preferences,
            updatePreference,
            isFeatureEnabled,
            completePostAuthOnboarding,
            resetPreferences
        }}>
            {children}
        </SystemPreferencesContext.Provider>
    );
};