import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import tw from "twrnc";
import GigItem from "./GigItem";
import { useFetch } from "@/hooks/useFetch";
import { apiUrl } from "@/utils/apiUrl";
import { GigItemProps } from "@/utils/types";
import { gigs } from "@/utils/data";

const AllGigs: React.FC = () => {
  const response = useFetch(`${apiUrl}/gig/gigs`);

  const formattedGigs: GigItemProps[] =
    response?.data?.gigs?.map((gig: any) => ({
      title: gig.name,
      description: gig.desc,
      type: gig.category,
      reward: {
        type: gig.priceType,
        name: gig.price,
      },
      points: gig.price,
      location: gig.location,
      image: gig.image,
      _id: gig._id,
      requirements: gig.surveyLink, // Assuming 'surveyLink' is the equivalent of 'requirements'
      deadline: undefined, // No deadline provided in the response
      difficulty: gig.difficult,
      duration: Number(gig.duration),
    })) || []; // Ensure it returns an empty array if `response.gigs` is undefined

  return (
    <ScrollView style={tw`flex-1`} contentContainerStyle={tw`gap-4 pb-8`}>
      <View style={tw`gap-4 px-4`}>
        {formattedGigs.map((item: GigItemProps) => (
          <GigItem key={item._id} {...item} />
        ))}
        {/* export interface GigItemProps {
  title: string;
  description: string;
  type: string;
  reward: {
    type: string;
    name: string;
  };
  points: string;
  location: string;
  image: any;
  _id: string;
  requirements: any;
  deadline?: string;
  difficulty?: string;
  duration: number;
} */}
        {gigs.map((item, index) => (
          <React.Fragment key={index}>
            <GigItem {...item} />
          </React.Fragment>
        ))}
      </View>
    </ScrollView>
  );
};

export default AllGigs;

const styles = StyleSheet.create({});
