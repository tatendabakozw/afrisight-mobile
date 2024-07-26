import { StyleSheet, View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import LogoAlt from "@/assets/svgs/LogoAlt";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import CustomInput from "@/components/inputs/CustomInput";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import GoogleAuthButton from "@/components/buttons/GoogleAuthButton";
import FacebookAuthButton from "@/components/buttons/FacebookAuthButton";
import { Link, router, useNavigation } from "expo-router";
import { registerApiCall } from "../utils/helpers";

const Register = () => {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [show_password, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const [missingEmail, setMissingEmail] = useState(false);
  const [missingPassword, setMissingPassword] = useState(false);
  const [missingUsername, setMissingUsername] = useState(false);

  const renderPasswordIcon = (showPassword: boolean) => {
    return showPassword ? (
      <Ionicons name="eye" size={24} color="#a1a1aa" />
    ) : (
      <Ionicons name="eye-off" size={24} color="#a1a1aa" />
    );
  };

  const toggleShowPassword = () => {
    setShowPassword(!show_password);
  };

  const RegisterWithEmail = async () => {
    try {
      setLoading(true);
      const isEmailMissing = !email;
      const isPasswordMissing = !password;
      const isUsernameMissing = !username;

      setMissingEmail(isEmailMissing);
      setMissingPassword(isPasswordMissing);
      setMissingUsername(isUsernameMissing);

      if (isEmailMissing || isPasswordMissing || isUsernameMissing) {
        setLoading(false);
        setError(true);
        setSuccess(false);
        return;
      }

      // Simulate a delay of 1.5 seconds for the login process
      setTimeout(async () => {
        try {
          // Perform the API call here
          const response = await registerApiCall(username, email, password); // Assuming loginApiCall is a function that handles your API call

          if (response.success) {
            setLoading(false);
            setSuccess(true);

            // After showing success for 1 second, navigate to the new route
            setTimeout(() => {
              router.push("verification");
            }, 1000);
          } else {
            // Handle login failure
            setLoading(false);
            setError(true);
          }
        } catch (apiError) {
          // Handle API call error
          setLoading(false);
          setError(true);
          setSuccess(false);
        }
      }, 1500);
      // router.push("/verification");
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[
        tw`gap-6 w-full px-6 pb-6 items-center justify-center`,
        {
          paddingTop: insets.top,
        },
      ]}
      style={tw`flex-1 bg-white`}
    >
      <View style={tw`h-20`}>
        <LogoAlt />
      </View>

      <CustomInput
        value={username}
        setValue={setUsername}
        missing={missingUsername}
        placeholder="username"
        label="Username"
      />
      <CustomInput
        value={email}
        setValue={setEmail}
        missing={missingEmail}
        placeholder="email@example.com"
        label="Email"
      />
      <CustomInput
        icon={renderPasswordIcon(show_password)}
        value={password}
        setValue={setPassword}
        missing={missingPassword}
        onIconPress={toggleShowPassword}
        isPassword={!show_password}
        placeholder="******"
        label="Password"
      />
      <PrimaryButton
        text="Sign Up"
        onPress={RegisterWithEmail}
        loading={loading}
        error={error}
        success={success}
      />
      <View style={tw`flex flex-row items-center gap-2`}>
        <View style={tw`flex-1 border-t border-zinc-300/50`} />
        <Text style={tw`text-xs text-zinc-500/50`}>Or Sign in with</Text>
        <View style={tw`flex-1 border-t border-zinc-300/50`} />
      </View>
      <GoogleAuthButton />
      <FacebookAuthButton />
      <Text style={tw`text-zinc-700`}>
        Already Registered?{" "}
        <Link
          href={"/register"}
          style={tw`font-semibold text-[${Colors.light.primary}]`}
        >
          Sign In
        </Link>
      </Text>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({});
