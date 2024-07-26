import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import tw from "twrnc";
import Colors from "@/constants/Colors";

const PhoneNumberInput = () => {
  return (
    <View style={tw`flex-col gap-1`}>
      <Text style={tw`text-zinc-700`}>Enter new number</Text>
      <View
        style={tw`flex flex-row p-1 rounded-lg border border-zinc-200/50 gap-2`}
      >
        <TouchableOpacity
          style={tw`bg-zinc-200 rounded-lg p-3 items-center justify-center`}
        >
          <Text
            style={tw`text-[${Colors.light.primary}] text-xs font-semibold`}
          >
            +263
          </Text>
        </TouchableOpacity>
        <TextInput
          placeholder="Enter phone"
          style={tw`p-1 flex-1 rounded-lg text-xs`}
        />
      </View>
    </View>
  );
};

export default PhoneNumberInput;

const styles = StyleSheet.create({});
