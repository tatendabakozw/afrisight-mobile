import Colors from "@/constants/Colors"
import { SF_ICONS } from "@/constants/icons"
import Button from "@/design-system/Button"
import CXBottomSheet from "@/design-system/Modal"
import { ImageBackground, View } from "react-native"
import Text from "../ui/Text"
import { Fonts, Typography } from "@/constants/typography"
import { useAuth } from "@/services/auth/hooks"
import useDisclosure from "@/hooks/useDisclosure"
import { useState } from "react"
import Row from "@/design-system/Row"
import IconText from "@/design-system/Text/IconText"

const MoneyRewardsModal = () => {
    const { user, signOut } = useAuth();
    const { isOpen: isEditProfileOpen, onOpen: onEditProfileOpen, onClose: onEditProfileClose } = useDisclosure();



    return (
        <>
            <View style={{ alignItems: "center", padding: 20 }}>
                <Text style={{ fontSize: Typography.largeHeading * 1.5, fontFamily: Fonts.Inter_700Bold, color: Colors.design.highContrastText, lineHeight: Typography.largeHeading * 1.5 }}>
                    $3.20
                </Text>
                <Row style={{ gap: 20, marginBottom: 10 }}>
                    <Row style={{ gap: 4 }}>
                        <IconText>
                            {SF_ICONS.cards_stack}
                        </IconText>
                        <Text style={{ fontSize: Typography.paragraph, fontFamily: Fonts.Inter_700Bold, color: Colors.design.text }}>
                            12 Gigs
                        </Text>
                    </Row>
                    <Row style={{ gap: 4 }}>
                        <IconText>
                            {SF_ICONS.medal_filled}
                        </IconText>
                        <Text style={{ fontSize: Typography.paragraph, fontFamily: Fonts.Inter_700Bold, color: Colors.design.text }}>
                            40 XP
                        </Text>
                    </Row>
                </Row>
                <Text style={{ textAlign: "center", maxWidth: 320, fontSize: Typography.paragraph, fontFamily: Fonts.Inter_600SemiBold, color: Colors.design.mutedText }}>
                    You're almost there! Rewards are available to withdraw once you reach $10.00.
                </Text>
            </View>

            <View style={{ marginBottom: 40, paddingHorizontal: 20, gap: 20 }}>
                <Button leftIcon={SF_ICONS.checkmark_filled} text={"Request payout"} size="medium" variant="accent" />
                <PayoutDetails />
            </View>

        </>
    )
}

const PayoutDetails = () => {
    return (
        <View style={{ gap: 10 }}>
            <Row style={{ justifyContent: "space-between" }}>
                <Text style={{ fontSize: Typography.paragraph, fontFamily: Fonts.Inter_600SemiBold, color: Colors.design.text }}>
                    <IconText style={{ color: Colors.design.mutedText, fontSize: Typography.subheading, lineHeight: Typography.subheading * 1.5 }}>
                        {SF_ICONS.card}
                    </IconText>{"  "}Payout method
                </Text>
                <Text style={{ fontSize: Typography.paragraph, fontFamily: Fonts.Inter_700Bold, color: Colors.design.highContrastText }}>
                    ***685
                </Text>
            </Row>
            <Row style={{ justifyContent: "space-between" }}>
                <Text style={{ fontSize: Typography.paragraph, fontFamily: Fonts.Inter_600SemiBold, color: Colors.design.text }}>
                    <IconText style={{ color: Colors.design.mutedText, fontSize: Typography.subheading, lineHeight: Typography.subheading * 1.5 }}>
                        {SF_ICONS.dollar}
                    </IconText>{"  "}Amount
                </Text>
                <Text style={{ fontSize: Typography.paragraph, fontFamily: Fonts.Inter_700Bold, color: Colors.design.highContrastText }}>
                    US $2.00
                </Text>
            </Row>
        </View>
    )
}


export default MoneyRewardsModal;
