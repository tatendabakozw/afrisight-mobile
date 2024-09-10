import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingNavbar from '@/components/navigation/headers/OnboardingNavbar';
import Colors from '@/constants/Colors';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import LoginScreen from '@/screens/auth';
import RegisterScreen from '@/screens/auth/register';
import { AuthGuard } from '@/services/auth/AuthGuard';
import { SafeAreaView } from 'react-native-safe-area-context';
// Import your auth screens here

const Stack = createStackNavigator();

function AuthNavigator() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AuthGuard>
                <Stack.Navigator screenOptions={({ navigation, route }) => ({
                    header: (props) => <OnboardingNavbar {...props} />,
                    tabBarActiveTintColor: Colors.light.tint,
                    headerShown: useClientOnlyValue(false, true),
                })}>
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="SignUp" component={RegisterScreen} />
                </Stack.Navigator>
            </AuthGuard>
        </SafeAreaView>
    );
}

export default AuthNavigator;