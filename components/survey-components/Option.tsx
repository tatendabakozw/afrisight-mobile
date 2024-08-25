import { StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import Colors from "@/constants/Colors";
import { OptionType } from "@/utils/types";
import { Fonts, Typography } from "@/constants/typography";
import Text from "../ui/Text";

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
    <View>
      <Text
        style={{
          fontFamily: Fonts.Inter_600SemiBold,
          color: Colors.design.highContrastText,
          fontSize: Typography.buttonText,
          marginBottom: 24,
          paddingHorizontal: 16,
        }}
      >
        {props.question}
      </Text>
      <View
        style={{
          borderTopWidth: 1,
          borderColor: Colors.design.separator,
        }}
      >
        {props.options?.map((option: OptionType) => (
          <TouchableOpacity
            activeOpacity={0.7}
            key={option._id}
            onPress={() => setSelectedId(option._id)}
            style={[
              tw`flex flex-row items-center`,
              {
                height: 64,
                borderBottomWidth: 1,
                borderColor: Colors.design.separator,
                paddingHorizontal: 16,
              },
            ]}
          >
            <Text
              style={{
                fontFamily: Fonts.Inter_500Medium,
                fontSize: Typography.buttonText,
                color: Colors.design.highContrastText,
              }}
            >
              {option.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Option;

const styles = StyleSheet.create({});
