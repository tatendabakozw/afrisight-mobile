import Colors from "@/constants/Colors";
import { Fonts, Typography } from "@/constants/typography";
import React, { useState } from "react";
import { View } from "react-native";
import tw from "twrnc";
import Text from "../ui/Text";
import TextInput from "../ui/TextInput";

type Props = {
  question: string;
};

const Paragraph = (props: Props) => {
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
        style={[tw`border border-zinc-300/50 rounded-lg p-4 h-40`, { backgroundColor: Colors.design.white }]}
        multiline={true}
        numberOfLines={4}
        value={text}
        onChangeText={setText}
      />
    </View>
  );
};

export default Paragraph;
