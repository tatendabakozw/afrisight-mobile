import Colors from "@/constants/Colors";
import { Fonts, Typography } from "@/constants/typography";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "twrnc";

export default function GigSubmission() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const onReturnHome = () => {
        router.push({
            pathname: "/(tabs)/gigs",
        });
    }
    return (
        <View
            style={[
                tw`flex-1`,
                {
                    paddingTop: insets.top,
                    backgroundColor: Colors.design.white
                },
            ]}
        >
            <View
                style={{
                    marginBottom: 16,
                    gap: 16,
                    padding: 16,
                    paddingBottom: 4,
                    borderColor: Colors.design.separator,
                    backgroundColor: Colors.design.white,
                }}
            >
                <TouchableOpacity
                    onPress={onReturnHome}
                    style={{
                        backgroundColor: Colors.design.interactiveCardSurface,
                        padding: 8,
                        height: 40,
                        width: 40,
                        borderRadius: 20,
                    }}
                >
                    <Feather name="x" size={24} color={Colors.design.text} />
                </TouchableOpacity>
                <View />
            </View>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <View>
                    <View style={{ backgroundColor: Colors.design.brand, height: 80, width: 80, borderRadius: 40, justifyContent: "center", alignItems: "center", alignSelf: "center", marginBottom: 16 }}>
                        <Feather name="check" size={32} color={Colors.design.white} />
                    </View>
                    <Text
                        style={{
                            fontFamily: Fonts.Inter_700Bold,
                            fontSize: Typography.heading,
                            color: Colors.design.highContrastText,
                            textAlign: "center",
                            marginBottom: 8,
                            padding: 20
                        }}
                    >
                        Your answers have been submitted.
                    </Text>
                    <Text
                        style={{
                            fontFamily: Fonts.Inter_400Regular,
                            fontSize: Typography.paragraph,
                            color: Colors.design.highContrastText,
                            textAlign: "center",
                            paddingHorizontal: 20

                        }}>
                        You have earned 10 points for this gig. Your can view your points in your profile or redeem them for rewards.
                    </Text>
                    <View style={{ flexDirection: "row", gap: 16, alignItems: "center", padding: 16, justifyContent: "center" }}>
                        <TouchableOpacity onPress={onReturnHome} style={{ height: 54, borderRadius: 8, flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Colors.design.brand }}>
                            <Text style={{ fontFamily: Fonts.Inter_600SemiBold, fontSize: Typography.buttonText, color: Colors.design.white }}>
                                Browse more gigs
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </View>
    );
}
