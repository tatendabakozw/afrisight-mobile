import CXMappersModal from "@/design-system/Modal";
import ProfileManagerIndex from "./ProfileManager";
import ModalStack, { ModalStackParamList } from "@/design-system/Modal/ModalStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { View } from "react-native";
import Text from "../ui/Text";
import Button from "@/design-system/Button";
import { useEffect, useMemo, useState } from "react";
import EditProfile from "./EditProfile";
import { createStackNavigator, StackNavigationOptions, TransitionPresets } from "@react-navigation/stack";


const Stack = createStackNavigator();



export const ProfileStack = () => {
    const screenOptions = useMemo<StackNavigationOptions>(
        () => ({
            ...TransitionPresets.SlideFromRightIOS,
            headerMode: 'screen',
            headerShown: true,
            safeAreaInsets: { top: 0 },
            cardStyle: {
                backgroundColor: 'white',
                overflow: 'visible',
            },
        }),
        []
    );

    const screenAOptions = useMemo(() => ({ headerLeft: () => null }), []);
    return (
        <NavigationContainer independent>
            <Stack.Navigator screenOptions={screenOptions} initialRouteName="ProfileManager">
                <Stack.Screen name="ProfileManager" component={ProfileManagerIndex} />
                <Stack.Screen name="EditProfile" component={EditProfile} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const ProfileModalStack = (props: {
    isOpen: boolean
    onClose: () => void
}) => {
    return (
        <CXMappersModal title="Profile" isOpen={props.isOpen} onClose={props.onClose}>
            <ProfileStack />
        </CXMappersModal>
    )
}

export {
    ProfileManagerIndex as ProfileModal,
    ProfileModalStack
}

