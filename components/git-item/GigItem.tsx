import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

type Props = {};

const GigItem = (props: Props) => {
  return (
    <TouchableOpacity
      onPress={() => router.push("(modals)/gig-description")}
      style={tw`rounded-3xl gap-2`}
    >
      <View style={tw`flex flex-row items-center gap-4`}>
        <Image
          height={20}
          width={20}
          style={tw`h-16 w-16 bg-red-100 rounded-2xl`}
          source={require("../../assets/images/home-assets/profile-complete.jpg")}
        />
        <View style={tw`flex flex-col gap-1 flex-1`}>
          <View style={tw`flex flex-row items-center gap-4`}>
            <Text style={tw`text-xl font-bold text-zinc-950`}>Store VSRG</Text>
            <Text
              style={tw`px-2 py-1 bg-green-600/20 text-green-600 text-xs font-bold rounded-full`}
            >
              Easy
            </Text>
          </View>
          <View style={tw`flex flex-row items-center gap-0.5`}>
            <View style={tw`flex flex-row items-center gap-0.5`}>
              <MaterialIcons name="access-time" size={16} color="#a1a1aa" />
              <Text style={tw`text-xs text-zinc-400 font-bold`}>{5}m</Text>
            </View>
            <Entypo name="dot-single" size={16} color="#a1a1aa" />
            <View style={tw`flex flex-row items-center gap-0.5`}>
              <MaterialIcons
                name="location-searching"
                size={16}
                color="#a1a1aa"
              />
              <Text style={tw`text-xs text-zinc-400 font-bold`}>Harare</Text>
            </View>
          </View>
        </View>
        <Text
          style={[
            tw`text-xl text-zinc-950`,
            {
              fontWeight: "900",
            },
          ]}
        >
          $1.05
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default GigItem;

const styles = StyleSheet.create({});
