import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Fonts, Typography } from "@/constants/typography";
import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const GigSurvey = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets()
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{
      flex: 1,

      padding: 16,
      paddingTop: insets.top + 16
    }}>
      <View style={{ flexDirection: "row", marginBottom: 16 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: Colors.design.interactiveCardSurface,
            padding: 8,
            height: 40,
            width: 40,
            borderRadius: 20
          }}
        >
          <Feather name="x" size={24} color={Colors.design.text} />
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center", flex: 1 }}>
        <Text style={{ fontFamily: Fonts.Inter_600SemiBold, fontSize: Typography.heading }}>Well, this is awkward</Text>
        <Text style={{ fontSize: Typography.buttonText, marginTop: 12 }}>This component is still in dev, check later?</Text>
      </View>
    </ScrollView>
  );
};

export default GigSurvey;

const styles = StyleSheet.create({});
