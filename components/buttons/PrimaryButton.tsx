import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import tw from "twrnc";
import Colors from "@/constants/Colors";

type Props = {
  text: string;
  onPress?: () => void;
  loading?: boolean;
  error?: boolean;
  success?: boolean;
};

const PrimaryButton = ({ text, onPress, loading, error, success }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={tw`${
        error
          ? "bg-red-500 "
          : success
          ? "bg-green-600 "
          : `bg-[${Colors.light.primary}]`
      }  flex flex-row justify-between w-full p-3 rounded-full`}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <View style={tw`p-3 rounded-full`} />
      )}
      <Text style={tw`text-white w-full text-center flex-1 text-lg`}>
        {loading ? "loading..." : text}
      </Text>
      <View style={tw`p-3 rounded-full`} />
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({});
