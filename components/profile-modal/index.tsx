import React from 'react';
import { createStackNavigator, StackCardInterpolationProps } from '@react-navigation/stack';
import { Easing } from 'react-native';
import ActionCentre from './ActionCentre';
import EditProfile from './EditProfile';
import { ProfileModalHeader } from './Header';
import { StackNavigationOptions } from '@react-navigation/stack';
import { TransitionSpec } from '@react-navigation/stack/lib/typescript/src/types';
import CXBottomSheet from '@/design-system/Modal';
import { NavigationContainer } from '@react-navigation/native';
import ChangePassword from './ChangePassword';
import PrivacyAndSecuritySettings from './PrivacyAndSecuritySettings';
import WithdrawalMethods from './WithdrawalMethods';
import SurveyPreferences from './SurveyPreferences';
import NotificationSettings from './NotificationSettings';
import WithdrawalHistory from './WithdrawalHistory';

export type ProfileStackParamList = {
    ActionCentre: undefined;
    EditProfile: undefined;
    ChangePassword: undefined;
    PrivacyAndSecuritySettings: undefined;
    WithdrawalMethods: undefined;
    SurveyPreferences: undefined;
    NotificationSettings: undefined;
    WithdrawalHistory: undefined;
};

const Stack = createStackNavigator<ProfileStackParamList>();

const openConfig: TransitionSpec = {
    animation: 'spring',
    config: {
        stiffness: 300, // Reduced stiffness for a snappier, more responsive feel
        damping: 100,    // Reduced damping for a bit more bounce
        mass: 1,        // Reduced mass to speed up the transition
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    },
};

const closeConfig: TransitionSpec = {
    animation: 'timing',
    config: {
        duration: 150, // Slightly faster for a snappy close
        easing: Easing.out(Easing.elastic(1)), // Smoother easing for closing
    },
};

const customTransition: StackNavigationOptions = {
    gestureEnabled: true,
    gestureDirection: 'horizontal',
    transitionSpec: {
        open: openConfig,
        close: closeConfig,
    },
    cardStyleInterpolator: ({ current, next, layouts }: StackCardInterpolationProps) => ({
        cardStyle: {
            transform: [
                {
                    scale: next
                        ? next.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 0], // Sharper scale transition for a more distinct effect
                            extrapolate: 'clamp',
                        })
                        : 1,
                },
            ],
            opacity: current.progress.interpolate({
                inputRange: [0.5, 1], // Starts fading earlier for a more noticeable transition
                outputRange: [0.8, 1], // More pronounced fade effect
                extrapolate: 'clamp',
            }),
        },
        overlayStyle: {
            opacity: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.3],
                extrapolate: 'clamp',
            }),
        },
    }),
};
function ProfileModalNavigator() {
    return (
        <NavigationContainer independent>
            <Stack.Navigator
                screenOptions={{
                    headerShown: true,
                    header: (props) => <ProfileModalHeader {...props} />,
                    headerStyle: {
                        marginBottom: 0,
                        paddingBottom: 0
                    },
                    cardStyle: {
                        marginBottom: 0,
                        paddingBottom: 0
                    },
                    // ...customTransition,
                }}
            >
                <Stack.Screen
                    name="ActionCentre"
                    component={ActionCentre}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="EditProfile"
                    component={EditProfile}
                    options={{ title: "Edit Profile" }}
                />
                <Stack.Screen
                    name="ChangePassword"
                    component={ChangePassword}
                    options={{ title: "Change Password" }}
                />
                <Stack.Screen
                    name="PrivacyAndSecuritySettings"
                    component={PrivacyAndSecuritySettings}
                    options={{ title: "Privacy & Security" }}
                />
                <Stack.Screen
                    name="WithdrawalMethods"
                    component={WithdrawalMethods}
                    options={{ title: "Withdrawal Methods" }}
                />
                <Stack.Screen
                    name="SurveyPreferences"
                    component={SurveyPreferences}
                    options={{ title: "Survey Preferences" }}
                />
                <Stack.Screen
                    name="NotificationSettings"
                    component={NotificationSettings}
                    options={{ title: "Notification Settings" }}
                />
                <Stack.Screen
                    name="WithdrawalHistory"
                    component={WithdrawalHistory}
                    options={{ title: "Withdrawal History" }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

const ProfileModalStack = (props: {
    isOpen: boolean;
    onClose: () => void;
    isFullScreen?: boolean;
}) => {
    return (
        <CXBottomSheet
            title="Profile"
            isOpen={props.isOpen}
            onClose={props.onClose}
            isFullScreen
        >
            <ProfileModalNavigator />
        </CXBottomSheet>
    );
};

export { ProfileModalStack };

