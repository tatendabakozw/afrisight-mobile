import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

type Props = {
  isChecked: boolean;
  setIsChecked: any;
};

const CheckBox = ({ isChecked, setIsChecked }: Props) => {
  return (
    <TouchableOpacity
      onPress={() => setIsChecked(!isChecked)}
      activeOpacity={0.7}
      style={tw`${
        isChecked ? `bg-[${Colors.light.primary}] ` : "bg-white "
      } border h-6 w-6 border-zinc-300/50 p-1 rounded-lg items-center justify-center `}
    >
      <Ionicons name="checkmark-sharp" size={12} color="white" />
    </TouchableOpacity>
  );
};

export default CheckBox;

const styles = StyleSheet.create({});
