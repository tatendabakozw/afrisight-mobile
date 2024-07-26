import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import tw from "twrnc";
import ChatHeader from "@/components/navigation/headers/ChatHeader";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const ChatModal = () => {
  return (
    <View style={tw`bg-zinc-100 h-full w-full relative`}>
      <ChatHeader />

      <View style={tw`p-6 flex-1 h-full relative`}>
        <View style={tw`flex-1`}></View>
        <View style={tw` w-full mx-auto bottom-0 flex-row gap-2 items-center`}>
          <TextInput
            placeholder="Type something..."
            style={tw`bg-white py-3 px-4 flex-1 rounded-full`}
          />
          <TouchableOpacity
            style={tw`bg-[${Colors.light.primary}] p-3 rounded-full`}
          >
            <Feather name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChatModal;

const styles = StyleSheet.create({});
