import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import Colors from "@/constants/Colors";

const NotificationsHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={tw`flex flex-row gap-4 py-2`}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={tw`bg-zinc-100 rounded-full p-2`}
      >
        <Ionicons name="arrow-back-sharp" size={24} color="#71717a" />
      </TouchableOpacity>
      <View style={tw`flex-1`} />
      <TouchableOpacity style={tw` rounded-full p-2`}>
        <Text style={tw`text-[${Colors.light.primary}]`}>Mark all as read</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotificationsHeader;

const styles = StyleSheet.create({});
