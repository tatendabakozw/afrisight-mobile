import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '@/services/auth';
import Colors from '@/constants/Colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AuthNavigator from './AuthNavigator';
import CoreAppNavigator from './TabNavigator';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const Stack = createStackNavigator();


function RootNavigator() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <SafeAreaProvider style={{ backgroundColor: Colors.design.white }}>
                    <BottomSheetModalProvider>
                        <AuthProvider>
                            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Auth">
                                <Stack.Screen name="Auth" component={AuthNavigator} />
                                <Stack.Screen name="Main" component={CoreAppNavigator} />
                            </Stack.Navigator>
                        </AuthProvider>
                    </BottomSheetModalProvider>
                </SafeAreaProvider>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}

export default RootNavigator;