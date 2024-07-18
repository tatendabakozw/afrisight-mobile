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
import { Link } from "expo-router";

const Login = () => {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [show_password, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isSelected, setSelection] = useState(false);

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
      // TODO - auth logic
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <View
      style={[
        tw`gap-6 w-full px-6 py-8 h-full bg-white items-center justify-center gap-6`,
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
      />
      <CustomInput
        icon={renderPasswordIcon(show_password)}
        value={password}
        setValue={setPassword}
        onIconPress={toggleShowPassword}
        isPassword={!show_password}
        placeholder="******"
        label="Password"
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
        text="Sign In"
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
