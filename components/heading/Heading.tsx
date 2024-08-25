import { StyleSheet, View } from "react-native";
import React from "react";
import tw from "twrnc";
import Text from "../ui/Text";
import { Fonts, Typography } from "@/constants/typography";
import Colors from "@/constants/Colors";

interface Props {
  text: string;
}

const Heading = (props: Props) => {
  return <Text style={{
    fontFamily: Fonts.Inter_700Bold,
    fontSize: Typography.subheading,
    color: Colors.design.highContrastText
  }}>{props.text}</Text>;
};

export default Heading;

const styles = StyleSheet.create({});
