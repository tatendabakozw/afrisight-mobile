import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import PrimaryButton from "@/components/buttons/PrimaryButton";

const GigDescription = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        tw`bg-zinc-50 h-full px-4 w-full items-center gap-4`,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      <View style={tw`flex flex-row gap-4 py-2`}>
        <TouchableOpacity style={tw`bg-zinc-100 rounded-full p-2`}>
          <Ionicons name="arrow-back-sharp" size={24} color="#71717a" />
        </TouchableOpacity>
        <View style={tw`flex-1`} />
        <TouchableOpacity style={tw`bg-zinc-100 rounded-full p-2`}>
          <Feather name="share-2" size={24} color="#71717a" />
        </TouchableOpacity>
        <TouchableOpacity style={tw`bg-zinc-100 rounded-full p-2`}>
          <Feather name="bookmark" size={24} color="#71717a" />
        </TouchableOpacity>
      </View>
      <View style={tw`text-bg-zinc-100 rounded-full h-32 w-32`}>
        {/* put images here */}
      </View>
      <Text
        style={tw`text-zinc-950 max-w-xs text-3xl font-semibold text-center`}
      >
        Luxury watch customer service experience
      </Text>
      <Text style={tw`text-zinc-400 text-lg font-semibold`}>$25 gift card</Text>
      <View style={tw`mx-auto bg-green-600/20 py-2 px-4 rounded-full`}>
        <Text style={tw`text-green-600 text-xs font-semibold`}>Level 1</Text>
      </View>
      <View style={tw`border-t border-zinc-200/50 w-full my-4`} />
      <View style={tw`flex flex-col w-full gap-2`}>
        <Text style={tw`text-zinc-400 font-semibold`}>Description</Text>
        <Text
          style={[
            tw`text-zinc-600`,
            {
              lineHeight: 20,
            },
          ]}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
          assumenda autem aperiam rerum neque. Illo accusantium reprehenderit
          velit obcaecati illum, deserunt reiciendis, excepturi ea corporis,
          ullam autem explicabo similique iusto.
        </Text>
      </View>
      <View style={tw`flex flex-col w-full gap-1`}>
        <Text style={tw`text-zinc-400 font-semibold`}>Requirements</Text>
        <Text
          style={[
            tw`text-zinc-600`,
            {
              lineHeight: 20,
            },
          ]}
        >
          <Text style={tw`text-zinc-950 font-semibold`}>1.</Text> Lorem, ipsum
          dolor sit amet consectetur adipisicing elit.
        </Text>
        <Text
          style={[
            tw`text-zinc-600`,
            {
              lineHeight: 20,
            },
          ]}
        >
          <Text style={tw`text-zinc-950 font-semibold`}>2.</Text> Corporis illum
          consequuntur dicta modi facilis. Officiis, minima incidunt.
        </Text>
        <Text
          style={[
            tw`text-zinc-600`,
            {
              lineHeight: 20,
            },
          ]}
        >
          <Text style={tw`text-zinc-950 font-semibold`}>3.</Text> Debitis hic
          quo cupiditate quaerat architecto perspiciatis, eveniet pariatur?
        </Text>
      </View>
      <View style={tw`py-2`} />
      <PrimaryButton text="Apply" />
    </View>
  );
};

export default GigDescription;

const styles = StyleSheet.create({});
