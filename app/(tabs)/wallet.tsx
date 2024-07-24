import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import tw from "twrnc";
import Colors from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Wallet = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={tw`bg-zinc-50 w-full h-full`}>
      <View style={tw`h-1/3`}>
        <ImageBackground
          source={require("../../assets/svgs/wallet-banner/wallet-banner.png")} // Ensure WalletBanner is a valid image source
          style={[
            tw`w-full h-full flex-col w-full bg-[${Colors.light.primary}]`,
          ]}
          resizeMode="cover"
        >
          <View
            style={[
              tw`px-6 pb-6 h-full justify-between`,
              { paddingTop: insets.top },
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              style={tw`flex self-end flex-row items-center gap-1 bg-[${Colors.light.primary}]/100 py-1 px-2 rounded-full`}
            >
              <Text style={tw`text-white text-xs font-semibold`}>Add Card</Text>
              <AntDesign name="plus" size={16} color="white" />
            </TouchableOpacity>
            <Text style={tw`text-white text-lg text-center`}>Wallet</Text>
            <Text style={tw`text-white text-5xl text-center font-bold`}>
              $120.00
            </Text>
            <View style={tw`flex w-full mx-auto w-2/3 max-w-xs`}>
              <TouchableOpacity style={tw`bg-white py-2 px-4 rounded-full`}>
                <Text
                  style={tw`text-[${Colors.light.primary}] text-lg text-center`}
                >
                  Withdraw
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
      <Text>asdkljlk</Text>
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject, // Ensures the overlay takes up the entire space
    justifyContent: "center",
    alignItems: "center",
  },
});
