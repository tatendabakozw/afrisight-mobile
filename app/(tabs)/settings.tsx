import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "twrnc";
import Colors from "@/constants/Colors";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import PrimaryBorder from "@/components/borders/PrimaryBorder";
import Heading from "@/components/heading/Heading";
import SettingsItem from "@/components/settings-components/SettingsItem";
import PrimaryButton from "@/components/buttons/PrimaryButton";

const Settings = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        tw`flex flex-col gap-6 bg-zinc-50 h-full px-6`,
        { paddingTop: insets.top },
      ]}
    >
      <View style={tw`flex flex-row items-center py-4 gap-4`}>
        <View
          style={tw`flex flex-row items-center justify-center h-20 w-20 rounded-full bg-[${Colors.light.primary}]`}
        >
          <Text style={tw`text-4xl font-extrabold text-white`}>K</Text>
        </View>
        <View style={tw`flex flex-col flex-1`}>
          <Text style={tw`text-zinc-950 font-semibold text-2xl`}>
            Tatenda Bako
          </Text>
          <Text style={tw`text-zinc-600`}>+263771445411</Text>
          <Text style={tw`text-[${Colors.light.primary}]`}>
            tatenda.bako@afrisight.com
          </Text>
        </View>
        <TouchableOpacity
          style={tw`bg-white rounded-full p-2 border border-zinc-200/50`}
        >
          <Feather name="edit-2" size={16} color="black" />
        </TouchableOpacity>
      </View>
      <PrimaryBorder darker />
      <View style={tw`gap-4`}>
        <Heading text="General Settings" />
        <SettingsItem
          icon_name={"credit-card"}
          heading="Wallet Settings"
          description="Manage Your wallet"
          location=""
        />

        <PrimaryBorder />
        <SettingsItem
          icon_name={"bell"}
          heading="Notifications"
          description="Manage your notifications"
          location=""
        />
        <PrimaryBorder />
        <SettingsItem
          icon_name={"language"}
          icon_from="ionicons"
          heading="Language Settings"
          description="Change Language here"
          location=""
        />
        <PrimaryBorder darker />
        <Heading text="Security Settings" />
        <SettingsItem
          icon_name={"lock"}
          heading="Password Settings"
          description="Manage your password"
          location=""
        />
        <SettingsItem
          icon_name={"clipboard"}
          heading="Privacy Policy"
          description="You can review our policy"
          location=""
        />
      </View>
      <View style={tw`py-4`} />
      <PrimaryButton
        icon={<MaterialIcons name="logout" size={20} color="white" />}
        text="Logout"
      />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
