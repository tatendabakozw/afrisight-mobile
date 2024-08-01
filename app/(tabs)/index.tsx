import Colors from "@/constants/Colors";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  FlatList,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "twrnc";
import TabsWithChat from "@/layouts/TabsWithChat";
import RecentActivityComponent from "@/components/recent-activity/RecentActivityComponent";
import AllGigs from "@/components/git-item/AllGigs";

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

  return (
    <TabsWithChat>
      <View
        style={[
          tw`bg-zinc-50 flex-1`, // Added flex-1 here
          styles.container,
        ]}
      >
        <ScrollView
          style={tw`flex-1`}
          contentContainerStyle={tw`gap-4 pb-32`} // Removed flex-1 from here
        >
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
                  color={`bg-[${Colors.light.primary}]/5`} // Dynamically set background color based on index
                  name={item.name} // Example name, modify based on item data
                  amount={item.amount} // Example amount, modify based on item data
                  id={item.id} // Example id, modify based on item data
                  removeCard={() => console.log("remove items")}
                  status={item.status}
                />
              )}
              contentContainerStyle={tw`gap-4 pl-4`}
            />
            <Text style={tw`text-zinc-400 text-lg px-4 pt-2`}>
              Recommendations
            </Text>
            <AllGigs />
          </View>
        </ScrollView>
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
