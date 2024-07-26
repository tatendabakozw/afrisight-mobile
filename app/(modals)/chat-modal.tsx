import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import ChatHeader from "@/components/navigation/headers/ChatHeader";

const ChatModal = () => {
  return (
    <View style={tw`bg-zinc-100 h-full w-full`}>
      <ChatHeader />

      <Text>ChatModal</Text>
    </View>
  );
};

export default ChatModal;

const styles = StyleSheet.create({});
