import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

type Props = {};

const GigItem = (props: Props) => {
  return (
    <View style={tw`rounded-3xl gap-2`}>
      <View style={tw`flex flex-row items-center gap-2`}>
        <Image
          height={20}
          width={20}
          style={tw`h-16 w-16 bg-red-100 rounded-2xl`}
          source={require("../../assets/images/home-assets/profile-complete.jpg")}
        />
        <View style={tw`flex flex-col gap-2 flex-1`}>
          <View style={tw`flex flex-row items-center gap-4`}>
            <Text style={tw`text-xl font-bold text-zinc-950`}>Store VSRG</Text>
            <Text
              style={tw`px-2 py-1 bg-green-600/20 text-green-600 text-xs font-bold rounded-full`}
            >
              Easy
            </Text>
          </View>
          <View style={tw`flex flex-row items-center gap-1`}>
            <View style={tw`flex flex-row items-center gap-0.5`}>
              <MaterialIcons name="access-time" size={16} color="#0f172a" />
              <Text style={tw`text-xs text-zinc-950 font-bold`}>{5}m</Text>
            </View>
            <Entypo name="dot-single" size={16} color="#0f172a" />
            <View style={tw`flex flex-row items-center gap-0.5`}>
              <MaterialIcons
                name="location-searching"
                size={16}
                color="#0f172a"
              />
              <Text style={tw`text-xs text-zinc-950 font-bold`}>Harare</Text>
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
    </View>
  );
};

export default GigItem;

const styles = StyleSheet.create({});
