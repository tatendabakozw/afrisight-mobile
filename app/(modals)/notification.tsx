import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "twrnc";
import NoNotificationPage from "@/components/notification/NoNotificationPage";
import NotificationsHeader from "@/components/navigation/headers/NotificationsHeader";
import NotificationItem from "@/components/notification/NotificationItem";
import { View } from "@/components/Themed";
import Heading from "@/components/heading/Heading";

const Notification = () => {
  const insets = useSafeAreaInsets();
  const notifications = [1, 2, 3];
  return (
    <ScrollView
      contentContainerStyle={[
        tw`bg-zinc-50 px-4 w-full h-full flex-1 gap-4 pb-4`,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      <NotificationsHeader />
      <Heading text="Today" />
      {notifications.length < 1 && <NoNotificationPage />}
      {notifications.length >= 1 && (
        <View style={tw`flex flex-col gap-6 bg-zinc-50`}>
          {notifications.map((item) => (
            <NotificationItem key={item} />
          ))}
        </View>
      )}
      <Heading text="Yesterday" />

      {notifications.length >= 1 && (
        <View style={tw`flex flex-col gap-6 bg-zinc-50`}>
          {notifications.map((item) => (
            <NotificationItem key={item} />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default Notification;

const styles = StyleSheet.create({});
