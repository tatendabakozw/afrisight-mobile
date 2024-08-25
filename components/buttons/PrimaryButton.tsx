import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef } from "react";
import tw from "twrnc";
import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import Text from "../ui/Text";

type Props = {
  text: string;
  onPress?: () => void;
  loading?: boolean;
  error?: boolean;
  success?: boolean;
  onLongPress?: () => void;
  muted?: boolean;
  icon?: any;
};

const PrimaryButton = ({
  text,
  onPress,
  loading,
  error,
  success,
  onLongPress,
  muted,
  icon,
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
    <Animated.View style={{ transform: [{ translateX: shakeAnim }], flex: 1 }}>
      <TouchableOpacity
        onLongPress={onLongPress}
        activeOpacity={0.7}
        onPress={onPress}
        style={{
          ...tw`${error
            ? "bg-red-500 "
            : success
              ? "bg-green-600 "
              : muted
                ? "bg-white "
                : `bg-[${Colors.light.text}] `
            }  flex flex-row justify-between items-center w-full py-3 px-4 rounded-full`, borderRadius: 8, height: 54
        }}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : success ? (
          <Feather name="check-circle" size={20} color="white" />
        ) : error ? (
          <Feather name="alert-triangle" size={20} color="white" />
        ) : icon ? (
          <>{icon}</>
        ) : (
          <View style={tw`p-3 rounded-full`} />
        )}
        <Text
          style={[tw`${muted ? "text-red-600 " : "text-white "
            } w-full text-center flex-1`, { fontFamily: "Inter_700Bold", fontSize: 17 }]}
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
