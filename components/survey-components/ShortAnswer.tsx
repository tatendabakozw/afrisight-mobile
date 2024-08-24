import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";

type Props = {
  question: string;
};

const ShortAnswer = (props: Props) => {
  const [text, setText] = useState("");

  return (
    <View style={tw`flex flex-col gap-2`}>
      <Text style={tw`text-zinc-700`}>{props.question} (Optional)</Text>
      <TextInput
        style={tw`border border-zinc-300/50 rounded-lg p-2 bg-zinc-100`}
        value={text}
        onChangeText={setText}
        placeholder="Enter your text here..."
      />
    </View>
  );
};

export default ShortAnswer;

const styles = StyleSheet.create({});
