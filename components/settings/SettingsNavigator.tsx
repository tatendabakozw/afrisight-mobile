import React, { useContext, useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CXBottomSheet from "@/design-system/Modal";
import { NavigationContainer } from '@react-navigation/native';
import { View, LayoutChangeEvent } from 'react-native';
import UserSettings from '.';
import { ProfileModalHeader } from '../profile-modal/Header';

const Stack = createStackNavigator();

export type SettingsStackParamList = {
    SettingsModal: undefined;
};

const SettingsStack = () => {


    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={{
                headerShown: true, header(props) {
                    return <ProfileModalHeader {...props} />
                },
            }}>
                <Stack.Screen name="SettingsModal" component={UserSettings} options={{ title: "Settings" }} />
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

