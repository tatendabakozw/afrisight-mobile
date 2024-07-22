import Colors from "@/constants/Colors";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  View,
  Platform,
  ImageBackground,
  FlatList,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import TabsWithChat from "@/layouts/TabsWithChat";
import RecentActivityComponent from "@/components/recent-activity/RecentActivityComponent";
import GigItem from "@/components/git-item/GigItem";

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const cards = [
  {
    name: "Store JKL",
    number: "12132 232321",
    amount: 1.05,
    id: 2,
    date: "12/12/23",
    duration: 15,
    status: "pending",
  },
  {
    name: "Store MNO",
    number: "12132 232321",
    amount: 0.75,
    duration: 5,
    id: 22,
    date: "07/07/24",
    status: "in-progress",
  },
  {
    name: "Store MNO",
    number: "12132 232321",
    amount: 0.75,
    duration: 5,
    id: 34,
    date: "07/07/24",
    status: "finished",
  },
];

export default function Home() {
  const insets = useSafeAreaInsets();
  const [searchClicked, setSearchClicked] = useState(false);
  const toggleSearch = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSearchClicked((prev) => !prev);
  };
  return (
    <TabsWithChat>
      <View
        style={[
          tw`bg-zinc-50 pt-4`,
          styles.container,
          { paddingTop: insets.top },
        ]}
      >
        {/* Navigation bar */}
        <View
          style={tw`${
            searchClicked ? " border-b bg-white border-zinc-200/50 " : ""
          } flex flex-col px-4 gap-6 pb-4`}
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
                style={tw`bg-white rounded-full p-2 border border-zinc-200/50`}
              >
                <Ionicons
                  name="notifications-outline"
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          )}
          {searchClicked ? (
            <View
              style={tw`flex flex-row items-center bg-white px-2 gap-4 rounded-full`}
            >
              <AntDesign name="search1" size={20} color="#52525b" />
              <TextInput
                style={tw`p-3 rounded-full flex-1`}
                placeholder="Search Conversations"
              />
              <TouchableOpacity activeOpacity={0.7} onPress={toggleSearch}>
                <Feather name="x" size={24} color="#52525b" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={toggleSearch}
              activeOpacity={0.7}
              style={tw`flex flex-row items-center bg-white p-3 gap-4 rounded-full border border-zinc-200/50`}
            >
              <AntDesign name="search1" size={20} color="#52525b" />
              <Text style={tw`rounded-full text-zinc-400 font-medium flex-1`}>
                Search Conversations
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={tw`gap-4 pt-6 `}>
          <View style={tw`px-4`}>
            <ImageBackground
              source={require("../../assets/images/home-assets/banner-image.png")} // Replace with your background image URL
              style={tw`bg-[${Colors.light.primary}] flex flex-row  items-center p-4 rounded-2xl overflow-hidden`}
              resizeMode="cover"
            >
              <View style={tw`flex flex-col gap-1 flex-1`}>
                <Text style={tw`text-white text-xl font-bold`}>
                  Points: 1200
                </Text>
                <Text style={tw`text-zinc-200 font-medium`}>Level: 5</Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                style={tw`bg-zinc-950 rounded-full py-2 px-6`}
              >
                <Text style={tw`text-white`}>Earn Points</Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
          <Text style={tw`text-zinc-400 text-lg px-4 pt-2`}>
            Recent Activity
          </Text>
          <FlatList
            data={cards} // Use cards data from context
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            snapToAlignment="center"
            decelerationRate="fast"
            keyExtractor={(item) => item.id.toString()} // Ensure each card has a unique id
            renderItem={({ item, index }) => (
              <RecentActivityComponent
                date={item.date}
                duration={item.duration}
                color={`bg-[${Colors.light.primary}]/10`} // Dynamically set background color based on index
                name={item.name} // Example name, modify based on item data
                amount={item.amount} // Example amount, modify based on item data
                id={item.id} // Example id, modify based on item data
                removeCard={() => console.log("remoe items")}
                status={item.status}
              />
            )}
            contentContainerStyle={tw`gap-4 pl-4`}
          />
          <Text style={tw`text-zinc-400 text-lg px-4 pt-2`}>
            Recommendations
          </Text>

          <FlatList
            data={[1, 2, 3, 4, 5, 6]} // Use cards data from context
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            snapToAlignment="center"
            decelerationRate="fast"
            renderItem={({ item, index }) => <GigItem />}
            contentContainerStyle={tw`gap-4 px-4`}
          />
        </View>
      </View>
    </TabsWithChat>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
