import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";

interface Props {
  darker?: boolean;
}

const PrimaryBorder = (props: Props) => {
  return (
    <View
      style={tw`border-t ${
        props.darker ? "border-zinc-300/60 " : "border-zinc-200/50 "
      }  w-full`}
    />
  );
};

export default PrimaryBorder;

const styles = StyleSheet.create({});
