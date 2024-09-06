import { View, Text } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useNavigation } from "expo-router";
import tw from "twrnc";
import CustomInput from "@/components/inputs/CustomInput";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SuccessModal from "@/components/modals/EmailSuccessModal";
import { Ionicons } from "@expo/vector-icons";
import ResetPasswordSuccess from "@/components/modals/ResetPasswordSuccess";

const ResetPassword = () => {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [confirm_password, setConfirmPassword] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const renderPasswordIcon = (showPassword: boolean) => {
    return showPassword ? (
      <Ionicons name="eye" size={24} color="#a1a1aa" />
    ) : (
      <Ionicons name="eye-off" size={24} color="#a1a1aa" />
    );
  };

  const toggleShowPassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleShowConfirmPassword = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const renderConfirmPasswordIcon = (showPassword: boolean) => {
    return showPassword ? (
      <Ionicons name="eye" size={24} color="#a1a1aa" />
    ) : (
      <Ionicons name="eye-off" size={24} color="#a1a1aa" />
    );
  };

  const onLongPress = () => {
    setModalVisible(true);
  };

  const resetpasswordHandler = async () => {
    try {
      setLoading(true);
      router.push("/reset-password");
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
      <Text style={tw`text-2xl font-bold text-zinc-700`}>Reset Password</Text>
      <Text style={tw`text-zinc-500`}>Enter our new password</Text>
      <CustomInput
        value={password}
        setValue={setPassword}
        isPassword={passwordVisible}
        onIconPress={toggleShowPassword}
        icon={renderPasswordIcon(passwordVisible)}
        placeholder="******"
        label="Password"
      />
      <CustomInput
        value={confirm_password}
        setValue={setConfirmPassword}
        isPassword={confirmPasswordVisible}
        onIconPress={toggleShowConfirmPassword}
        icon={renderConfirmPasswordIcon(passwordVisible)}
        placeholder="******"
        label="Confirm Password"
      />
      <PrimaryButton
        onLongPress={onLongPress}
        text="Reset Password"
        onPress={resetpasswordHandler}
        loading={loading}
      />
      <ResetPasswordSuccess
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

export default ResetPassword;
