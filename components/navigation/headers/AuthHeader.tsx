import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useColorScheme } from "@/components/useColorScheme";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import tw from "twrnc";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

const CustomHeader = ({ navigation, back, options }: any) => {
  const insets = useSafeAreaInsets();
  const navigate = useNavigation();
  const colorScheme = useColorScheme();
  const title =
    options.title !== undefined ? options.title : options.route.name;

  return (
    <View
      style={[
        tw`flex flex-row justify-between w-full px-4 pb-6 bg-white`,
        {
          paddingTop: insets.top + 7,
        },
      ]}
    >
      {back ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={`text-zinc-700`} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => console.log("open menu")}
        >
          <Ionicons name="menu-sharp" size={24} color={`text-zinc-700`} />
        </TouchableOpacity>
      )}
      <Text
        style={{
          marginLeft: back ? 20 : 0,
          fontSize: 18,
          color: Colors[colorScheme ?? "light"].text,
        }}
      >
        {title}
      </Text>
      {/* <TouchableOpacity activeOpacity={0.7}>
        <Entypo name="dots-two-vertical" size={24} color={`text-zinc-700`} />
      </TouchableOpacity> */}
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({});
