import { ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "twrnc";
import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import Heading from "@/components/heading/Heading";
import SettingsItem from "@/components/settings-components/SettingsItem";
import Text from "@/components/ui/Text";
import { Fonts, Typography } from "@/constants/typography";
import { useAuth } from "@/services/auth/hooks";
import { saveItemToSecureStore } from "@/helpers/secureStore";
import { Image } from "react-native";
import Button from "@/design-system/Button";
import Row from "@/design-system/Row";
import { SF_ICONS } from "@/constants/icons";
import Separator from "@/design-system/Separator";
import { EndOfListCaption } from "@/components/captions";

const LeaderboardScreen = () => {

  const insets = useSafeAreaInsets();
  const { user, signOut } = useAuth()

  const onSignOut = async () => {
    await signOut()
  };

  return (
    <ScrollView
      style={{
        flex: 1,
      }}
      contentContainerStyle={[
        tw`flex flex-col bg-zinc-50`,
      ]}
    >

      <View style={{ gap: 20, marginBottom: 20 }}>
        <Header />
        <Profile />
      </View>
      <Separator />

      <View style={{ marginBottom: 20, marginTop: 20, }}>
        <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingHorizontal: 20, alignItems: "baseline", gap: 6, marginBottom: 10 }}>
          <Text style={{ fontFamily: Fonts.Inter_700Bold, color: Colors.design.highContrastText, fontSize: Typography.subheading }}>
            {SF_ICONS.trophy_filled}{" "}
            Leaderboard
          </Text>

        </View>
        <View style={{ marginBottom: 20 }}>
          {
            new Array(10).fill("").map((item, idx) => (
              <>
                <LeaderboardPosition key={idx} idx={idx + 1} />
                <Separator key={`separator-${idx}`} />
              </>
            ))
          }
          <EndOfListCaption />
        </View>

      </View>

    </ScrollView>
  );
};

const Header = () => {
  return (
    <Row
      style={[
        tw`gap-4`,
        {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 10
        },
      ]}
    >
      <View style={{ flex: 1, flexDirection: "row", }}>
        <ImageBackground
          style={tw`flex flex-row items-center justify-center h-[40px] w-[40px] rounded-full bg-[${Colors.light.primary}]`}
          source={require("@/assets/images/backgrounds/background-sky-rays.png")}
          imageStyle={{ borderRadius: 32 }}
        >
          <Text style={tw`text-4xl font-extrabold text-white`}></Text>
        </ImageBackground>
      </View>

      <Row style={{ gap: 10 }}>
        <Button text={SF_ICONS.settings_filled} size="icon" />
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 4, paddingRight: 20, paddingVertical: 6, borderRadius: 20, backgroundColor: Colors.design.surfaceOnSurface }}>
          <Image source={require("@/assets/images/imports/dollar-icon.png")} style={{ width: 32, height: 32 }} />
          <Text style={{ fontSize: Typography.paragraph, fontFamily: Fonts.Inter_700Bold, color: Colors.design.highContrastText }}>
            $3.20
          </Text>
        </View>
      </Row>
    </Row>
  )
}

const Profile = () => {
  const { user } = useAuth()

  return (
    <View style={tw`flex`}>
      {user && (
        <View style={{ paddingHorizontal: 20 }}>
          <Text
            style={{
              fontSize: Typography.heading,
              color: Colors.design.highContrastText,
              fontFamily: Fonts.Inter_700Bold,
              lineHeight: Typography.heading * 1.2
            }}>
            Tatenda Chinyamakobvu
          </Text>
          <Text
            style={{
              fontSize: Typography.paragraph,
              color: Colors.design.mutedText,
              fontFamily: Fonts.Inter_600SemiBold
            }}
          >
            {user.email}
          </Text>
        </View>
      )}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 20, marginVertical: 20, paddingHorizontal: 20 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 10, paddingRight: 20, paddingVertical: 6, borderRadius: 10, backgroundColor: Colors.design.surfaceOnSurface }}>
          <Text style={{ fontFamily: Fonts.Inter_700Bold, fontSize: Typography.paragraph, color: Colors.design.highContrastText }}>
            {SF_ICONS.trophy_filled}
          </Text>
          <Text style={{ fontSize: Typography.paragraph, fontFamily: Fonts.Inter_700Bold, color: Colors.design.highContrastText }}>
            #23
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 10, paddingRight: 20, paddingVertical: 6, borderRadius: 10, backgroundColor: Colors.design.surfaceOnSurface }}>
          <Image source={require("@/assets/images/illustrations/xp-icon-yellow.png")} style={{ width: 28, height: 28 }} />
          <Text style={{ fontSize: Typography.paragraph, fontFamily: Fonts.Inter_700Bold, color: Colors.design.highContrastText }}>
            400 XP
          </Text>
        </View>
      </View>
    </View>
  )
}


const LeaderboardPosition = ({ idx }: { idx: number }) => {
  const color = [Colors.design.gold, Colors.design.silver, Colors.design.bronze,]
  return (
    <View style={{ paddingVertical: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20 }}>
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center", flex: 1 }}>
        <ImageBackground source={require("@/assets/images/backgrounds/background-red.png")} style={{ width: 32, height: 32 }} imageStyle={{ borderRadius: 40 }}>
        </ImageBackground>
        <Text style={{ fontFamily: Fonts.Inter_600SemiBold, color: Colors.design.highContrastText, fontSize: Typography.paragraph }}>
          Tatenda Chris
        </Text>
      </View>
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <Text style={{ fontFamily: Fonts.Inter_600SemiBold, fontSize: Typography.paragraph }}>
          $109.20
        </Text>
        <Text style={{ fontFamily: Fonts.Inter_600SemiBold, fontSize: Typography.paragraph, color: idx < 4 ? color[idx - 1] : Colors.design.mutedText }}>
          {idx < 4 ? SF_ICONS.medal_filled : `#${idx}`}
        </Text>
      </View>
    </View>
  )
}

export default LeaderboardScreen;

const styles = StyleSheet.create({});
