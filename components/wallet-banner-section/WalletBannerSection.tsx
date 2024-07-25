import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "twrnc";
import { AntDesign } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";

interface Props {
  modal?: boolean;
}

const WalletBannerSection = ({ modal }: Props) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../../assets/svgs/wallet-banner/wallet-banner.png")} // Ensure WalletBanner is a valid image source
      style={[tw`w-full h-full flex-col w-full bg-[${Colors.light.primary}]`]}
      resizeMode="cover"
    >
      <View
        style={[
          tw`px-6 pb-6 h-full justify-between`,
          { paddingTop: insets.top },
        ]}
      >
        {modal && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
            style={tw`flex self-start flex-row items-center mt-2 gap-1 bg-[${Colors.light.primary}]/100 p-3 rounded-full`}
          >
            <AntDesign name="arrowleft" size={20} color="white" />
          </TouchableOpacity>
        )}
        {!modal && (
          <TouchableOpacity
            onPress={() => router.push("(modals)/wallet-add-card")}
            activeOpacity={0.7}
            style={tw`flex self-end flex-row items-center mt-2 gap-1 bg-[${Colors.light.primary}]/100 py-1 px-2 rounded-full`}
          >
            <Text style={tw`text-white text-xs font-semibold`}>Add Card</Text>
            <AntDesign name="plus" size={16} color="white" />
          </TouchableOpacity>
        )}
        <Text style={tw`text-white text-lg text-center font-semibold`}>
          Wallet
        </Text>
        <Text style={tw`text-white text-6xl text-center font-bold`}>
          $120.00
        </Text>
        {!modal && (
          <View style={tw`flex w-full mx-auto w-2/3 max-w-xs`}>
            <TouchableOpacity
              onPress={() => router.push("(modals)/wallet-withdraw")}
              activeOpacity={0.7}
              style={tw`bg-white py-2 px-4 rounded-full`}
            >
              <Text
                style={tw`text-[${Colors.light.primary}] text-lg text-center font-semibold`}
              >
                Withdraw
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

export default WalletBannerSection;

const styles = StyleSheet.create({});
