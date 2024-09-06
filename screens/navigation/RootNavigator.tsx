import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '@/services/auth';
import Colors from '@/constants/Colors';

import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import { AuthGuard } from '@/services/auth/AuthGuard';
import { ProfileModalStack, ProfileStack } from '@/components/profile-modal';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const Stack = createStackNavigator();

function RootNavigator() {
    return (<BottomSheetModalProvider>
        <AuthProvider>
            <SafeAreaProvider style={{ backgroundColor: Colors.design.white }}>
                <NavigationContainer>
                    <AuthGuard>
                        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Auth">
                            <Stack.Screen name="Auth" component={AuthNavigator} />
                            {/* <Stack.Screen name="Onboarding" component={OnboardingNavigator} /> */}
                            <Stack.Screen name="Main" component={TabNavigator} />
                            <Stack.Screen name="ProfileManager" component={ProfileStack} options={{ presentation: 'modal' }} />
                            {/* <Stack.Screen
                            name="FilterModal"
                            component={FilterModal}
                            options={{ presentation: 'modal' }}
                        /> */}
                        </Stack.Navigator>
                    </AuthGuard>
                </NavigationContainer>
            </SafeAreaProvider>
        </AuthProvider>
    </BottomSheetModalProvider>

    );
}

export default RootNavigator;