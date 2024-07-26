import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import GigItem from "./GigItem";
import { gigs } from "@/utils/data";

const AllGigs = () => {
  const items = [1, 2, 3, 4, 5, 6, 6, 6, 6, 6, 3, 3, 3, 3, 3, 3, 3];
  return (
    <ScrollView
      style={tw`flex-1`}
      contentContainerStyle={tw`gap-4  pb-8`} // Removed flex-1 from here
    >
      <View style={tw`gap-4 px-4 `}>
        {gigs.map((item, index) => (
          <React.Fragment key={index}>
            <GigItem {...item} />
            {index < items.length - 1 && (
              <View style={tw`h-px bg-gray-200/50`} />
            )}
          </React.Fragment>
        ))}
      </View>
    </ScrollView>
  );
};

export default AllGigs;

const styles = StyleSheet.create({});
