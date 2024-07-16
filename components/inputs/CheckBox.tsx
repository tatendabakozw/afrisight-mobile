import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";

type Props = {};

const CheckBox = (props: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={tw`border border-zinc-300/50 p-1 rounded `}
    >
      <Ionicons name="checkmark" size={12} color="white" />
    </TouchableOpacity>
  );
};

export default CheckBox;

const styles = StyleSheet.create({});
