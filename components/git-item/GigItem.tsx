import { ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";
import { Feather, FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Survey } from "@/utils/types";
import Colors from "@/constants/Colors";
import Text from "../ui/Text";
import { Fonts, Typography } from "@/constants/typography";
import { Image } from "react-native";
import { SF_ICONS } from "@/constants/icons";
import { useNavigation } from "@react-navigation/native";

export function timeFromNow(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const interval in intervals) {
    const value = Math.floor(diffInSeconds / intervals[interval]);
    if (value >= 1) {
      return `${value} ${interval}${value > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

const GigItem = (props: Survey) => {
  const router = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        router.navigate({
          pathname: "/(modals)/gig-description",
          params: { gig_id: props._id, gig_type: "UNKNOWN_TYPE" },
        })
      }
      style={{
        flexDirection: "row",
        gap: 4,
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10
      }}
    >
      <Text style={{
        fontFamily: Fonts.Inter_600SemiBold,
        fontSize: Typography.largeHeading,
        lineHeight: Typography.largeHeading * 1.5,
        marginRight: 10,
        color: Colors.design.mutedText
      }}>
        {props.reward.type === "voucher" ? SF_ICONS.gift_filled : SF_ICONS.medal_filled}
      </Text>
      <View style={{
        flex: 1
      }}>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.Inter_600SemiBold,
              fontSize: Typography.paragraph,
              color: Colors.design.highContrastText,
              maxWidth: 300,
              flex: 1,
              lineHeight: Typography.paragraph
            }}
            numberOfLines={1}
          >
            {props.name}
          </Text>
          <Text style={{
            color: Colors.design.text, fontFamily: Fonts.Inter_600SemiBold, fontSize: Typography.paragraph, lineHeight: Typography.paragraph
          }}>
            ${props.dollarRewardValue}
          </Text>
        </View>

        <View style={{ gap: 16, flexDirection: "row", justifyContent: 'space-between' }}>

          <Text
            style={{
              color: Colors.design.mutedText,
              fontFamily: Fonts.Inter_600SemiBold,
              fontSize: Typography.base
            }}
          >
            {timeFromNow(new Date(props.createdAt)).toString()}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {props.reward.type === "points" && (
              <>
                <Text style={{ color: Colors.design.accent, fontFamily: Fonts.Inter_600SemiBold, fontSize: Typography.base }}>
                  {"  "}
                  +{(props.reward.value as { amount: number }).amount} XP</Text>
              </>
            )}
          </View>
        </View>
      </View>

    </TouchableOpacity>
  );
};

export default GigItem;

const styles = StyleSheet.create({});
