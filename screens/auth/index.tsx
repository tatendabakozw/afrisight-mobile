import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Feather, Ionicons } from "@expo/vector-icons";
import Text from "@/components/ui/Text";
import TextInput from "@/components/ui/TextInput";
import { Fonts, Typography } from "@/constants/typography";
import Colors from "@/constants/Colors";
import AnimatedLoader from "@/components/ui/AnimatedLoader";
import {
  GoogleSigninButton,
  statusCodes,
  isErrorWithCode,
  GoogleSignin,
} from "@react-native-google-signin/google-signin";
import { axiosInstance } from "../../utils/axios";
import { saveItemToSecureStore } from "@/helpers/secureStore";
import { AUTH_ROUTES } from "@/constants/routers";
import { useAuth } from "@/services/auth/hooks";
import Button from "@/design-system/Button";
import ErrorMessage from "@/design-system/ErrorMessage";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ModalStackParamList } from "@/design-system/Modal/ModalStack";
import { NavigationStackProps } from "..";

const countryCodes = [
  { code: "+263", country: "Zimbabwe" },
  { code: "+27", country: "South Africa" },
  { code: "+260", country: "Zambia" },
  // Add more country codes as needed
];

export default function LoginScreen({ navigation }: {
  navigation: NavigationStackProps<"LoginScreen">;
}) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [isEmailLogin, setIsEmailLogin] = useState(true);
  const [countryCode, setCountryCode] = useState("+263");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    signIn,
    isAuthenticated,
    isLoading: isAuthStatusLoading,
    signInWithEmailAndPassword,
  } = useAuth();

  const handleEmailOrPhoneAuth = async () => {
    setError("");
    setIsLoading(true);

    try {
      if (isEmailLogin) {
        await signInWithEmailAndPassword(emailAddress, password);
        navigation.navigate("RegisterScreen", { emailAddress });
      } else {
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const startAuthFlow = async () => {
    setIsLoading(true);
    try {
      if (!emailAddress) {
        throw new Error("Email address is required");
      }
      const result = await axiosInstance.post(AUTH_ROUTES.DOES_USER_EXIST, {
        email: emailAddress,
      });

      const { data } = result;
      if (data.result === "user_account_exists") {
        setShowPassword(true);
      }

      navigation.navigate("RegisterScreen", { emailAddress });


    } catch (err: any) {
      console.log(err);
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      GoogleSignin.configure({
        webClientId:
          "65642823607-o45dd5mj4follgqmp700vgv1r17c9l6b.apps.googleusercontent.com",
      });

      await GoogleSignin.signOut()

      const userInfo = await GoogleSignin.signIn({
        loginHint: "Please select your account",
      });

      const idToken = userInfo.data?.idToken;
      const tokens = await axiosInstance.get(
        `${AUTH_ROUTES.GOOGLE_SIGNIN}?id_token=${idToken}`,
      );

      signIn({
        accessToken: tokens.data.accessToken,
        refreshToken: tokens.data.refreshToken,
      });

      navigation.navigate("Main", { emailAddress, screen: "ExploreScreen" });
    } catch (error) {
      console.error("Error:", error);

      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            // sign in was cancelled
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android-only: play services not available or outdated
            // Web: when calling an unimplemented api (requestAuthorization)
            break;
          default:
          // something else happened
        }
      } else {
        // an error that's not related to google sign in occurred
        console.error("Error:", error);
      }
    }
  };

  const handleFacebookAuth = async () => {
    try {

    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigation.replace("ExploreScreen");
    }
  }, [isAuthenticated, isLoading]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isSignUp
          ? "Sign up to start earning through surveys and gigs"
          : "Log in to continue"}
      </Text>

      {!isEmailLogin ? (
        <View>
          <View style={styles.phoneInputContainer}>
            <Picker
              selectedValue={countryCode}
              onValueChange={(itemValue) => setCountryCode(itemValue)}
              style={styles.countryCodePicker}
            >
              {countryCodes.map((country) => (
                <Picker.Item
                  key={country.code}
                  label={`${country.country} (${country.code})`}
                  value={country.code}
                />
              ))}
            </Picker>
            <TextInput
              style={styles.phoneInput}
              placeholder="Phone number"
              withEmbeddedLabel
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>
          <Text style={styles.supportingText}>
            We will send an OTP to your phone number to verify.
          </Text>
        </View>
      ) : (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Email address"
            withEmbeddedLabel
            value={emailAddress}
            onChangeText={setEmailAddress}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {showPassword && (
            <TextInput
              style={styles.input}
              placeholder="Password"
              withEmbeddedLabel
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          )}
        </View>
      )}
      {error && <View style={{ marginBottom: 20 }}>
        <ErrorMessage message={error} />
      </View>}
      <Button text="Continue" variant="accent" size="large" onPress={showPassword ? handleEmailOrPhoneAuth : startAuthFlow} isLoading={isLoading} disabled={isLoading} />

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.dividerLine} />
      </View>
      {/*
      {isEmailLogin ? (
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => setIsEmailLogin(false)}
        >
          <Feather name="phone" size={24} color="black" />
          <Text style={styles.socialButtonText}>Continue with Phone</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => setIsEmailLogin(true)}
        >
          <Feather name="mail" size={24} color="black" />
          <Text style={styles.socialButtonText}>Continue with Email</Text>
        </TouchableOpacity>
      )} */}

      <Button leftIcon={<Ionicons name="logo-google" size={24} color="black" />} text="Continue with Google" variant="primary" size="large" onPress={handleGoogleAuth} isLoading={isLoading} disabled={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",

  },
  title: {
    fontSize: Typography.heading,
    marginBottom: 20,
    fontFamily: Fonts.Inter_700Bold,
    color: Colors.design.highContrastText,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#666",
  },
  phoneInputContainer: {
    marginBottom: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  countryCodePicker: {
    borderWidth: 1,
    borderColor: Colors.design.separator,
    borderRadius: 12,
    backgroundColor: Colors.design.interactiveSurface,
  },
  phoneInput: {
    padding: 15,
    fontSize: 16,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  supportingText: {
    marginBottom: 20,
    fontSize: 13,
    color: Colors.design.highContrastText,
    fontFamily: Fonts.Inter_500Medium,
  },
  input: {
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.design.accent,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
  },
  buttonText: {
    color: Colors.design.white,
    fontSize: Typography.paragraph,
    fontFamily: Fonts.Inter_600SemiBold,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.design.separator,
  },
  dividerText: {
    marginHorizontal: 10,
    fontFamily: Fonts.Inter_600SemiBold,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.design.highContrastText,
    borderRadius: 8,
    marginBottom: 10,
  },
  socialButtonText: {
    marginLeft: 10,
    fontSize: Typography.paragraph,
    fontFamily: Fonts.Inter_600SemiBold,
    color: Colors.design.highContrastText,
  },
  toggleText: {
    marginTop: 20,
    textAlign: "center",
    color: Colors.design.accent,
    fontSize: Typography.paragraph,
    fontFamily: Fonts.Inter_600SemiBold,
  },
});
