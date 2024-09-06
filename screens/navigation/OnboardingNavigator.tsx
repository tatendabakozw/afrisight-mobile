import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// Import your onboarding screens here

const Stack = createStackNavigator();

function OnboardingNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* Add your onboarding screens here */}
        </Stack.Navigator>
    );
}

export default OnboardingNavigator;