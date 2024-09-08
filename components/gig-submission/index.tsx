import TicketEdgeCard from "@/components/ticket-edge-card";
import Colors from "@/constants/Colors";
import { Fonts, Typography } from "@/constants/typography";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { Reward } from "../../screens/detail/gig-modal";
import AnimatedModal from "@/components/ui/AnimatedModal";
import Button from "@/design-system/Button";


export default function GigSubmission(props: Reward & {
    onClose: () => void
    onReturnHome: () => void
    isOpen: boolean
}) {
    const { message,
        type,
        value,
        code,
        maxRedemptions,
        isRedeemed } = props


    return (
        <AnimatedModal fullHeight isOpen={props.isOpen} onClose={props.onClose}>
            <View
                style={[
                    tw`flex-1`,
                    {
                        backgroundColor: Colors.design.white,

                    },
                ]}
            >


                {type === "points" && <View style={{ padding: 20, justifyContent: "center", alignItems: "center" }}>
                    <Image source={require("@/assets/images/illustrations/gem-icon-red.png")} style={{ height: 200, width: 200 }} />
                </View>}
                <View style={{ flex: 1, }}>
                    <View>
                        {type === "voucher" && <VoucherReward code={code as string} isRedeemed={!!isRedeemed} maxRedemptions={maxRedemptions} />}

                        <Text
                            style={{
                                fontFamily: Fonts.Inter_700Bold,
                                fontSize: Typography.largeHeading,
                                color: Colors.design.highContrastText,
                                textAlign: "center",
                                marginTop: 20,
                                marginBottom: 4,
                            }}
                        >
                            {type === 'points' && `You've earned ${value} points`}
                            {type === 'voucher' && "Here's a voucher."}
                        </Text>
                        <Text
                            style={{
                                fontFamily: Fonts.Inter_400Regular,
                                fontSize: Typography.paragraph,
                                textAlign: "center",
                                paddingHorizontal: 40,
                                color: Colors.design.text,
                                marginBottom: 20

                            }}>
                            {type === 'points' && 'You can buy items in the store using your points. Complete more gigs to earn more points'}
                            {type === 'voucher' && 'You can use this voucher at any CXMappers retail outlet.'}
                        </Text>

                    </View>
                </View>
                <View style={{ flexDirection: "row", gap: 16, padding: 20 }}>
                    <Button style={{ flex: 1 }} text="Browse more gigs" variant="accent" onPress={props.onReturnHome} />
                </View>
            </View>
        </AnimatedModal>
    );
}

const PointsReward = (props: {
    value: number
}) => {
    return (
        <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <View style={{ padding: 20, borderRadius: 20, marginHorizontal: 20, flex: 1, ...withShadow.shadow, backgroundColor: Colors.design.white }}>
                <Text style={{
                    fontFamily: Fonts.Inter_700Bold,
                    marginBottom: 10,
                    color: Colors.design.text
                }}>
                    Summary
                </Text>
                <Text style={{
                    fontFamily: Fonts.Inter_700Bold,
                    fontSize: Typography.subheading,
                    color: Colors.design.highContrastText,
                }}>
                    Gig completed
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                    <FontAwesome6 name={"trophy"} size={12} color={Colors.design.warning} />

                    <Text style={{
                        fontFamily: Fonts.Inter_700Bold,
                        fontSize: Typography.paragraph,
                        color: Colors.design.brand,
                    }}>
                        {props.value} points
                    </Text>
                </View>
            </View>
        </View>
    )
}

const VoucherReward = (props: {
    code: string,
    maxRedemptions: number,
    isRedeemed: boolean
}) => {
    return (
        <TicketEdgeCard style={{ borderRadius: 20, paddingHorizontal: 0, paddingTop: 0, overflow: "hidden", marginHorizontal: 20 }}>
            <View style={{ height: 180, backgroundColor: Colors.design.green, borderRadius: 20, padding: 20, justifyContent: "flex-end", gap: 8, borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}>

            </View>
            <View style={{ borderRadius: 20, justifyContent: "flex-end", gap: 8, padding: 20, }}>
                <Text style={{ fontFamily: Fonts.Inter_700Bold, fontSize: Typography.subheading, color: Colors.design.highContrastText }}>
                    {props.code ?? "CS234SD"}
                </Text>
                <Text style={{ fontFamily: Fonts.Inter_400Regular, fontSize: Typography.paragraph, color: Colors.design.text }}>
                    CXMappers retail outlet
                </Text>
                <Text style={{ fontFamily: Fonts.Inter_400Regular, fontSize: Typography.paragraph, color: Colors.design.accent }}>
                    Expires 23 Jun 2024
                </Text>
            </View>
        </TicketEdgeCard>
    )
}

const withShadow = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    }
})