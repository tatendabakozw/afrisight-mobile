import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "twrnc";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "expo-router";
import ProgressBar from "@/components/progress-bar/ProgressBar";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import Personal from "@/components/profile-sections/Personal";
import Experience from "@/components/profile-sections/Experience";
import Ethnicity from "@/components/profile-sections/Ethnicity";
import Hobbies from "@/components/profile-sections/Hobbies";

const steps = [
  { name: "Personal", step: 1, _id: "personal" },
  { name: "Experience", step: 2, _id: "experience" },
  { name: "Ethnicity", step: 3, _id: "ethnicity" },
  { name: "Hobbies", step: 4, _id: "hobbies" },
];

const SettingsProfileModal = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const progress = (currentStepIndex / (steps.length - 1)) * 100;

  const goToNextStep = () => {
    setCurrentStepIndex((prevIndex) =>
      Math.min(prevIndex + 1, steps.length - 1)
    );
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
        <Text style={tw`text-zinc-500 font-semibold`}>
          {steps[currentStepIndex].name}
        </Text>
        <View style={tw`p-5`} />
      </View>

      {/* Progress bar */}
      <ProgressBar progress={progress} />
      <View style={tw`flex flex-col gap-4 py-6`}>
        {steps[currentStepIndex].step === 1 && <Personal />}
        {steps[currentStepIndex].step === 2 && <Experience />}
        {steps[currentStepIndex].step === 3 && <Ethnicity />}
        {steps[currentStepIndex].step === 4 && <Hobbies />}
      </View>

      <View style={tw`flex-1`} />
      <PrimaryButton text="Next" onPress={goToNextStep} />
    </View>
  );
};

export default SettingsProfileModal;

const styles = StyleSheet.create({});
