import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Feather, FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Survey } from "@/utils/types";
import Colors from "@/constants/Colors";
import { truncateText } from "@/utils/text-moderators";
import Text from "../ui/Text";
import { Fonts, Typography } from "@/constants/typography";
import { timeFromNow } from "../git-item/GigItem";
import { Image } from "react-native";

interface RecentActivityProps extends Survey {
  status: "COMPLETED" | "DRAFT";
}

const RecentActivityComponent = (props: RecentActivityProps) => {
  const router = { push: () => { } }
  // TODO: routing here


  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/(modals)/gig-description",
          params: { gig_id: props._id, gig_type: "UNKNOWN_TYPE" },
        })
      }
      style={{
        borderRadius: 10,
        paddingVertical: 10,
        flexDirection: "row",
        gap: 10,
        flex: 1,
        alignItems: "center",
      }}
    >
      <Image source={require("@/assets/images/imports/document-icon.png")} style={{ width: 40, height: 40 }} />

      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: 40, marginBottom: 10 }}>
          <Text
            style={{
              fontFamily: Fonts.Inter_600SemiBold,
              fontSize: Typography.paragraph,
              lineHeight: Typography.paragraph,
              color: Colors.design.highContrastText,
              flex: 1,
            }}
            numberOfLines={1}
          >
            {props.name}
          </Text>
          <Text numberOfLines={1} style={{
            color: Colors.design.text, fontFamily: Fonts.Inter_500Medium, fontSize: Typography.paragraph, lineHeight: Typography.paragraph,
          }}>

            ${props.dollarRewardValue}
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: 8, justifyContent: "space-between", }}>
          <Text style={{ color: Colors.design.mutedText, fontFamily: Fonts.Inter_500Medium, fontSize: Typography.paragraph, lineHeight: Typography.paragraph, }}>
            Completed a day ago
          </Text>

        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RecentActivityComponent;

const styles = StyleSheet.create({});
