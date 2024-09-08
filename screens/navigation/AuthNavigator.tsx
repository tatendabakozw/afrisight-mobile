import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingNavbar from '@/components/navigation/headers/OnboardingNavbar';
import Colors from '@/constants/Colors';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import LoginScreen from '@/screens/auth';
import RegisterScreen from '@/screens/auth/register';
import { AuthGuard } from '@/services/auth/AuthGuard';
// Import your auth screens here

const Stack = createStackNavigator();

function AuthNavigator() {
    return (
        <Stack.Navigator screenOptions={({ navigation, route }) => ({
            header: (props) => <OnboardingNavbar {...props} />,
            tabBarActiveTintColor: Colors.light.tint,
            headerShown: useClientOnlyValue(false, true),
        })}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </Stack.Navigator>
    );
}

export default AuthNavigator;