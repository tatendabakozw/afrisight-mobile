import React from "react";
import { Stack } from "expo-router";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import CustomHeader from "@/components/navigation/headers/AuthHeader";
import Colors from "@/constants/Colors";

export default function TabLayout() {
  return (
    <Stack
      screenOptions={({ navigation, route }) => ({
        header: (props) => <CustomHeader {...props} />,
        tabBarActiveTintColor: Colors.light.tint,
        headerShown: useClientOnlyValue(false, true),
      })}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="register"
        options={{
          title: "Register",
        }}
      />
      <Stack.Screen
        name="verification"
        options={{
          title: "Verify Indentity",
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
    </Stack>
  );
}
