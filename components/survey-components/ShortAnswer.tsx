import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { Fonts, Typography } from "@/constants/typography";
import Colors from "@/constants/Colors";
import Text from "../ui/Text";
import TextInput from "../ui/TextInput";

type Props = {
  question: string;
  value: string;
  onChange: (value: string) => void;
};
const ShortAnswer = (props: Props) => {
  const [text, setText] = useState("");

  return (
    <View style={{ paddingHorizontal: 16 }}>
      <Text style={{
        fontFamily: Fonts.Inter_600SemiBold,
        color: Colors.design.highContrastText,
        fontSize: Typography.buttonText,
        marginBottom: 8

      }}>{props.question}</Text>
      <TextInput
        style={[tw`border rounded-lg p-2`, {
          borderColor: Colors.design.separator,
          backgroundColor: Colors.design.white,
        }]}
        value={text}
        onChangeText={setText}
      />
    </View>
  );
};

export default ShortAnswer;

const styles = StyleSheet.create({});
