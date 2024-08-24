import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import Colors from "@/constants/Colors";

const GigDescriptionHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={tw`flex flex-row gap-4 py-2`}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[tw`rounded-full p-2`, {
          backgroundColor: Colors.design.interactiveCardSurface
        }]}
      >
        <Feather name="x" size={24} color={Colors.design.text} />
      </TouchableOpacity>
      <View style={tw`flex-1`} />

      <TouchableOpacity style={[tw`rounded-full p-2`, {
        backgroundColor: Colors.design.interactiveCardSurface
      }]}>
        <Feather name="bookmark" size={24} color={Colors.design.text} />
      </TouchableOpacity>
    </View>
  );
};

export default GigDescriptionHeader;

const styles = StyleSheet.create({});
