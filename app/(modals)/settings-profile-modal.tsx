import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "twrnc";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "expo-router";
import ProgressBar from "@/components/progress-bar/ProgressBar";
import PrimaryButton from "@/components/buttons/PrimaryButton";

const SettingsProfileModal = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [progress, setProgress] = useState(0);

  const increaseProgress = () => {
    setProgress((prevProgress) => Math.min(prevProgress + 20, 100)); // Cap progress at 100%
  };

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
        <Text style={tw`text-zinc-500 font-semibold`}>Personal</Text>
        <View style={tw`p-5`} />
      </View>

      {/* Progress bar */}
      <ProgressBar progress={progress} />

      <View style={tw`flex-1`} />
      <PrimaryButton text="Next" onPress={increaseProgress} />
    </View>
  );
};

export default SettingsProfileModal;

const styles = StyleSheet.create({});
