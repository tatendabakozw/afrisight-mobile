import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "twrnc";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import NoNotificationPage from "@/components/notification/NoNotificationPage";
import NotificationsHeader from "@/components/navigation/headers/NotificationsHeader";

const Notification = () => {
  const insets = useSafeAreaInsets();
  const notifications = [];
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
      {notifications.length < 1 && <NoNotificationPage />}
    </ScrollView>
  );
};

export default Notification;

const styles = StyleSheet.create({});
