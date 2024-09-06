import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "@/services/auth";
import Colors from "@/constants/Colors";


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
    SpaceMono: require("../assets/fonts/OpenSans-VariableFont_wdth,wght.ttf"),
    ...FontAwesome.font,
    Inter_300Light,
    SF_Pro_Rounded_Regular: require("../assets/fonts/SF-Pro-Rounded-Regular.otf"),
    SF_Pro_Rounded_Medium: require("../assets/fonts/SF-Pro-Rounded-Medium.otf"),
    SF_Pro_Rounded_Bold: require("../assets/fonts/SF-Pro-Rounded-Heavy.otf"),
    SF_Pro_Rounded_Semibold: require("../assets/fonts/SF-Pro-Rounded-Bold.otf"),

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
    <AuthProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.design.white }}>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(modals)" options={{ headerShown: false }} />
          <Stack.Screen name="filter-modal" options={{ presentation: "modal" }} />
        </Stack>
      </SafeAreaView>
    </AuthProvider>

  );
}
