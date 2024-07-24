import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import GigItem from "./GigItem";

const AllGigs = () => {
  return (
    <ScrollView
      style={tw`flex-1`}
      contentContainerStyle={tw`gap-4  pb-8`} // Removed flex-1 from here
    >
      <View style={tw`gap-6 px-4 `}>
        {[1, 2, 3, 4, 5, 6, 6, 6, 6, 6, 3, 3, 3, 3, 3, 3, 3].map(
          (item, index) => (
            <GigItem key={index} />
          )
        )}
      </View>
    </ScrollView>
  );
};

export default AllGigs;

const styles = StyleSheet.create({});
