import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useSignIn, useSignUp, useOAuth } from "@clerk/clerk-expo";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";
import Text from "@/components/ui/Text";
import TextInput from "@/components/ui/TextInput";
import { Fonts, Typography } from "@/constants/typography";
import Colors from "@/constants/Colors";
import AnimatedLoader from "@/components/ui/AnimatedLoader";

const countryCodes = [
  { code: "+263", country: "Zimbabwe" },
  { code: "+27", country: "South Africa" },
  { code: "+260", country: "Zambia" },
  // Add more country codes as needed
];

export default function AuthScreen() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [isEmailLogin, setIsEmailLogin] = useState(true);
  const [countryCode, setCountryCode] = useState("+263");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const { signIn, setActive: setSignInActive } = useSignIn();
  const { signUp, setActive: setSignUpActive } = useSignUp();
  const { startOAuthFlow: startGoogleOAuth } = useOAuth({
    strategy: "oauth_google",
  });
  const { startOAuthFlow: startFacebookOAuth } = useOAuth({
    strategy: "oauth_facebook",
  });
  const router = useRouter();

  const handleEmailOrPhoneAuth = async () => {
    setError('');
    setIsLoading(true);

    try {
      if (isEmailLogin) {
        // Email authentication flow
        const emailExists = await doesAUserWithThisEmailExist(email);
        if (emailExists) {
          if (!signIn) throw new Error("signIn not ready")

          if (!showPassword) {
            setShowPassword(true);
            setIsLoading(false);
            return;
          }
          // Attempt to sign in with email and password
          const result = await signIn.create({
            identifier: email,
            password: password,
          });
          setSignInActive({ session: result.createdSessionId });
          router.push('/(tabs)');
        } else {
          // Email not found, redirect to profile page for sign up
          router.push({
            pathname: '/(auth)/profile',
            params: { emailAddress: email }
          });
        }
      } else {
        if (!signUp) throw Error("signUp not ready")
        // Phone authentication flow
        const phoneIdentifier = `${countryCode}${phoneNumber}`;
        // Initiate phone verification
        await signUp.create({
          phoneNumber: phoneIdentifier,
        });
        await signUp.preparePhoneNumberVerification({ strategy: "phone_code" });
        router.push({
          pathname: '/(auth)/verification',
          params: { phoneNumber: phoneIdentifier }
        });
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  console.log(error)

  const doesAUserWithThisEmailExist = async (
    email: string
  ): Promise<boolean> => {
    if (!signIn) return false;

    try {
      await signIn.create({
        identifier: email,
      });
      return true;
    } catch (err: any) {
      if (err.errors[0].code === "form_identifier_not_found") {
        return false;
      }
      return false;
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const { createdSessionId, setActive } = await startGoogleOAuth();
      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });
        router.push("/(tabs)/");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleFacebookAuth = async () => {
    try {
      const { createdSessionId, setActive } = await startFacebookOAuth();
      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });
        router.push("/(tabs)/");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignUp
        ? 'Sign up to start earning through surveys and gigs'
        : 'Log in to continue'}</Text>

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
          <Text style={styles.supportingText}>We will send an OTP to your phone number to verify.</Text>
        </View>
      ) : (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Email address"
            withEmbeddedLabel
            value={email}
            onChangeText={setEmail}
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

      <TouchableOpacity disabled={isLoading} style={styles.button} onPress={handleEmailOrPhoneAuth}>
        {!isLoading && <Text style={styles.buttonText}>Continue</Text>}
        {isLoading && <AnimatedLoader color={Colors.design.white} />}
      </TouchableOpacity>

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
      <TouchableOpacity style={styles.socialButton} onPress={handleGoogleAuth}>
        <Ionicons name="logo-google" size={24} color="black" />
        <Text style={styles.socialButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.socialButton}
        onPress={handleFacebookAuth}
      >
        <Ionicons name="logo-facebook" size={24} color="#4267B2" />
        <Text style={styles.socialButtonText}>Continue with Facebook</Text>
      </TouchableOpacity>

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
    textAlign: "center"
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  phoneInputContainer: {
    marginBottom: 10,
    borderRadius: 8,
    overflow: "hidden"
  },
  countryCodePicker: {
    borderWidth: 1,
    borderColor: Colors.design.separator,
    borderRadius: 12,
    backgroundColor: Colors.design.interactiveSurface
  },
  phoneInput: {
    padding: 15,
    fontSize: 16,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
  },
  supportingText: {
    marginBottom: 20,
    fontSize: 13,
    color: Colors.design.highContrastText,
    fontFamily: Fonts.Inter_500Medium
  },
  input: {
    padding: 15,
    fontSize: 16,
    marginBottom: 20
  },
  button: {
    backgroundColor: Colors.design.accent,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 48
  },
  buttonText: {
    color: Colors.design.white,
    fontSize: Typography.buttonText,
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
    fontSize: Typography.buttonText,
    fontFamily: Fonts.Inter_600SemiBold,
    color: Colors.design.highContrastText,
  },
  toggleText: {
    marginTop: 20,
    textAlign: "center",
    color: Colors.design.accent,
    fontSize: Typography.buttonText,
    fontFamily: Fonts.Inter_600SemiBold,
  },
});
