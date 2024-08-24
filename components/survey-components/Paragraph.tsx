import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import tw from "twrnc";

type Props = {
  question: string;
};

const Paragraph = (props: Props) => {
  const [text, setText] = useState("");

  return (
    <View style={tw`gap-2`}>
      <Text style={tw`text-zinc-700`}>{props.question} (Optional)</Text>
      <TextInput
        style={tw`border border-zinc-300/50 rounded-lg p-4 h-40 text-lg bg-zinc-100`}
        multiline={true}
        numberOfLines={4}
        value={text}
        onChangeText={setText}
        placeholder="Enter your text here..."
      />
    </View>
  );
};

export default Paragraph;
