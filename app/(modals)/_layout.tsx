import FontAwesome from "@expo/vector-icons/FontAwesome";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="filter-modal" options={{ presentation: "modal" }} />
      <Stack.Screen
        name="wallet-add-card"
        options={{ presentation: "modal", headerShown: false }}
      />
      <Stack.Screen
        name="wallet-withdraw"
        options={{ presentation: "modal", headerShown: false }}
      />
      <Stack.Screen
        name="gig-description"
        options={{ presentation: "modal", headerShown: false }}
      />
      <Stack.Screen
        name="gig-survey"
        options={{ presentation: "modal", headerShown: false }}
      />
      <Stack.Screen
        name="notification"
        options={{ presentation: "modal", headerShown: false }}
      />
      <Stack.Screen
        name="chat-modal"
        options={{ presentation: "modal", headerShown: false }}
      />
      <Stack.Screen
        name="settings-profile-modal"
        options={{ presentation: "modal", headerShown: false }}
      />
    </Stack>
  );
}
