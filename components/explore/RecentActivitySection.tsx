import { View, TouchableOpacity, FlatList, Image } from "react-native";
import Text from "@/components/ui/Text";
import Colors from "@/constants/Colors";
import { Fonts, Typography } from "@/constants/typography";
import RecentActivityComponent from "@/components/recent-activity/RecentActivityComponent";
import { Survey } from "@/types";
import { FontAwesome6 } from "@expo/vector-icons";
import { EmptyStateCaption } from "../captions";
import IconText from "@/design-system/Text/IconText";
import { SF_ICONS } from "@/constants/icons";

interface RecentActivitySectionProps {
    surveys: Survey[];
}

export default function RecentActivitySection({ surveys }: RecentActivitySectionProps) {
    return (
        <View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
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
                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                        style={{
                            fontSize: Typography.body,
                            fontFamily: Fonts.Inter_600SemiBold,
                            color: Colors.design.accent,
                        }}
                    >
                        View All
                    </Text>
                    <IconText style={{ color: Colors.design.accent }}>
                        {SF_ICONS.chevron_right}
                    </IconText>
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
                ListEmptyComponent={<EmptyStateCaption message="No recent activity" />}
            />
        </View>
    );
}