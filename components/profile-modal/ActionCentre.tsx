import React from 'react';
import { View, Text, ImageBackground } from "react-native";
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

type ActionCentreNavigationProp = StackNavigationProp<ProfileStackParamList, 'ActionCentre'>;


const ACTION_CENTRE_HEIGHT = 330

const ActionCentre = () => {
    const { signOut } = useAuth();
    const navigation = useNavigation<ActionCentreNavigationProp>();
    useStackModalHeight(ACTION_CENTRE_HEIGHT);

    const handleNavigateToEditProfile = () => {
        console.log("Navigating to edit profile");
        navigation.navigate("EditProfile");
    };

    return (
        <ModalStackWrapper>
            <ProfileItem idx={1} />

            <View style={{ marginTop: 20 }}>
                <Button
                    onPress={handleNavigateToEditProfile}
                    leftIcon={SF_ICONS.pencil}
                    text={"Edit profile"}
                    size="medium"
                    variant="text"
                />
                <Button
                    onPress={() => console.log("Redeem voucher")}
                    leftIcon={SF_ICONS.gift_filled}
                    text={"Password & privacy"}
                    size="medium"
                    variant="text"
                />
                <Button
                    onPress={() => console.log("Redeem voucher")}
                    leftIcon={SF_ICONS.gift_filled}
                    text={"Contact information"}
                    size="medium"
                    variant="text"
                />
                <Button
                    leftIcon={SF_ICONS.dollar}
                    text={"Wallet"}
                    size="medium"
                    variant="text"
                />

                <Button
                    leftIcon={SF_ICONS.logout}
                    text={"Log out"}
                    size="medium"
                    variant="text"
                    colorScheme="danger"
                    onPress={signOut}
                />
            </View>
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
                    <Text style={{ fontFamily: Fonts.Inter_600SemiBold, color: Colors.design.highContrastText, fontSize: Typography.paragraph, lineHeight: Typography.paragraph * 1.2 }}>
                        Tatenda Chris
                    </Text>
                    <Text style={{ fontFamily: Fonts.Inter_600SemiBold, fontSize: Typography.paragraph, color: Colors.design.mutedText }}>
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
