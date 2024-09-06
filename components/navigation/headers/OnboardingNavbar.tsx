import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useColorScheme } from "@/components/useColorScheme";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import tw from "twrnc";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Typography } from "@/constants/typography";
import Text from "@/components/ui/Text";
import { useNavigation } from "@react-navigation/native";

const OnboardingNavbar = ({ navigation, back, options }: any) => {
  const insets = useSafeAreaInsets();
  const navigate = useNavigation();
  const colorScheme = useColorScheme();
  const title =
    options.title !== undefined ? options.title : options.route?.name;

  return (
    <View
      style={[
        tw`flex-row w-full bg-white`,
        {
          alignItems: "center",
          gap: 16,
          paddingBottom: 16,
          paddingHorizontal: 16
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.goBack()}
        style={{
          width: 32,
          height: 32,
          borderRadius: 24,
          justifyContent: "center",
          alignItems: "center",

        }}
      >
        <Ionicons name="arrow-back" size={20} color={Colors.design.highContrastText} />
      </TouchableOpacity>


      {/* <TouchableOpacity activeOpacity={0.7}>
        <Entypo name="dots-two-vertical" size={24} color={`text-zinc-700`} />
      </TouchableOpacity> */}
    </View>
  );
};

export default OnboardingNavbar;

const styles = StyleSheet.create({});
