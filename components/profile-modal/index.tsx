import CXBottomSheet from "@/design-system/Modal";
import ProfileManagerIndex from "./ProfileManager";
import { NavigationContainer } from "@react-navigation/native";
import { useMemo } from "react";
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
        <CXBottomSheet title="Profile" isOpen={props.isOpen} onClose={props.onClose}>
            <ProfileStack />
        </CXBottomSheet>
    )
}

export {
    ProfileManagerIndex as ProfileModal,
    ProfileModalStack
}

