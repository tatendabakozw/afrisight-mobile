import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "twrnc";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "expo-router";

const SettingsProfileModal = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <View
      style={[
        tw`bg-zinc-50 h-full p-4`,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      {/* header */}
      <View style={tw`flex flex-row items-center justify-between py-2 `}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={tw`bg-white border-zinc-200/50 p-2 rounded-full`}
        >
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-zinc-500 font-semibold`}>Personal</Text>
        <View style={tw`p-5`} />
      </View>
      {/* Progress bar */}
    </View>
  );
};

export default SettingsProfileModal;

const styles = StyleSheet.create({});
