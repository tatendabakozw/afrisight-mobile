import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";

type Props = {};

const InfoArea = (props: Props) => {
  return (
    <View style={tw`flex flex-col gap-2`}>
      <Text style={tw` text-zinc-950 font-semibold text-3xl`}>
        Iam a heading
      </Text>
      <Text style={tw` text-zinc-500  text-lg`}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
        pariatur magnam dolore dolorum distinctio, commodi obcaecati sint id
        quas incidunt, quos deserunt nostrum suscipit! Totam reiciendis eius
        voluptatibus saepe unde.
      </Text>
    </View>
  );
};

export default InfoArea;

const styles = StyleSheet.create({});
