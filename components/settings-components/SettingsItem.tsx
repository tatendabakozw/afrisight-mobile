import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import tw from "twrnc";
import Colors from "@/constants/Colors";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

type Props = {
  icon_name: any;
  heading: string;
  description: string;
  location: string;
  icon_from?: string;
};

const SettingsItem = (props: Props) => {
  return (
    <TouchableOpacity
      onPress={() => router.push("(modals)/settings-wallet")}
      style={tw`flex flex-row items-center gap-4 w-full`}
    >
      <View
        style={tw`flex h-12 w-12 rounded-full justify-center items-center bg-[${Colors.light.primary}]/10`}
      >
        {props.icon_from === "ionicons" ? (
          <Ionicons
            name={props.icon_name}
            size={24}
            color={`${Colors.light.primary}`}
          />
        ) : (
          <Feather
            name={props.icon_name}
            size={24}
            color={`${Colors.light.primary}`}
          />
        )}
      </View>
      <View style={tw`flex-1`}>
        <Text style={tw`text-zinc-950 font-semibold`}>{props.heading}</Text>
        <Text style={tw`text-zinc-400`}>{props.description}</Text>
      </View>
      <Entypo name="chevron-right" size={24} color="#9ca3af" />
    </TouchableOpacity>
  );
};

export default SettingsItem;

const styles = StyleSheet.create({});
