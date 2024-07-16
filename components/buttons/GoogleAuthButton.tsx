import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import GoogleIcon from "@/assets/svgs/GoogleIcon";

type Props = {};

const GoogleAuthButton = (props: Props) => {
  return (
    <View
      style={tw`flex flex-row items-center w-full justify-between border border-zinc-300/50 rounded-full p-3`}
    >
      <View style={tw` `}>
        <GoogleIcon />
      </View>
      <Text style={tw`flex-1 text-center text-zinc-700`}>
        Sign In with Google
      </Text>
      <View style={tw` `}></View>
    </View>
  );
};

export default GoogleAuthButton;

const styles = StyleSheet.create({});
