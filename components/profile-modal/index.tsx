import CXBottomSheet from "@/design-system/Modal";
import { NavigationContainer } from "@react-navigation/native";
import { useMemo, useEffect } from "react";
import EditProfile from "./EditProfile";
import { createStackNavigator, StackNavigationOptions, TransitionPresets } from "@react-navigation/stack";
import ActionCentre from "./ActionCentre";
import { View } from "react-native";
import { useBottomSheetContext } from "@/design-system/Modal/BottomSheetContext";
import { ProfileModalHeader } from "./Header";

export type ProfileStackParamList = {
    ActionCentre: undefined;
    EditProfile: undefined;
};

const Stack = createStackNavigator<ProfileStackParamList>();

export const ProfileStack = () => {
    const screenOptions = useMemo<StackNavigationOptions>(
        () => ({
            ...TransitionPresets.SlideFromRightIOS,
            header: () => <ProfileModalHeader />,
            headerShown: true,
            safeAreaInsets: { top: 0 },
            cardStyle: {
                backgroundColor: 'white',
                overflow: 'visible',
            },
        }),
        []
    );

    return (
        <NavigationContainer independent>
            <Stack.Navigator screenOptions={screenOptions} initialRouteName="ActionCentre">
                <Stack.Screen name="ActionCentre" component={ActionCentre} options={{ headerShown: false }} />
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
        <CXBottomSheet title="Profile" isOpen={props.isOpen} onClose={props.onClose}>
            <ProfileStack />
        </CXBottomSheet>
    )
}

export {
    ProfileModalStack
}

