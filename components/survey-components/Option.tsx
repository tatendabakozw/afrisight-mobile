import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Fonts, Typography } from "@/constants/typography";
import Text from "../ui/Text";

type Props = {
  question: string;
  options: { _id: string; name: string }[];
  value: string;
  onChange: (value: string) => void;
};

const Option = ({ question, options, value, onChange }: Props) => {
  return (
    <View>
      <Text
        style={{
          fontFamily: Fonts.Inter_600SemiBold,
          color: Colors.design.highContrastText,
          fontSize: Typography.paragraph,
          marginBottom: 24,
          paddingHorizontal: 16,
        }}
      >
        {question}
      </Text>
      <View
        style={{
          borderTopWidth: 1,
          borderColor: Colors.design.separator,
        }}
      >
        {options?.map((option) => (
          <TouchableOpacity
            activeOpacity={0.7}
            key={option._id}
            onPress={() => onChange(option._id)}
            style={[
              {
                height: 64,
                borderBottomWidth: 1,
                borderColor: Colors.design.separator,
                paddingHorizontal: 16,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: value === option._id ? Colors.design.accent + '20' : 'transparent',
              },
            ]}
          >
            <Text
              style={{
                fontFamily: Fonts.Inter_500Medium,
                fontSize: Typography.paragraph,
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
