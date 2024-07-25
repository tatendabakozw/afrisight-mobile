import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import WalletBannerSection from "@/components/wallet-banner-section/WalletBannerSection";
import { AntDesign } from "@expo/vector-icons";

const sections = [
  {
    name: "All",
    _id: "all",
    Icon: "swap",
  },
  {
    name: "Deposits",
    _id: "deposits",
    Icon: "arrowup",
  },
  {
    name: "Withdrawals",
    _id: "withdrawals",
    Icon: "arrowdown",
  },
];

const Wallet = () => {
  const [selected_section, setSelectedSection] = useState(sections[0]);
  const transactions = [
    {
      name: "Finish profile",
      type: "deposit",
      amount: 1.05,
      date: "04 July 2024",
      _id: 11,
    },
    {
      name: "Insurance Service",
      type: "withdrawal",
      amount: 0.001,
      date: "05 December 2024",
      _id: 1,
    },
  ];
  return (
    <View style={tw`bg-zinc-50 w-full h-full gap-4`}>
      <View style={tw`h-1/3`}>
        <WalletBannerSection />
      </View>
      <View style={tw`gap-4 px-4 py-2 `}>
        {/* <View style={tw`flex flex-row bg-zinc-100 rounded-xl p-1`}>
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
        </View> */}
        <View style={tw`flex flex-row items-center gap-4`}>
          <Text style={tw`text-zinc-950 text-lg font-semibold flex-1  `}>
            Transactions
          </Text>
          <View
            style={tw`flex flex-row rounded-lg overflow-hidden border border-zinc-200/50`}
          >
            {sections.map((item, index) => (
              <TouchableOpacity
                onPress={() => setSelectedSection(item)}
                activeOpacity={0.7}
                key={item._id}
                style={tw`${
                  selected_section._id === item._id ? "bg-zinc-100" : "bg-white"
                } p-2 ${
                  index < sections.length - 1
                    ? "border-r border-zinc-200/50"
                    : ""
                }`}
              >
                <Text
                  style={tw`${
                    selected_section._id === item._id
                      ? "text-zinc-950"
                      : "text-zinc-400"
                  } text-center text-sm px-4`}
                >
                  <AntDesign
                    // @ts-ignore
                    name={item.Icon}
                    size={20}
                    color={
                      selected_section._id === item._id ? "#a1a1aa" : "#09090b"
                    }
                  />
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={tw`p-2`} />
        {transactions.map((item, index) => (
          <React.Fragment key={item._id}>
            <View style={tw`flex flex-row items-center`}>
              <View style={tw`flex flex-col gap-1 flex-1`}>
                <Text style={tw`text-zinc-950 font-semibold`}>{item.name}</Text>
                <Text style={tw`text-zinc-400 text-xs`}>{item.date}</Text>
              </View>
              {item.type === "deposit" ? (
                <Text style={tw`text-green-600 text-2xl font-bold`}>
                  +${item.amount}
                </Text>
              ) : (
                <Text style={tw`text-red-500 text-2xl font-bold`}>
                  -${item.amount}
                </Text>
              )}
            </View>
            {index < transactions.length - 1 && (
              <View style={tw`h-px bg-gray-200/50`} />
            )}
          </React.Fragment>
        ))}
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
