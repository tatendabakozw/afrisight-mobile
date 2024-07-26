import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";

interface Props {
  text: string;
}

const Heading = (props: Props) => {
  return <Text style={tw`text-zinc-500 text-lg`}>{props.text}</Text>;
};

export default Heading;

const styles = StyleSheet.create({});
