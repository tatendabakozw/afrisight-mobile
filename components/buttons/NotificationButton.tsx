import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const NotificationButton = () => {
  return (
    <TouchableOpacity
      onPress={() => router.push("(modals)/notification")}
      activeOpacity={0.7}
      style={tw`bg-white rounded-full p-3 border border-zinc-200/50`}
    >
      <Ionicons name="notifications-outline" size={20} color="#3f3f46" />
    </TouchableOpacity>
  );
};

export default NotificationButton;

const styles = StyleSheet.create({});
