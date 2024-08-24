import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "twrnc";
import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import Heading from "@/components/heading/Heading";
import SettingsItem from "@/components/settings-components/SettingsItem";
import { router } from "expo-router";
import Text from "@/components/ui/Text";
import { Fonts, Typography } from "@/constants/typography";
import { useAuth, useUser } from "@clerk/clerk-expo";
import useAxiosInstance from "../utils/axios";

const Settings = () => {
  const [profile, setProfile] = useState<{
    firstName: string;
    lastName: string;
  } | null>(null);
  const { user } = useUser();
  const insets = useSafeAreaInsets();
  const { signOut } = useAuth();
  const instance = useAxiosInstance();

  const onSignOut = async () => {
    await signOut();
  };

  useEffect(() => {
    if (user) {
      instance.get(`/profile/${user?.id}`).then((res) => setProfile(res.data));
    }
  }, [user]);

  return (
    <ScrollView
      style={{
        flex: 1,
      }}
      contentContainerStyle={[
        tw`flex flex-col bg-zinc-50`,
        { paddingTop: insets.top + 54, padding: 16, gap: 24 },
      ]}
    >
      <View>
        <Text
          style={{
            fontFamily: Fonts.Inter_500Medium,
            fontSize: Typography.largeHeading,
            color: Colors.design.highContrastText,
          }}
        >
          Profile
        </Text>
      </View>
      <View
        style={[
          tw`flex flex-row items-center py-4 gap-4 border-b`,
          {
            borderColor: Colors.design.separator,
            marginBottom: 24,
          },
        ]}
      >
        <View
          style={tw`flex flex-row items-center justify-center h-[64px] w-[64px] rounded-full bg-[${Colors.light.primary}]`}
        >
          <Text style={tw`text-4xl font-extrabold text-white`}>K</Text>
        </View>
        <View style={tw`flex flex-col flex-1`}>
          {profile && (
            <Text
              style={{
                fontSize: Typography.subheading,
                color: Colors.design.highContrastText,
              }}
            >
              {profile.firstName} {profile.lastName}
            </Text>
          )}
          {user && (
            <Text style={tw`text-[${Colors.light.primary}]`}>
              {user.emailAddresses[0].emailAddress}
            </Text>
          )}
        </View>
        <TouchableOpacity
          onPress={() => router.push("/(modals)/settings-profile-modal")}
        >
          <Feather name="chevron-right" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ gap: 48 }}>
        <View style={{ gap: 24 }}>
          <Heading text="Settings" />
          <View>
            <SettingsItem
              icon_name={"credit-card"}
              heading="Wallet Settings"
              description="Manage Your wallet"
              location=""
            />
            <SettingsItem
              icon_name={"bell"}
              heading="Notifications"
              description="Manage your notifications"
              location=""
            />
            <SettingsItem
              icon_name={"language"}
              icon_from="ionicons"
              heading="Language Settings"
              description="Change Language here"
              location=""
            />
          </View>
        </View>

        <View style={{ gap: 24 }}>
          <Heading text="Privacy and security" />
          <View>
            <SettingsItem
              icon_name={"lock"}
              heading="Password Settings"
              description="Manage your password"
              location=""
            />
            <SettingsItem
              icon_name={"clipboard"}
              heading="Privacy Policy"
              description="You can review our policy"
              location=""
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={onSignOut}
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: 54,
          backgroundColor: Colors.design.dangerSurface,
          borderRadius: 8,
          marginTop: 48,
        }}
      >
        <Text
          style={{
            fontSize: Typography.buttonText,
            color: Colors.design.white,
            fontFamily: Fonts.Inter_600SemiBold,
          }}
        >
          Sign out
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({});
