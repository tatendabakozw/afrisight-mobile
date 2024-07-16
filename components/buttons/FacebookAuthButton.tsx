import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import FacecbookIcon from "@/assets/svgs/FacebookIcon";

type Props = {};

const FacebookAuthButton = (props: Props) => {
  return (
    <View
      style={tw`bg-[#588AFA] flex flex-row items-center w-full justify-between border border-zinc-300/50 rounded-full p-3`}
    >
      <View style={tw` `}>
        <FacecbookIcon />
      </View>
      <Text style={tw`flex-1 text-center text-white`}>
        Sign In with Facebook
      </Text>
      <View style={tw` `}></View>
    </View>
  );
};

export default FacebookAuthButton;

const styles = StyleSheet.create({});
