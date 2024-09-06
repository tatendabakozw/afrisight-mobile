import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import tw from "twrnc";
import Feather from "@expo/vector-icons/Feather";

const WalletSettings = () => {
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
      {/* Header */}
      <View style={tw`flex flex-row items-center justify-between py-2 mb-4`}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={tw`bg-white border-zinc-200/50 p-2 rounded-full`}
        >
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-zinc-500 font-semibold`}>Wallet Settings</Text>
        <View style={tw`p-5`} />
      </View>
    </View>
  );
};

export default WalletSettings;

const styles = StyleSheet.create({});
