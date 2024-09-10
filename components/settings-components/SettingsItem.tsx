import { Image, StyleSheet, View } from "react-native";
import React from "react";
import tw from "twrnc";
import Colors from "@/constants/Colors";
import { Entypo, Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Text from "../ui/Text";
import { Fonts, Typography } from "@/constants/typography";
import IconText from "@/design-system/Text/IconText";
import { SF_ICONS } from "@/constants/icons";

type Props = {
  icon_name: any;
  heading: string;
  description: string;
  location: string;
  icon_from?: string;
};

const SettingsItem = (props: Props) => {
  return (
    <View style={[tw`flex flex-row items-center gap-3 w-full py-1`, {
      borderColor: Colors.design.separator,
      height: 54
    }]}>
      <Image source={props.icon_name} style={{ width: 48, height: 48, objectFit: "contain" }} />
      <View style={tw`flex-1`}>
        <Text style={{
          fontFamily: Fonts.Inter_600SemiBold,
          color: Colors.design.highContrastText,
          fontSize: Typography.body
        }}>{props.heading}</Text>
      </View>
      <IconText style={{
        color: Colors.design.mutedText
      }}>
        {SF_ICONS.chevron_right}
      </IconText>
    </View>
  );
};

export default SettingsItem;

const styles = StyleSheet.create({});
