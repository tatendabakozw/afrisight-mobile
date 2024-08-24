import Colors from "@/constants/Colors";
import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { Entypo, Ionicons } from "@expo/vector-icons";
import Text from "../ui/Text";
import { Fonts, Typography } from "@/constants/typography";

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
          <Text style={{ fontFamily: Fonts.Inter_700Bold, fontSize: Typography.subheading }}>${amount}</Text>
          <View style={tw`flex flex-row items-center justify-between`}>
            <Text>{name}</Text>
            <Text>{status}</Text>
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
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
    backgroundColor: Colors.design.interactiveSurface,
    padding: 12
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
