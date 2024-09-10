import { FlatList, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
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
import { EmptyStateCaption, EndOfListCaption } from "@/components/captions";
import { StatusBar } from "react-native";
import { axiosInstance } from "@/utils/axios";
import { LEADERBOARD_ROUTES } from "@/constants/routers";
import { useQuery } from "@tanstack/react-query";
import { LeaderBoardProvider, useLeaderBoard } from "@/services/leaderboard";
import IconText from "@/design-system/Text/IconText";
import { getLeaderboardDisplayName, getUserDisplayName } from "@/services/auth/utils";

const LeaderboardScreen = () => {
  const fetchLeaderboard = async () => {
    const response = await axiosInstance.get(LEADERBOARD_ROUTES.GET_LEADERBOARD)
    return response.data
  }

  const leaderboard = useQuery({
    queryKey: ["leaderboard"],
    queryFn: fetchLeaderboard
  })


  return (
    <LeaderBoardProvider>
      <View style={{ flex: 1, backgroundColor: Colors.design.surface }}>
        <FlatList
          data={[{ key: 'header' }, { key: 'leaderboard' }]}
          renderItem={({ item }) => {
            if (item.key === 'header') {
              return (
                <View style={{ gap: 20, marginBottom: 20 }}>
                  <Header />
                  <Profile />
                  <Separator />
                </View>
              );
            } else {
              return <LeaderboardPresenter />;
            }
          }}
          keyExtractor={(item) => item.key}
        />
      </View>
    </LeaderBoardProvider>
  );
};

const LeaderboardPresenter = () => {
  const { rank, rankings, error } = useLeaderBoard()
  return (
    <View style={{ marginBottom: 20, marginTop: 20, }}>
      <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingHorizontal: 20, alignItems: "baseline", gap: 6, marginBottom: 10 }}>
        <Text style={{ fontFamily: Fonts.Inter_700Bold, color: Colors.design.highContrastText, fontSize: Typography.subheading }}>
          {SF_ICONS.trophy_filled}{" "}
          Leaderboard
        </Text>

      </View>
      <FlatList
        data={rankings || []}
        keyExtractor={(item, index) => `leaderboard-${index}`}
        renderItem={({ item, index }) => (
          <>
            <LeaderboardPosition idx={index + 1} {...item} />
            <Separator />
          </>
        )}
        ListFooterComponent={!error?.rankings ? <EndOfListCaption /> : null}
        ListEmptyComponent={() => <EmptyStateCaption message="No one has completed a survey yet" />}
        contentContainerStyle={{ marginBottom: 20 }}
      />

    </View>

  )
}

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
          <Text style={{ fontSize: Typography.body, fontFamily: Fonts.Inter_700Bold, color: Colors.design.highContrastText }}>
            $3.20
          </Text>
        </View>
      </Row>
    </Row>
  )
}

const Profile = () => {
  const { user } = useAuth()
  const { rank, error } = useLeaderBoard()

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
            {user && getUserDisplayName(user)}
          </Text>
          <Text
            style={{
              fontSize: Typography.body,
              color: Colors.design.mutedText,
              fontFamily: Fonts.Inter_600SemiBold
            }}
          >
            {user.email}
          </Text>
        </View>
      )}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 20, marginVertical: 20, paddingHorizontal: 20 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 10, paddingRight: 20, paddingVertical: 6, borderRadius: 10, backgroundColor: Colors.design.gold }}>
          <Text style={{ fontFamily: Fonts.Inter_700Bold, fontSize: Typography.body, color: Colors.design.white }}>
            {SF_ICONS.trophy_filled}
          </Text>
          <Text style={{ fontSize: Typography.body, fontFamily: Fonts.Inter_700Bold, color: Colors.design.white }}>
            #{rank?.index ?? 0}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 10, paddingRight: 20, paddingVertical: 6, borderRadius: 10, backgroundColor: Colors.design.surfaceOnSurface }}>
          <IconText style={{ fontSize: Typography.body, fontFamily: Fonts.Inter_700Bold, color: Colors.design.redText }}>
            {SF_ICONS.medal_filled}
          </IconText>
          <Text style={{ fontSize: Typography.body, fontFamily: Fonts.Inter_700Bold, color: Colors.design.redText }}>
            {user?.xp?.points ?? 0} XP
          </Text>
        </View>
      </View>
    </View>
  )
}


const LeaderboardPosition = ({
  idx, points, profile,
}: {
  idx: number,
  points: number,
  profile: {
    _id: string,
    firstname?: string,
    surname?: string,
  }
}) => {
  const colors = [Colors.design.gold, Colors.design.silver, Colors.design.bronze,]
  const itemColor = idx < 4 ? colors[idx - 1] : Colors.design.mutedText
  return (
    <View style={{ paddingVertical: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20 }}>
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center", flex: 1 }}>
        <ImageBackground source={require("@/assets/images/backgrounds/background-red.png")} style={{ width: 32, height: 32 }} imageStyle={{ borderRadius: 40 }}>
        </ImageBackground>
        <Text style={{ fontFamily: Fonts.Inter_600SemiBold, color: Colors.design.text, fontSize: Typography.body }}>
          {getLeaderboardDisplayName(profile)}
        </Text>
      </View>
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <Text style={{ fontFamily: Fonts.Inter_700Bold, fontSize: Typography.body, color: itemColor }}>
          {points} XP
        </Text>
        <Text style={{ fontFamily: Fonts.Inter_600SemiBold, fontSize: Typography.body, color: itemColor }}>
          {idx < 4 ? SF_ICONS.medal_filled : `#${idx}`}
        </Text>
      </View>
    </View>
  )
}

export default LeaderboardScreen;

const styles = StyleSheet.create({});
