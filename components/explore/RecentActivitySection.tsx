import { View, TouchableOpacity, FlatList, Image } from "react-native";
import Text from "@/components/ui/Text";
import Colors from "@/constants/Colors";
import { Fonts, Typography } from "@/constants/typography";
import RecentActivityComponent from "@/components/recent-activity/RecentActivityComponent";
import { Survey } from "@/utils/types";
import { FontAwesome6 } from "@expo/vector-icons";

interface RecentActivitySectionProps {
    surveys: Survey[];
}

export default function RecentActivitySection({ surveys }: RecentActivitySectionProps) {
    return (
        <View >
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 20,
                    paddingHorizontal: 20
                }}
            >
                <Text
                    style={{
                        fontSize: Typography.heading,
                        fontFamily: Fonts.Inter_700Bold,
                        color: Colors.design.highContrastText,
                    }}
                >
                    Recent Activity
                </Text>
                <TouchableOpacity style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>

                    <Text
                        style={{
                            fontSize: Typography.paragraph,
                            fontFamily: Fonts.Inter_600SemiBold,
                            color: Colors.design.text,
                        }}
                    >
                        View All
                    </Text>
                    <Image source={require("@/assets/images/imports/caret.png")} style={{ width: 20, height: 20, objectFit: "contain" }} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={surveys}

                showsHorizontalScrollIndicator={false}
                pagingEnabled
                snapToAlignment="center"
                decelerationRate="fast"
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                    <RecentActivityComponent
                        {...item}
                        status={Math.random() > 0.5 ? "COMPLETED" : "DRAFT"}
                    />
                )}
                contentContainerStyle={{ paddingHorizontal: 20 }}
            />
        </View>
    );
}