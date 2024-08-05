import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import Colors from "@/constants/Colors";

type Props = {};

const Ethnicity = (props: Props) => {
  const [selectedEthinicity, setSelectedEthnicity] = useState<any>();
  const ethnicities = [
    { name: "Asian", _id: "asian" },
    { name: "Black/African", _id: "african" },
    { name: "Middle Eastern/ North African", _id: "middle-eastern" },
    { name: "Hispanic/Latino", _id: "hiispanic" },
    { name: "Pacific Islander", _id: "pacific-finder" },
    { name: "Mixed Race", _id: "mixed" },
    { name: "Native American/First Nations", _id: "native-american" },
    { name: "White/Caucasian", _id: "white" },
    { name: "Other", _id: "other" },
  ];
  return (
    <View style={tw`flex flex-row flex-wrap gap-6`}>
      {ethnicities.map((item) => (
        <TouchableOpacity
          onPress={() => setSelectedEthnicity(item)}
          activeOpacity={0.7}
          style={tw`${
            selectedEthinicity?._id === item._id
              ? `bg-[${Colors.light.primary}] `
              : "bg-zinc-200 "
          }  py-2 px-4 rounded-full`}
          key={item._id}
        >
          <Text style={tw`text-zinc-700`}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Ethnicity;
