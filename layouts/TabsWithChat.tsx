import { StyleSheet, TouchableOpacity, View, Animated } from "react-native";
import React, { ReactNode, useRef } from "react";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { router } from "expo-router";

type Props = { children?: ReactNode };

const TabsWithChat = ({ children }: Props) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 1.2,
      friction: 1,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={tw`relative h-full`}>
      {children}
      <View
        style={tw`flex flex-col items-end w-full absolute bottom-5 right-5`}
      >
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push("/(modals)/chat-modal")}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={tw`bg-[${Colors.light.primary}] p-4 rounded-full`}
          >
            <Ionicons name="chatbox-outline" size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default TabsWithChat;

const styles = StyleSheet.create({});
