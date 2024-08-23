import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import LogoAlt from "@/assets/svgs/LogoAlt";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import CustomInput from "@/components/inputs/CustomInput";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import GoogleAuthButton from "@/components/buttons/GoogleAuthButton";
import FacebookAuthButton from "@/components/buttons/FacebookAuthButton";
import { Link, router, useNavigation, useRouter } from "expo-router";
import { registerApiCall } from "../utils/helpers";
import { useAuth, useSignIn, useSignUp } from "@clerk/clerk-expo";
import { TextInput, Button, } from 'react-native'
import Banner from "@/components/banner";

const Styles = StyleSheet.create({
  input: {
    borderRadius: 8,
    height: 54,
    borderColor: '#d0d0d0',
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 10,
    width: '100%',
  },
  button: {
    backgroundColor: Colors.light.primary,
    borderRadius: 8,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',

  }
})

const Register = () => {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { isLoaded: isSignInLoaded, signIn } = useSignIn()
  const { signOut } = useAuth()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState("");
  const [emailExists, setEmailExists] = useState(false)

  const doesAUserWithThisEmailExist = async (email: string): Promise<boolean> => {
    await signOut()
    if (!isSignInLoaded) return false

    try {
      await signIn.create({
        identifier: email,
      })
      return true
    } catch (err: any) {
      if (err.errors[0].code === "form_identifier_not_found") {
        return false
      }
      return true
    }
  }

  const onCheckIfUserExists = async () => {
    const result = await doesAUserWithThisEmailExist(emailAddress)
    setEmailExists(result)
    if (!result) {
      router.push({
        pathname: "/(auth)/profile",
        params: {
          emailAddress
        }
      })
    }
  }

  const continueToSignIn = async () => {
    if (!isSignInLoaded) {
      return
    }

    try {
      setErrorMessage("")
      await signIn.create({
        identifier: emailAddress.replaceAll(' ', ''),
        password,
      })

      router.push('/(tabs)')

    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
      setErrorMessage(err.errors[0].message)
    }
  }

  return (
    <ScrollView
      contentContainerStyle={[
        tw`gap-4 w-full px-6 pb-6 flex-col flex-1`,
        {
          paddingTop: insets.top + 64
        }
      ]}
      style={tw`flex-1 bg-white`}
    >
      <>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 24 }}>Login or sign up to CX Mapper</Text>

        <View>
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            onChangeText={(email) => setEmailAddress(email.replace(/\s/g, ''))}
            placeholder="Email address"
            style={{ ...Styles.input, ...(emailExists && { borderBottomWidth: 0.5, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }) }}
          />
          {emailExists && <TextInput
            autoCapitalize="none"
            value={password}
            secureTextEntry
            onChangeText={(password) => setPassword(password)}
            placeholder="Password"
            style={{ ...Styles.input, ...(emailExists && { borderTopWidth: 0.5, borderTopLeftRadius: 0, borderTopRightRadius: 0 }) }}
          />}

        </View>

        <View style={{ marginBottom: 8 }}>
          {!emailExists && <TouchableOpacity
            onPress={onCheckIfUserExists}
            style={{ height: 54, width: "100%", borderRadius: 8, backgroundColor: Colors.light.primary, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontWeight: "700", fontSize: 16, color: "#fff" }}>
              Continue
            </Text></TouchableOpacity>}

          {emailExists && <TouchableOpacity
            onPress={continueToSignIn}
            style={{ height: 54, width: "100%", borderRadius: 8, backgroundColor: Colors.light.primary, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontWeight: "700", fontSize: 16, color: "#fff" }}>
              Continue
            </Text></TouchableOpacity>}

        </View>
        <View style={tw`flex flex-row items-center gap-2 mb-[8px]`}>
          <View style={tw`flex-1 border-t border-zinc-300/50`} />
          <Text style={tw`text-xs text-zinc-500/50`}>or</Text>
          <View style={tw`flex-1 border-t border-zinc-300/50`} />
        </View>
        <GoogleAuthButton />
        <FacebookAuthButton />
        <Banner message="Something went wrong with your request" />

      </>

    </ScrollView>
  );
};

export default Register;

