import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import WalletBannerSection from "@/components/wallet-banner-section/WalletBannerSection";
import tw from "twrnc";
import PhoneNumberInput from "@/components/inputs/PhoneNumberInput";
import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import RegisterSuccessModal from "@/components/modals/RegisterSuccessModal";
import DeleteModal from "@/components/modals/DeleteModal";

const sections = [
  { name: "Top-up", _id: "top-up" },
  { name: "Bank account", _id: "bank-account" },
];

const WalletAddCard = () => {
  const [selected_section, setSelectedSection] = useState(sections[0]);
  const [modalVisible, setModalVisible] = useState(false);

  const verifyUser = () => {
    setModalVisible(true);
  };

  return (
    <View style={tw`bg-zinc-50 w-full h-full gap-4`}>
      <View style={tw`h-1/3`}>
        <WalletBannerSection modal />
      </View>
      <View style={tw`gap-4 px-4 py-2 `}>
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
        {/* phone number input */}
        <PhoneNumberInput />
        <Text>Your Numbers</Text>
        <View
          style={tw`flex flex-row bg-white items-center gap-2 p-2 rounded-lg border border-zinc-200/50`}
        >
          <View
            style={tw`bg-zinc-200 rounded-lg p-3 items-center justify-center`}
          >
            <Text
              style={tw`text-[${Colors.light.primary}] text-xs font-semibold`}
            >
              +263
            </Text>
          </View>
          <Text style={tw`flex-1 text-lg text-zinc-400`}>771445411</Text>
          <TouchableOpacity activeOpacity={0.7} onPress={verifyUser}>
            <Feather name="trash-2" size={24} color="#a1a1aa" />
          </TouchableOpacity>
        </View>
      </View>
      <DeleteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

export default WalletAddCard;

const styles = StyleSheet.create({});
