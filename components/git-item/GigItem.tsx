import { StyleSheet, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { GigItemProps } from "@/utils/types";
import Colors from "@/constants/Colors";
import { truncateText } from "@/app/utils/text-moderators";
import Text from "../ui/Text";
import { Fonts, Typography } from "@/constants/typography";

const GigItem = (props: GigItemProps) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/(modals)/gig-description",
          params: { gig_id: props._id, gig_type: props.type },
        })
      }
      style={{
        paddingVertical: 24,
        borderBottomWidth: 0.5,
        borderColor: Colors.design.separator,
        paddingHorizontal: 16

      }}
    >
      <View style={{ flexDirection: "row", marginBottom: 16, alignItems: "center", justifyContent: "space-between", gap: 24, flexShrink: 1 }}>
        <View>
          <Text style={{ color: Colors.design.mutedText, fontFamily: Fonts.Inter_400Regular, fontSize: 13 }}>Created {props.age} days ago</Text>
          <Text
            style={{
              fontFamily: Fonts.Inter_500Medium,
              fontSize: Typography.buttonText,
              color: Colors.design.highContrastText,
              maxWidth: 300
            }}
          >
            {props.name}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <TouchableOpacity style={{ height: 40, width: 40, borderRadius: 20, alignItems: "center", justifyContent: "center" }}>
            <MaterialIcons name="bookmark" size={24} style={{ color: Colors.design.interactiveSurface }} />
          </TouchableOpacity>

        </View>
      </View>
      <Text style={{ color: Colors.design.text, marginBottom: 12 }}>
        {truncateText(props.desc, 100)}
      </Text>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <View style={{ flexDirection: "row", gap: 4 }}>

          <Text style={{ color: Colors.design.text }}>
            <Text
              style={{
                fontFamily: Fonts.Inter_500Medium,
                color: Colors.design.highContrastText,
              }}
            >
              {props.price}
            </Text>{" "}
            points
          </Text>
        </View>
        <Text style={{ color: Colors.design.mutedText }}>&bull;</Text>
        <Text style={{ color: Colors.design.text, fontFamily: Fonts.Inter_400Regular }}>{props.location}</Text>

      </View>
      {/* <View style={{ flexDirection: "row" }}>
      <Text style={{ fontFamily: Fonts.Inter_700Bold, color: Colors.design.accent }}>
        Trending
      </Text>
    </View> */}
    </TouchableOpacity>
  );
};

export default GigItem;

const styles = StyleSheet.create({});
