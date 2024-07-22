import Colors from "@/constants/Colors";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { Entypo, Ionicons } from "@expo/vector-icons";

interface Props {
  color: string;
  name: string;
  amount: number;
  id: string | number;
  removeCard?: any;
  date: string;
  duration: number | string;
  status: string;
}

const RecentActivityComponent = ({
  color,
  amount,
  removeCard,
  date,
  id,
  name,
  duration,
  status,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onLongPress={() => removeCard(id)}
      style={styles.container}
    >
      <View style={[tw`${color}`, styles.card]}>
        <View style={tw`flex flex-col`}>
          <View style={tw`gap-2 p-4`}>
            <View style={tw`flex flex-row items-center justify-between`}>
              <Text style={tw`text-zinc-500 text-xs font-semibold`}>
                {name}
              </Text>
              <Text style={tw`text-zinc-500 text-xs font-semibold`}>
                {status}
              </Text>
            </View>
            <Text style={tw`text-3xl text-zinc-950 font-bold`}>${amount}</Text>
          </View>
          <View
            style={tw` bg-[${Colors.light.primary}] flex flex-row items-center py-2 px-4`}
          >
            <View style={tw`flex flex-row items-center gap-0.5`}>
              <Ionicons name="timer-outline" size={16} color="#0f172a" />
              <Text style={tw`text-xs text-zinc-950 font-bold`}>
                {duration}m
              </Text>
            </View>
            <Entypo name="dot-single" size={16} color="black" />
            <View style={tw`flex flex-row items-center gap-0.5`}>
              <Ionicons
                name="calendar-clear-outline"
                size={16}
                color="#0f172a"
              />
              <Text style={tw`text-xs text-zinc-950 font-bold`}>{date}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RecentActivityComponent;

const styles = StyleSheet.create({
  container: {},
  card: {
    width: 180,
    borderRadius: 25,
    overflow: "hidden",
    position: "relative",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  cardContent: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  cardNumber: {
    color: "#fff",
    fontSize: 20,
    letterSpacing: 2,
    marginBottom: 20,
  },
  cardDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardHolderLabel: {
    color: "#fff",
    fontSize: 10,
  },
  cardHolder: {
    color: "#fff",
    fontSize: 16,
  },
  expiryDateLabel: {
    color: "#fff",
    fontSize: 10,
  },
  expiryDate: {
    color: "#fff",
    fontSize: 16,
  },
  amountContainer: {
    alignItems: "flex-end",
  },
  amountLabel: {
    color: "#fff",
    fontSize: 12,
  },
  amount: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "semibold",
  },
});
