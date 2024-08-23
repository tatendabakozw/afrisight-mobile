import {
  StyleSheet,
  Text,
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
        router.replace('/')
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
      style={[tw`flex-1 bg-white justify-between h-full pb-3`, { paddingTop: 16 }]}
    >
      <View style={tw`gap-4 w-full px-3 flex-1`}>
        {/* <PulsingView /> */}
        <Text>
          Enter the 6-digit code that was sent to your email, <Text style={{ fontWeight: "600" }}>
            {emailAddress}
          </Text>
        </Text>
        <View style={tw`flex flex-row`}>
          <View style={tw`flex flex-row border border-zinc-400/50 rounded-[8px] h-[40px]`}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(el) => (inputs.current[index] = el)}
                style={[
                  tw`aspect-square text-center`,
                  error && code[index] === ""
                    ? tw`border-red-500`
                    : { borderColor: Colors.light.primary },
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
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={tw`text-zinc-950`}>
            Haven't received a code?
          </Text>
          <TouchableOpacity onPress={resendOTP}>
            <Text style={{
              textDecorationLine: "underline",
              marginLeft: 4,
              fontWeight: "600"
            }}>
              Send again
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={tw`justify-end px-3 flex-row`}>

        <TouchableOpacity disabled={loading} onPress={onPressVerify} style={{ ...styles.primaryButton, opacity: loading ? 0.3 : 1 }}>
          <Text style={{ fontWeight: "700", color: "#fff", }}>
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
    backgroundColor: Colors.light.primary,
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
