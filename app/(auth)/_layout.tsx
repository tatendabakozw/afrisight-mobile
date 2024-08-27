import { Stack } from "expo-router";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import OnboardingNavbar from "@/components/navigation/headers/OnboardingNavbar";
import Colors from "@/constants/Colors";

export default function TabLayout() {
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
          title: "Enter your phone number",
          headerShown: false
        }}
      />
      <Stack.Screen
        name="password"
        options={{ title: "Sign in to your account", }}
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
        name="register"
        options={{ title: "" }}
      />

    </Stack>
  );
}
