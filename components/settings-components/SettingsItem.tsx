import { StyleSheet, View } from "react-native";
import React from "react";
import tw from "twrnc";
import Colors from "@/constants/Colors";
import { Entypo, Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Text from "../ui/Text";
import { Fonts } from "@/constants/typography";

type Props = {
  icon_name: any;
  heading: string;
  description: string;
  location: string;
  icon_from?: string;
};

const SettingsItem = (props: Props) => {
  return (
    <View style={[tw`flex flex-row items-center gap-3 w-full py-2 border-b`, {
      borderColor: Colors.design.separator
    }]}>
      <View
        style={{
          height: 40,
          width: 40,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {props.icon_from === "ionicons" ? (
          <Ionicons
            name={props.icon_name}
            size={24}
            color={Colors.design.highContrastText}
          />
        ) : (
          <Feather
            name={props.icon_name}
            size={24}
            color={Colors.design.highContrastText}
          />
        )}
      </View>
      <View style={tw`flex-1`}>
        <Text style={{
          fontFamily: Fonts.Inter_500Medium,
          color: Colors.design.highContrastText
        }}>{props.heading}</Text>
      </View>
      <Feather name="chevron-right" size={24} color={Colors.design.text} />
    </View>
  );
};

export default SettingsItem;

const styles = StyleSheet.create({});
