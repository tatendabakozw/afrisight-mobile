import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import Colors from "@/constants/Colors";
import { OptionType } from "@/utils/types";

type Props = {
  question: string;
  options: OptionType[];
};

const answers = [
  { answer: "Sugar", id: "sugar" },
  { answer: "Salt", id: "salt" },
  { answer: "Melon", id: "melon" },
  { answer: "Height", id: "height" },
];

const Option = (props: Props) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <View style={tw`flex flex-col gap-4`}>
      <Text style={tw`text-zinc-700`}>{props.question}?</Text>
      <View style={tw`gap-2`}>
        {props.options?.map((option: OptionType) => (
          <TouchableOpacity
            activeOpacity={0.7}
            key={option._id}
            onPress={() => setSelectedId(option._id)}
            style={tw`flex flex-row gap-2 items-center`}
          >
            <View
              style={tw`h-5 w-5 border-2 ${
                selectedId === option._id
                  ? `border-[${Colors.light.primary}] bg-[${Colors.light.primary}]/50`
                  : "border-zinc-400/50"
              } rounded-full`}
            />
            <Text style={tw`text-zinc-700`}>{option.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Option;

const styles = StyleSheet.create({});
