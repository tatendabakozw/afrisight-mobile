import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import Colors from "@/constants/Colors";
import AllGigs from "@/components/git-item/AllGigs";

const status_filter = [
  { name: "Pending", _id: "pending" },
  { name: "Approved", _id: "approved" },
  { name: "Declined", _id: "declined" },
  { name: "Saved", _id: "saved" },
];

const Status = () => {
  const [selected_option, setSelectedOption] = useState(status_filter[0]);
  return (
    <View style={tw`py-4 gap-6 bg-zinc-50`}>
      <View style={tw`flex flex-row items-center gap-4 px-4`}>
        {status_filter.map((item) => (
          <TouchableOpacity
            onPress={() => setSelectedOption(item)}
            activeOpacity={0.7}
            style={tw`${
              selected_option._id === item._id
                ? `bg-[${Colors.light.primary}] text-white border-[${Colors.light.primary}] `
                : "bg-white border-zinc-200/50 "
            } px-4 py-2  rounded-full border`}
            key={item._id}
          >
            <Text style={tw`text-sm`}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={tw`h-full bg-zinc-50 pt-4 pb-16`}>
        <AllGigs />
      </View>
    </View>
  );
};

export default Status;

const styles = StyleSheet.create({});
