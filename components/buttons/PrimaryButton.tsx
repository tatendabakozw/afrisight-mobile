import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef } from "react";
import tw from "twrnc";
import Colors from "@/constants/Colors";

type Props = {
  text: string;
  onPress?: () => void;
  loading?: boolean;
  error?: boolean;
  success?: boolean;
  onLongPress?: () => void;
  muted?: boolean;
};

const PrimaryButton = ({
  text,
  onPress,
  loading,
  error,
  success,
  onLongPress,
  muted,
}: Props) => {
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (error) {
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 75,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -10,
          duration: 75,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 75,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 75,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 75,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [error]);

  return (
    <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
      <TouchableOpacity
        onLongPress={onLongPress}
        activeOpacity={0.7}
        onPress={onPress}
        style={tw`${
          error
            ? "bg-red-500 "
            : success
            ? "bg-green-600 "
            : muted
            ? "bg-white "
            : `bg-[${Colors.light.primary}] `
        }  flex flex-row justify-between w-full p-3 rounded-full`}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <View style={tw`p-3 rounded-full`} />
        )}
        <Text
          style={tw`${
            muted ? "text-zinc-950 font-semibold " : "text-white "
          } w-full text-center flex-1 text-lg`}
        >
          {loading ? "loading..." : text}
        </Text>
        <View style={tw`p-3 rounded-full`} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({});
