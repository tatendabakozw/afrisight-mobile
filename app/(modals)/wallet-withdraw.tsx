import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import WalletBannerSection from "@/components/wallet-banner-section/WalletBannerSection";
import tw from "twrnc";
import Colors from "@/constants/Colors";
import CustomInput from "@/components/inputs/CustomInput";
import PrimaryButton from "@/components/buttons/PrimaryButton";

const WalletWithdraw = () => {
  const [amount, setAmount] = useState(0.0);
  return (
    <View style={tw`bg-zinc-50 w-full h-full gap-4`}>
      <View style={tw`h-1/3`}>
        <WalletBannerSection modal />
      </View>
      <View style={tw`gap-8 px-4 py-2 `}>
        <View
          style={tw`bg-white rounded-xl py-2 px-4 gap-4 flex flex-row items-center border border-zinc-200/50`}
        >
          <View style={tw`flex flex-row items-center`}>
            <Text style={tw`text-slate-900 font-extrabold`}>Airtime</Text>
            <View style={tw`items-end`}>
              <Text
                style={tw`text-[${Colors.light.primary}] font-bold text-xs`}
              >
                Top
              </Text>
              <Text
                style={tw`text-[${Colors.light.primary}] font-bold text-xs`}
              >
                Up
              </Text>
            </View>
          </View>
          <View style={tw`flex flex-col flex-1`}>
            <Text style={tw`text-xs text-zinc-500`}>Cell Number</Text>
            <Text style={tw`text-lg font-semibold text-zinc-950`}>
              +263771445411
            </Text>
          </View>
          {/* change number button */}
          <TouchableOpacity style={tw`bg-zinc-100 rounded-full px-2 py-1`}>
            <Text
              style={tw`text-[${Colors.light.primary}] font-semibold text-xs`}
            >
              Change
            </Text>
          </TouchableOpacity>
        </View>
        {/* amount input */}
        <CustomInput
          placeholder="2.00"
          value={amount}
          setValue={setAmount}
          label="Amount"
        />

        <PrimaryButton text="Top-up" />
      </View>
    </View>
  );
};

export default WalletWithdraw;

const styles = StyleSheet.create({});
