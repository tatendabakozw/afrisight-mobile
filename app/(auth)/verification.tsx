import {
  StyleSheet,
  TextInput,
  View,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef } from "react";
import tw from "twrnc";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import PulsingView from "@/components/pulse-view/PulseView";
import RegisterSuccessModal from "@/components/modals/RegisterSuccessModal";
import { router, useLocalSearchParams } from "expo-router";
import { useAuth, useSignUp } from "@clerk/clerk-expo";
import Text from "@/components/ui/Text";
import { Fonts, Typography } from "@/constants/typography";

const Verification: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { emailAddress }: { emailAddress: string } = useLocalSearchParams();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const inputs = useRef<(TextInput | null)[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false)

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    setError(false);

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


  const { isLoaded, signUp, setActive, } = useSignUp()

  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }

    setLoading(true)

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: code.join(''),
      })

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })
        router.replace('/(tabs)')
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2))
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    } finally {
      setLoading(false)
    }
  }

  const resendOTP = async () => {
    await signUp?.prepareEmailAddressVerification()
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[tw`flex-1 bg-white justify-between h-full pb-3`, { padding: 16 }]}
    >
      <Text style={{ fontSize: Typography.heading, fontFamily: Fonts.Inter_700Bold, color: Colors.design.highContrastText, marginBottom: 10 }}>
        Enter your verification code
      </Text>
      <View style={tw`gap-4 w-full flex-1`}>
        <Text style={{ fontFamily: Fonts.Inter_400Regular, color: Colors.design.highContrastText }}>
          Enter the verification code we sent to {emailAddress}

        </Text>
        <View style={[tw`flex flex-row h-[40px] gap-2`, { marginBottom: 20 }]}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el) => (inputs.current[index] = el)}
              style={[
                tw`aspect-square text-center border border-zinc-400/50 rounded-[8px]`,
                error && code[index] === ""
                  ? tw`border-red-500`
                  : { borderColor: Colors.design.separator },
                {
                  fontWeight: "400",
                  outlineWidth: 2,
                  outlineColor: "#121212",
                  outlineStyle: "solid",
                }
              ]}
              placeholder="-"
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(event) => handleKeyPress(event, index)}
              value={digit}
            />
          ))}
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontFamily: Fonts.Inter_400Regular, color: Colors.design.highContrastText }}>
            Haven't received a code?{" "}
          </Text>
          <TouchableOpacity onPress={resendOTP}>
            <Text style={{ fontFamily: Fonts.Inter_700Bold, color: Colors.design.highContrastText, textDecorationLine: "underline" }}>
              Send again
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={tw`justify-end px-3 flex-row`}>

        <TouchableOpacity disabled={loading} onPress={onPressVerify} style={{ ...styles.primaryButton, opacity: loading ? 0.3 : 1 }}>
          <Text style={{ color: Colors.design.white, fontSize: Typography.buttonText, fontFamily: Fonts.Inter_600SemiBold }}>
            Verify and continue
          </Text>
        </TouchableOpacity>
      </View>
      <RegisterSuccessModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </KeyboardAvoidingView>
  );
};

export default Verification;

const styles = StyleSheet.create({
  primaryButton: {
    height: 54,
    borderRadius: 8,
    backgroundColor: Colors.design.accent,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%"

  },
  secondaryButton: {
    ...tw`bg-transparent`,
  },
  disabledButton: {

  },
});
