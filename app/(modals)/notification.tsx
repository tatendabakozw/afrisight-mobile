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

const Notification = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <ScrollView
      contentContainerStyle={[
        tw`bg-zinc-50 px-4 w-full flex-1 gap-4 pb-4`,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      <View style={tw`flex flex-row gap-4 py-2`}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`bg-zinc-100 rounded-full p-2`}
        >
          <Ionicons name="arrow-back-sharp" size={24} color="#71717a" />
        </TouchableOpacity>
        <View style={tw`flex-1`} />
        <TouchableOpacity style={tw` rounded-full p-2`}>
          <Text style={tw`text-[${Colors.light.primary}]`}>
            Mark all as read
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Notification;

const styles = StyleSheet.create({});
