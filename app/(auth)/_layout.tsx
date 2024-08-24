import React from "react";
import { Redirect, Stack } from "expo-router";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import OnboardingNavbar from "@/components/navigation/headers/OnboardingNavbar";
import Colors from "@/constants/Colors";
import { useAuth } from "@clerk/clerk-expo";
import { View } from "react-native";
import Text from "@/components/ui/Text";

export default function TabLayout() {
  const { isSignedIn, isLoaded } = useAuth()

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    )
  }

  if (isSignedIn) {
    return <Redirect href={'/(tabs)'} />
  }

  return (
    <Stack
      screenOptions={({ navigation, route }) => ({
        header: (props) => <OnboardingNavbar {...props} />,
        tabBarActiveTintColor: Colors.light.tint,
        headerShown: useClientOnlyValue(false, true),
      })}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Register",
          headerShown: false
        }}
      />
      <Stack.Screen
        name="verification"
        options={{
          title: "Confirm your email address",

        }}
      />
      <Stack.Screen
        name="forgot-password"
        options={{
          title: "Forgot Password",
        }}
      />
      <Stack.Screen
        name="reset-password"
        options={{
          title: "Reset Password",
        }}
      />
      <Stack.Screen
        name="profile"
        options={{ title: "" }}
      />

    </Stack>
  );
}
