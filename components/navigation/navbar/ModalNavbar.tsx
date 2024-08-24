import React, { useState } from "react";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  View,
  Platform,
} from "react-native";
import Colors from "@/constants/Colors";
import { router } from "expo-router";

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const search_filters = [
  { name: "All", _id: "all" },
  { name: "Inprogress", _id: "inprogress" },
  { name: "New", _id: "new" },
  { name: "Saved", _id: "saved" },
];

const NavBar = ({ navigation, back, options, route }: any) => {
  const insets = useSafeAreaInsets();
  const [searchClicked, setSearchClicked] = useState(false);
  const toggleSearch = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSearchClicked((prev) => !prev);
  };
  const title =
    options.title !== undefined ? options.title : options.route.name;

  const [selected_option, setSelectedOption] = useState(search_filters[0]);
  const currentRouteName = route.name;

  return (
    <View
      style={[
        tw`${searchClicked ? `bg-white border-b border-zinc-200/50 ` : "bg-zinc-50"
          } flex flex-col px-4 gap-6 pb-4`,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      {!searchClicked && (
        <View style={tw`flex flex-row items-center`}>
          <View style={tw`flex-1 gap-1`}>
            <Text style={tw`text-zinc-400`}>Welcome, </Text>
            <Text style={tw`text-zinc-950 text-3xl font-extrabold`}>
              Kudai Mapuranga
            </Text>
          </View>
          <TouchableOpacity
            style={tw`bg-white rounded-full p-3 border border-zinc-200/50`}
          >
            <Ionicons name="notifications-outline" size={20} color="#3f3f46" />
          </TouchableOpacity>
        </View>
      )}
      {searchClicked ? (
        <View
          style={tw`flex flex-row items-center bg-white px-3 gap-4 rounded-full`}
        >
          <AntDesign name="search1" size={20} color="#52525b" />
          <TextInput
            style={tw`p-3 rounded-full flex-1`}
            placeholder="Search "
          />
          <TouchableOpacity activeOpacity={0.7} onPress={toggleSearch}>
            <Feather name="x" size={24} color="#52525b" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={tw`flex flex-row items-center gap-2`}>
          <TouchableOpacity
            onPress={toggleSearch}
            activeOpacity={0.7}
            style={tw`flex flex-row items-center bg-white p-3 flex-1 gap-4 rounded-full border border-zinc-200/50`}
          >
            <AntDesign name="search1" size={20} color="#52525b" />
            <Text style={tw`rounded-full text-zinc-400`}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push("/filter-modal")}
            style={tw`flex flex-row items-center bg-white p-3 gap-4 rounded-full border border-zinc-200/50`}
          >
            <AntDesign name="filter" size={20} color="#3f3f46" />
          </TouchableOpacity>
        </View>
      )}

      {/* filters */}
      {currentRouteName === "gigs" && (
        <View style={tw`flex flex-row items-center gap-4`}>
          {search_filters.map((item) => (
            <TouchableOpacity
              onPress={() => setSelectedOption(item)}
              activeOpacity={0.7}
              style={tw`${selected_option._id === item._id
                  ? `bg-[${Colors.light.primary}] border-[${Colors.light.primary}] `
                  : "bg-white border-zinc-200/50 "
                } px-4 py-2  rounded-full border`}
              key={item._id}
            >
              <Text style={tw`text-sm`}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({});
