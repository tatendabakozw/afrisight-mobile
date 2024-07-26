import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from "react-native";
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

const Register = () => {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [show_password, setShowPassword] = useState(false);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const renderPasswordIcon = (showPassword) => {
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
      router.push("/verification");
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
        value={first_name}
        setValue={setFirstName}
        placeholder="john"
        label="First Name"
      />
      <CustomInput
        value={last_name}
        setValue={setLastName}
        placeholder="doe"
        label="Last Name"
      />
      <CustomInput
        value={email}
        setValue={setEmail}
        placeholder="email@example.com"
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
      <PrimaryButton
        text="Sign Up"
        onPress={RegisterWithEmail}
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
