import { StyleSheet, View, Text } from "react-native";
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
import CheckBox from "@/components/inputs/CheckBox";
import { Link, router } from "expo-router";
import { loginApiCall } from "../utils/helpers";

const Login = () => {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [show_password, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isSelected, setSelection] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [missingEmail, setMissingEmail] = useState(false);
  const [missingPassword, setMissingPassword] = useState(false);

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

  const loginWithEmail = async () => {
    try {
      setLoading(true);
      setError(false);
      setSuccess(false); // Ensure success is reset to false initially

      const isEmailMissing = !email;
      const isPasswordMissing = !password;

      setMissingEmail(isEmailMissing);
      setMissingPassword(isPasswordMissing);

      if (isEmailMissing || isPasswordMissing) {
        setLoading(false);
        setError(true);
        setSuccess(false);
        return;
      }

      // Simulate a delay of 1.5 seconds for the login process
      setTimeout(async () => {
        try {
          // Perform the API call here
          const response = await loginApiCall(email, password); // Assuming loginApiCall is a function that handles your API call

          if (response.success) {
            setLoading(false);
            setSuccess(true);

            // After showing success for 1 second, navigate to the new route
            setTimeout(() => {
              router.push("(tabs)");
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
    } catch (error) {
      setError(true);
      setSuccess(false);
      setLoading(false);
    }
  };

  return (
    <View
      style={[
        tw`gap-6 w-full px-6 py-8 h-full bg-white items-center justify-center`,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      <View style={tw`h-20`}>
        <LogoAlt />
      </View>
      <CustomInput
        value={email}
        setValue={setEmail}
        placeholder="example@gmail.com"
        label="Email"
        missing={missingEmail}
      />
      <CustomInput
        icon={renderPasswordIcon(show_password)}
        value={password}
        setValue={setPassword}
        onIconPress={toggleShowPassword}
        isPassword={!show_password}
        placeholder="******"
        label="Password"
        missing={missingPassword}
      />
      <View style={tw`flex flex-row items-center justify-between w-full`}>
        <View style={tw`flex flex-row gap-2 items-center`}>
          <CheckBox isChecked={isSelected} setIsChecked={setSelection} />
          <Text style={tw`text-zinc-500 text-xs`}>Keep me signed in</Text>
        </View>

        <Link href={"/forgot-password"}>
          <Text
            style={tw`text-[${Colors.light.primary}] font-semibold text-xs`}
          >
            Forgot password
          </Text>
        </Link>
      </View>
      <PrimaryButton
        success={success}
        text="Sign In"
        error={error}
        onPress={loginWithEmail}
        loading={loading}
      />
      <View style={tw`flex flex-row items-center gap-2`}>
        <View style={tw`flex-1 border-t border-zinc-300/50`} />
        <Text style={tw`text-xs text-zinc-500/50`}>Or Sign in with</Text>
        <View style={tw`flex-1 border-t border-zinc-300/50`} />
      </View>
      <GoogleAuthButton />
      <FacebookAuthButton />

      <Text style={tw`text-zinc-700`}>
        Don't have an account?{" "}
        <Link
          href={"register"}
          style={tw`font-semibold text-[${Colors.light.primary}]`}
        >
          Sign Up
        </Link>
      </Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
