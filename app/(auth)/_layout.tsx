import React from "react";
import { Redirect, Stack } from "expo-router";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import CustomHeader from "@/components/navigation/headers/AuthHeader";
import Colors from "@/constants/Colors";
import { useAuth } from "@clerk/clerk-expo";

export default function TabLayout() {


  return (
    <Stack
      screenOptions={({ navigation, route }) => ({
        header: (props) => <CustomHeader {...props} />,
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
