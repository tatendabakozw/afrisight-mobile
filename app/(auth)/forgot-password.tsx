import { View, Text } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import CustomInput from "@/components/inputs/CustomInput";

const ForgotPassword = () => {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const resetpasswordHandler = async () => {
    try {
      setLoading(true);
      // reset password login
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <View
      style={[
        tw`gap-6 w-full px-6 py-8 h-full bg-white items-center py-16 gap-6`,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      <Text style={tw`text-2xl font-bold text-zinc-700`}>Forgot Password</Text>
      <Text style={tw`text-zinc-500`}>Enter your email to reset password</Text>
      <CustomInput
        value={email}
        setValue={setEmail}
        placeholder="example@email.com"
        label="Email"
      />
      <PrimaryButton
        text="Reset Password"
        onPress={resetpasswordHandler}
        loading={loading}
      />
    </View>
  );
};

export default ForgotPassword;
