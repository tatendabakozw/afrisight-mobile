import React, { useEffect } from 'react';
import { View, Text, ImageBackground, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Button from "@/design-system/Button";
import { SF_ICONS } from "@/constants/icons";
import { useAuth } from "@/services/auth/hooks";
import { Fonts, Typography } from '@/constants/typography';
import Colors from '@/constants/Colors';
import { ProfileStackParamList } from '.';
import { useStackModalHeight } from '@/design-system/Modal/utils';
import { ModalStackWrapper } from '@/design-system/Modal/ModalStackWrapper';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

type ActionCentreNavigationProp = StackNavigationProp<ProfileStackParamList, 'ActionCentre'>;

const ACTION_CENTRE_HEIGHT = 640; // Increased height to accommodate new buttons

const ActionCentre = () => {
    const { signOut } = useAuth();
    const navigation = useNavigation<ActionCentreNavigationProp>();
    useStackModalHeight(ACTION_CENTRE_HEIGHT);

    const translateY = useSharedValue(50);
    const opacity = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
        opacity: opacity.value,
    }));

    useEffect(() => {
        const timeout = setTimeout(() => {
            translateY.value = withSpring(0, { damping: 15, stiffness: 150 });
            opacity.value = withDelay(150, withSpring(1, { damping: 20, stiffness: 100 }));
        }, 100);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <ModalStackWrapper>
            <SafeAreaView >
                <ProfileItem idx={1} />
                <Animated.View style={[{ flex: 0 }, animatedStyle]}>
                    <ScrollView contentContainerStyle={{ gap: 10, marginTop: 20 }}>
                        <Button
                            text="Edit Profile"
                            onPress={() => navigation.navigate('EditProfile')}
                            leftIcon={SF_ICONS.person}
                        />
                        <Button
                            text="Change Password"
                            onPress={() => navigation.navigate('ChangePassword')}
                            leftIcon={SF_ICONS.lock_filled}
                        />
                        <Button
                            text="Privacy & Security"
                            onPress={() => navigation.navigate('PrivacyAndSecuritySettings')}
                            leftIcon={SF_ICONS.shield_filled}
                        />
                        <Button
                            text="Withdrawal Methods"
                            onPress={() => navigation.navigate('WithdrawalMethods')}
                            leftIcon={SF_ICONS.dollar}
                        />
                        <Button
                            text="Survey Preferences"
                            onPress={() => navigation.navigate('SurveyPreferences')}
                            leftIcon={SF_ICONS.clipboard_filled}
                        />
                        <Button
                            text="Notification Settings"
                            onPress={() => navigation.navigate('NotificationSettings')}
                            leftIcon={SF_ICONS.bell_filled}
                        />

                        <Button
                            text="Log out"
                            onPress={signOut}
                            leftIcon={SF_ICONS.logout}
                            colorScheme="danger"
                        />
                    </ScrollView>
                </Animated.View>
            </SafeAreaView>
        </ModalStackWrapper>
    );
};

const ProfileItem = ({ idx }: { idx: number }) => {
    return (
        <View style={{ marginTop: 20, flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", gap: 10, alignItems: "flex-start", flex: 1 }}>
                <ImageBackground source={require("@/assets/images/backgrounds/background-red.png")} style={{
                    width: 44, height: 44,
                    elevation: 5,
                    shadowColor: Colors.design.highContrastText,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    borderRadius: 40,

                }} imageStyle={{ borderRadius: 40 }}>
                </ImageBackground>
                <View>
                    <Text style={{ fontFamily: Fonts.Inter_600SemiBold, color: Colors.design.highContrastText, fontSize: Typography.body, lineHeight: Typography.body * 1.2 }}>
                        Tatenda Chris
                    </Text>
                    <Text style={{ fontFamily: Fonts.Inter_600SemiBold, fontSize: Typography.body, color: Colors.design.mutedText }}>
                        $109.20
                    </Text>
                </View>
            </View>
            <Text style={{ fontFamily: Fonts.Inter_600SemiBold, fontSize: Typography.heading, color: Colors.design.accent }}>
                {SF_ICONS.checkmark_filled}
            </Text>
        </View>
    )
}

export default ActionCentre;
