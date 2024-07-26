import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import NoNotifications from "@/assets/svgs/no-notifications/NoNotifications";

const NoNotificationPage = () => {
  return (
    <View style={tw`h-full w-full items-center content-center gap-2 `}>
      <NoNotifications />
      <Text style={tw`text-zinc-700 text-2xl font-semibold pt-6`}>
        No Notifications Yet
      </Text>
      <Text style={tw`text-zinc-500 max-w-xs`}>
        You will see notifications here when they are available
      </Text>
    </View>
  );
};

export default NoNotificationPage;

const styles = StyleSheet.create({});
