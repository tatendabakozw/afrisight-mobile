import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";

type Props = {};

const GigItem = (props: Props) => {
  return (
    <View style={tw`bg-white p-6 rounded-3xl border border-zinc-200/50 gap-2`}>
      <View style={tw`flex flex-row items-center justify-between`}>
        <Text style={tw`text-xl font-bold text-zinc-950`}>Store VSRG</Text>
        <Text style={tw`text-xl font-bold text-zinc-950`}>$1.05</Text>
      </View>
    </View>
  );
};

export default GigItem;

const styles = StyleSheet.create({});
