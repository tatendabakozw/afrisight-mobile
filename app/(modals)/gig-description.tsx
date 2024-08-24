import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import GigDescriptionHeader from "@/components/navigation/headers/GigDescriptionHeader";
import { router, useLocalSearchParams } from "expo-router";
import { useFetch } from "@/hooks/useFetch";
import { apiUrl } from "@/utils/apiUrl";

const GigDescription = () => {
  const insets = useSafeAreaInsets();
  const { gig_id } = useLocalSearchParams();

  const response = useFetch(`${apiUrl}/gig/${gig_id}`);

  console.log("response from single id: ", response.data);

  return (
    <ScrollView
      contentContainerStyle={[
        tw`bg-zinc-50 px-4 w-full h-full items-center gap-4 pb-4`,
        {
          paddingTop: insets.top,
        },
      ]}
      style={tw`h-full w-full`}
    >
      <GigDescriptionHeader />
      <View style={tw`text-bg-zinc-100 rounded-2xl h-32 w-32`}>
        <Image
          style={tw`h-32 w-32 bg-zinc-100 rounded-2xl`}
          source={require("../../assets/images/home-assets/profile-complete.jpg")}
        />
      </View>
      <Text
        style={tw`text-zinc-950 max-w-xs text-3xl font-semibold text-center`}
      >
        Luxury watch customer service experience
      </Text>
      <Text style={tw`text-zinc-400 text-lg `}>$25 gift card</Text>
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
      <View style={tw`flex flex-col w-full gap-2`}>
        <Text style={tw`text-zinc-400 font-semibold`}>Deadline</Text>
        <Text
          style={[
            tw`text-zinc-600`,
            {
              lineHeight: 20,
            },
          ]}
        >
          25/08/2024 at 10:00pm
        </Text>
      </View>
      <View style={tw`py-2`} />
      {!response.data.surveyLink ? (
        <PrimaryButton
          onPress={() =>
            router.push({
              pathname: "(modals)/settings-profile-modal",
            })
          }
          text="Start Now"
        />
      ) : (
        <PrimaryButton
          onPress={() =>
            router.push({
              pathname: "(modals)/gig-modal",
              params: { surveyLink: response.data.surveyLink },
            })
          }
          text="Start Now"
        />
      )}
    </ScrollView>
  );
};

export default GigDescription;

const styles = StyleSheet.create({});
