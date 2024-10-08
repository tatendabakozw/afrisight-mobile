import { Image, ImageBackground, View } from "react-native";
import Text from "@/components/ui/Text";
import Colors from "@/constants/Colors";
import { Fonts, Typography } from "@/constants/typography";
import { FontAwesome6 } from "@expo/vector-icons";
import Row from "@/design-system/Row";

interface MyPointsCardProps {
    points: number;
    rank: number;
}

export default function MyPointsCard({ points, rank }: MyPointsCardProps) {
    return (
        <ImageBackground
            style={{
                marginHorizontal: 20,
                padding: 16,
                position: "relative",
                overflow: "hidden"
            }}
            source={require("@/assets/images/backgrounds/background-night-stars.png")}
            imageStyle={{
                borderRadius: 16,
            }}
        >

            <Row style={{ gap: 4, justifyContent: "flex-start" }}>
                <Image source={require("@/assets/images/illustrations/trophy-icon-white.png")} style={{ height: 20, width: 20 }} />

                <Text
                    style={{
                        fontSize: Typography.subheading,
                        fontFamily: Fonts.Inter_600SemiBold,
                        color: Colors.design.white,
                        marginBottom: 4,
                    }}
                >
                    My points
                </Text>
            </Row>
            <Text
                style={{
                    fontSize: Typography.largeHeading * 1.5,
                    fontFamily: Fonts.Inter_700Bold,
                    color: Colors.design.white,
                }}
            >
                {points}
            </Text>
            {/* <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
                <Text
                    style={{
                        color: Colors.design.white,
                        fontFamily: Fonts.Inter_600SemiBold,
                    }}
                >
                    Placed #{rank}
                </Text>
            </View> */}
        </ImageBackground>
    );
}