import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CXBottomSheet from "@/design-system/Modal";
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import SettingsModal from '.';
import MoneyRewardsModal from '.';

const Stack = createStackNavigator();

export type MoneyRewardsStackParamList = {
    MoneyRewardsModal: undefined;
};

const MoneyRewardsStack = () => {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="MoneyRewardsModal" component={MoneyRewardsModal} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const MoneyRewardsModalStack = (props: {
    isOpen: boolean;
    onClose: () => void;
}) => {


    return (
        <CXBottomSheet title="Money Rewards" isOpen={props.isOpen} onClose={props.onClose}>
            <MoneyRewardsStack />
        </CXBottomSheet>
    );
};

export { MoneyRewardsModalStack };

