import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import AllGigs from "@/components/git-item/AllGigs";

const Gigs = () => {
  return (
    <View style={tw`h-full bg-zinc-50 pt-4 pb-16`}>
      <AllGigs />
    </View>
  );
};

export default Gigs;

const styles = StyleSheet.create({});
