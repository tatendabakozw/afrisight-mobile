import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import Colors from "@/constants/Colors";
import IconText from "@/design-system/Text/IconText";
import { SF_ICONS } from "@/constants/icons";
import { useNavigation } from "@react-navigation/native";

const GigDescriptionHeader = ({ onToggleSaved, isSaved }: { onToggleSaved: () => void, isSaved: boolean }) => {
  const navigation = useNavigation();
  return (
    <View style={tw`flex flex-row gap-4 py-2`}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[tw`rounded-full p-2`, {
          backgroundColor: Colors.design.surface,
        }]}
      >
        <IconText style={{ color: Colors.design.highContrastText }}>
          {SF_ICONS.chevron_left}
        </IconText>
      </TouchableOpacity>
      <View style={tw`flex-1`} />

      <TouchableOpacity style={[tw`rounded-full`, {
        backgroundColor: isSaved ? Colors.design.redSurface : Colors.design.surface,
        height: 40,
        width: 40,
        justifyContent: "center",
        alignItems: "center",
      }]}
        onPress={onToggleSaved}
      >
        <IconText style={{ color: isSaved ? Colors.design.redText : Colors.design.highContrastText, }}>
          {SF_ICONS.bookmark_filled}
        </IconText>
      </TouchableOpacity>
    </View>
  );
};

export default GigDescriptionHeader;

const styles = StyleSheet.create({});
