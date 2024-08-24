import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import GigItem from "./GigItem";
import { gigs } from "@/utils/data";

const AllGigs = (props: {
  gigs: any[]
}) => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {props.gigs.map((item, index) => (
        <GigItem key={index} {...item} />

      ))}
    </View>
  );
};

export default AllGigs;

const styles = StyleSheet.create({});
