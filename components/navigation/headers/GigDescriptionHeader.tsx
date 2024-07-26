import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";
import tw from "twrnc";

const GigDescriptionHeader = () => {
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
      <TouchableOpacity style={tw`bg-zinc-100 rounded-full p-2`}>
        <Feather name="share-2" size={24} color="#71717a" />
      </TouchableOpacity>
      <TouchableOpacity style={tw`bg-zinc-100 rounded-full p-2`}>
        <Feather name="bookmark" size={24} color="#71717a" />
      </TouchableOpacity>
    </View>
  );
};

export default GigDescriptionHeader;

const styles = StyleSheet.create({});
