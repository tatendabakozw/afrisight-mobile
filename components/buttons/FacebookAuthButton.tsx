import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import FacecbookIcon from "@/assets/svgs/FacebookIcon";
import { Fonts, Typography } from "@/constants/typography";
import Colors from "@/constants/Colors";

type Props = {};

const FacebookAuthButton = (props: Props) => {
  return (
    <View
      style={tw`flex flex-row items-center w-full justify-between bg-[#588AFA] rounded-[8px] h-[54px] p-3`}
    >
      <View style={{}}>
        <FacecbookIcon />
      </View>
      <Text style={{
        fontFamily: Fonts.Inter_700Bold,
        color: Colors.design.white,
        fontSize: Typography.buttonText
      }}>
        Continue with Facebook
      </Text>
      <View style={tw` `}></View>
    </View>
  );
};

export default FacebookAuthButton;

const styles = StyleSheet.create({});
