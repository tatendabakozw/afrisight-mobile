import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import tw from "twrnc";
import { AntDesign } from "@expo/vector-icons";

const FilterButton = () => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => router.push("filter-modal")}
      style={tw`flex flex-row items-center bg-white p-3 gap-4 rounded-full border border-zinc-200/50`}
    >
      <AntDesign name="filter" size={20} color="#3f3f46" />
    </TouchableOpacity>
  );
};

export default FilterButton;

const styles = StyleSheet.create({});
