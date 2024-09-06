import Colors from "@/constants/Colors"
import { SF_ICONS } from "@/constants/icons"
import Button from "@/design-system/Button"
import CXMappersModal from "@/design-system/Modal"
import { ImageBackground, View } from "react-native"
import Text from "../ui/Text"
import { Fonts, Typography } from "@/constants/typography"
import { useAuth } from "@/services/auth/hooks"
import useDisclosure from "@/hooks/useDisclosure"
import EditProfile from "./EditProfile"
import { useState } from "react"

const ProfileManagerIndex = () => {
    const { user, signOut } = useAuth();
    const { isOpen: isEditProfileOpen, onOpen: onEditProfileOpen, onClose: onEditProfileClose } = useDisclosure();

    const [title, setTitle] = useState("Profile");

    const handleOpenEditProfile = () => {
        onEditProfileOpen();
        setTitle("Edit profile");
    }

    const handleCloseEditProfile = () => {
        onEditProfileClose();
        setTitle("Profile");
    }

    return (
        <>
            <ProfileItem idx={1} />
            <View style={{ marginTop: 10 }}>
                <Button leftIcon={SF_ICONS.pencil} text={"Edit profile"} size="medium" variant="text" onPress={handleOpenEditProfile} />

                <Button leftIcon={SF_ICONS.gift_filled} text={"Redeem voucher"} size="medium" variant="text" />
                <Button leftIcon={SF_ICONS.dollar} text={"Withdraw rewards"} size="medium" variant="text" />
                <Button leftIcon={SF_ICONS.logout} text={"Log out"} size="medium" variant="text" colorScheme="danger" onPress={signOut} />

            </View>
        </>
    )
}

const ProfileItem = ({ idx }: { idx: number }) => {
    const color = [Colors.design.gold, Colors.design.silver, Colors.design.bronze,]
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

export default ProfileManagerIndex;
