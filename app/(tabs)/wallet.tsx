import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import WalletBannerSection from "@/components/wallet-banner-section/WalletBannerSection";
import Colors from "@/constants/Colors";

const sections = [
  { name: "Deposits", _id: "deposits" },
  { name: "Withdrawals", _id: "withdrawals" },
];

const Wallet = () => {
  const [selected_section, setSelectedSection] = useState(sections[0]);
  return (
    <View style={tw`bg-zinc-50 w-full h-full gap-4`}>
      <View style={tw`h-1/3`}>
        <WalletBannerSection />
      </View>
      <View style={tw`gap-4 p-4 `}>
        <View style={tw`flex flex-row bg-zinc-100 rounded-xl p-1`}>
          {sections.map((item) => (
            <TouchableOpacity
              onPress={() => setSelectedSection(item)}
              activeOpacity={0.7}
              key={item._id}
              style={tw`${
                selected_section._id === item._id ? "bg-white rounded-xl " : " "
              } flex-1 p-3`}
            >
              <Text
                style={tw`${
                  selected_section._id === item._id
                    ? `text-zinc-950 `
                    : "text-zinc-400 "
                } text-center font-semibold`}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
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
