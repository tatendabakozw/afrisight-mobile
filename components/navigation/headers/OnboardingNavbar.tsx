import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useColorScheme } from "@/components/useColorScheme";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import tw from "twrnc";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { Typography } from "@/constants/typography";

const OnboardingNavbar = ({ navigation, back, options }: any) => {
  const insets = useSafeAreaInsets();
  const navigate = useNavigation();
  const colorScheme = useColorScheme();
  const title =
    options.title !== undefined ? options.title : options.route.name;

  return (
    <View
      style={[
        tw`flex flex-row gap-3 w-full px-3 bg-white border-zinc-400/30`,
        {
          paddingTop: insets.top + 16,
          alignItems: "center"
        },
      ]}
    >
      {back ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={{
            width: 44,
            height: 44,
            marginBottom: 8,
            backgroundColor: Colors.design.interactiveSurface,
            borderRadius: 24,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="arrow-back" size={20} color={`text-zinc-700`} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          style={{ width: 32, height: 32, marginBottom: 8 }}
          onPress={() => console.log("open menu")}
        >
          <Ionicons name="menu-sharp" size={20} color={`text-zinc-700`} />
        </TouchableOpacity>
      )}
      <Text
        style={{
          fontWeight: "700",
          flex: 1,
          fontSize: Typography.subheading,
        }}
      >
        {title}
      </Text>
      {/* <TouchableOpacity activeOpacity={0.7}>
        <Entypo name="dots-two-vertical" size={24} color={`text-zinc-700`} />
      </TouchableOpacity> */}
    </View>
  );
};

export default OnboardingNavbar;

const styles = StyleSheet.create({});
