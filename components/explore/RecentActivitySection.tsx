import { View, TouchableOpacity, FlatList } from "react-native";
import Text from "@/components/ui/Text";
import Colors from "@/constants/Colors";
import { Fonts, Typography } from "@/constants/typography";
import MySurvey from "@/components/recent-activity/RecentActivityComponent";
import { EmptyStateCaption } from "../captions";
import IconText from "@/design-system/Text/IconText";
import { SF_ICONS } from "@/constants/icons";
import { SurveyEntity } from "@/model/survey";
import { useSavedSurveys } from "@/contexts/SavedSurveysContext";
import Separator from "@/design-system/Separator";
import { useNavigation } from "@react-navigation/native";

interface RecentActivitySectionProps {
    surveys?: SurveyEntity[];
}

export default function RecentActivitySection({ surveys }: RecentActivitySectionProps) {
    const { savedSurveys } = useSavedSurveys()
    const navigate = useNavigation()

    const onViewAll = () => {
        navigate.navigate("MyGigsScreen" as never)
    }
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
                <TouchableOpacity onPress={onViewAll} style={{ flexDirection: "row", alignItems: "center" }}>
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
                data={savedSurveys.slice(0, 3)}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                snapToAlignment="center"
                decelerationRate="fast"
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <>
                        <MySurvey
                            {...item}
                        />
                        <Separator />
                    </>
                )}
                contentContainerStyle={{ gap: 10 }}
                ListEmptyComponent={<EmptyStateCaption message="No recent activity" />}
            />
        </View>
    );
}