import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import GoogleIcon from "@/assets/svgs/GoogleIcon";

type Props = {};

const GoogleAuthButton = (props: Props) => {
  return (
    <View
      style={tw`flex flex-row items-center w-full justify-between bg-zinc-400/10 p-3 rounded-[8px] h-[54px] `}
    >
      <View style={tw` `}>
        <GoogleIcon />
      </View>
      <Text style={tw`flex-1 text-center text-zinc-700 font-bold`}>
        Continue with Google
      </Text>
      <View style={tw` `}></View>
    </View>
  );
};

export default GoogleAuthButton;

const styles = StyleSheet.create({});
