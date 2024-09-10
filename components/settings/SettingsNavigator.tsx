import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CXBottomSheet from "@/design-system/Modal";
import { NavigationContainer } from '@react-navigation/native';
import UserSettings from '.';
import { ProfileModalHeader } from '../profile-modal/Header';
import { Language, Notifications, Password, Wallet } from './screens';

const Stack = createStackNavigator();

export type SettingsStackParamList = {
    SettingsModal: undefined;
    Wallet: undefined;
    Notifications: undefined;
    Language: undefined;
    Password: undefined;
};

const SettingsStack = () => {


    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={{
                headerShown: true,
                header(props) {
                    return <ProfileModalHeader {...props} />
                },
            }}>
                <Stack.Screen name="SettingsModal" component={UserSettings} options={{ title: "Settings", headerShown: false }} />
                <Stack.Screen name="Wallet" component={Wallet} options={{ title: "Wallet", }} />
                <Stack.Screen name="Notifications" component={Notifications} options={{ title: "Notifications", }} />
                <Stack.Screen name="Language" component={Language} options={{ title: "Language", }} />
                <Stack.Screen name="Password" component={Password} options={{ title: "Password", }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const SettingsModalStack = (props: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    return (
        <CXBottomSheet title="Settings" isOpen={props.isOpen} onClose={props.onClose}>
            <SettingsStack />
        </CXBottomSheet>
    );
};

export { SettingsModalStack };

