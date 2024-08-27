import { Image, StyleSheet, View } from "react-native";
import React from "react";
import tw from "twrnc";
import GoogleIcon from "@/assets/svgs/GoogleIcon";
import Text from "../ui/Text";
import { Fonts, Typography } from "@/constants/typography";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";

type Props = {};

const GoogleAuthButton = (props: Props) => {
  const router = useRouter();

  return (
    <View
      style={tw`flex flex-row items-center w-full justify-between bg-zinc-400/10 p-3 rounded-[8px] h-[54px] `}
    >

      <Text style={{
        fontFamily: Fonts.Inter_700Bold,
        color: Colors.design.highContrastText,
        fontSize: Typography.buttonText
      }}>
        Continue with Google
      </Text>
      <View style={tw` `}></View>
    </View>
  );
};

export default GoogleAuthButton;

const styles = StyleSheet.create({});
