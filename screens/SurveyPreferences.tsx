import React from 'react';
import { View, Switch, Text } from 'react-native';
import { useSystemPreferences } from '@/contexts/SystemPreferencesContext';

const SurveyPreferences = () => {
    const { preferences, updatePreference } = useSystemPreferences();

    return (
        <View>
            <Text>Survey Preferences</Text>
            {Object.entries(preferences.surveyPreferences).map(([key, value]) => (
                <View key={key}>
                    <Text>{key}</Text>
                    <Switch
                        value={value}
                        onValueChange={(newValue) =>
                            updatePreference(`surveyPreferences.${key}`, newValue)
                        }
                    />
                </View>
            ))}
        </View>
    );
};

export default SurveyPreferences;