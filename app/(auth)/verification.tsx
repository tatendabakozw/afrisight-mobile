import {
  StyleSheet,
  Text,
  TextInput,
  View,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";
import React, { useState, useRef } from "react";
import tw from "twrnc";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import PulsingView from "@/components/pulse-view/PulseView";

const Verification: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [error, setError] = useState(false);
  const [code, setCode] = useState<string[]>(["", "", "", "", ""]);
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    setError(false); // Reset error state on input change

    // Focus on next input if text is entered
    if (text && index < inputs.current.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (event.nativeEvent.key === "Backspace" && index > 0 && !code[index]) {
      inputs.current[index - 1]?.focus();
    }
  };

  const verifyUser = () => {
    if (code.includes("")) {
      setError(true);
    } else {
      // Proceed with verification
    }
  };

  return (
    <View
      style={[
        tw`gap-6 w-full px-6 py-8 h-full bg-white items-center gap-6`,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      <PulsingView />
      <Text style={[tw`text-zinc-950 text-2xl`, { fontWeight: "700" }]}>
        Verification Code
      </Text>
      <Text style={tw`text-lg text-zinc-500 font-medium text-center`}>
        We have sent a 5-digit verification code to your email. Please take a
        look and verify it.
      </Text>
      <View style={tw`flex flex-row justify-between w-full px-10`}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputs.current[index] = el)}
            style={[
              tw`w-10 font-semibold text-lg h-10 rounded-lg text-center`,
              tw`border-2 text-lg`,
              error && code[index] === ""
                ? tw`border-red-500`
                : { borderColor: Colors.light.primary },
            ]}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(event) => handleKeyPress(event, index)}
            value={digit}
          />
        ))}
      </View>
      <Text style={tw`font-semibold text-lg text-zinc-950`}>
        example@email.com
      </Text>
      <View style={tw`flex-1`} />
      <PrimaryButton text="Verify" onPress={verifyUser} error={error} />
      <PrimaryButton text="Send Again" muted />
    </View>
  );
};

export default Verification;

const styles = StyleSheet.create({});
