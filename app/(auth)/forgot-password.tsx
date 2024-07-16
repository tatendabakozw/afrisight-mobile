import { View, Text } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import CustomInput from "@/components/inputs/CustomInput";
import { useNavigation } from "expo-router";
import EmailSuccessModal from "@/components/modals/EmailSuccessModal";

const ForgotPassword = () => {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const onLongPress = () => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 1500);
  };

  const resetpasswordHandler = async () => {
    try {
      setLoading(true);
      // @ts-ignore
      navigation.navigate("reset-password");
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
        onLongPress={onLongPress}
        text="Reset Password"
        onPress={resetpasswordHandler}
        loading={loading}
      />
      <EmailSuccessModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

export default ForgotPassword;
