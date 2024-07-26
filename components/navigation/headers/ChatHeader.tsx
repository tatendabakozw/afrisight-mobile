import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";

const ChatHeader = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        tw`bg-white border-b border-zinc-200/50 pb-4 flex flex-row items-center gap-2 px-6`,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      <TouchableOpacity style={tw``}>
        <AntDesign name="arrowleft" size={24} color="#3f3f46" />
      </TouchableOpacity>
      <View style={tw`h-10 w-10 bg-zinc-200 rounded-full`} />
      <View style={tw`flex flex-col`}>
        <Text style={tw`text-zinc-950 font-semibold text-lg`}>Admin</Text>
        <Text style={tw`text-xs text-zinc-400`}>Active now</Text>
      </View>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({});
