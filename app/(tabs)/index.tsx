import Colors from "@/constants/Colors";
import {
  StyleSheet,
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
import { Fonts, Typography } from "@/constants/typography";
import Text from "@/components/ui/Text";
import useAxiosInstance from "../utils/axios";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-expo";

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

const search_filters = [
  { name: "Commercial", _id: "all" },
  { name: "Pharmaceutical", _id: "inprogress" },
  { name: "Gen Z", _id: "new" },
  { name: "Knowledge", _id: "saved" },
  { name: "Social Experiments", _id: "Experiments" },
  { name: "Strange", _id: "Strange" },
  { name: "Research", _id: "Research" },
  { name: "Fun", _id: "Fun" },
];

export default function Home() {
  const [gigs, setGigs] = useState([]);
  const insets = useSafeAreaInsets();
  const axiosInstance = useAxiosInstance()
  const { userId } = useAuth()
  const [selected_option, setSelectedOption] = useState(search_filters[0]);

  useEffect(() => {
    axiosInstance.get("/gigs").then(res => {
      setGigs(res.data.gigs)
    }).catch(err => {
      console.log(err)
    })


  }, [])



  return (
    <TabsWithChat>
      <ScrollView
        style={{
          flex: 1, backgroundColor: "#fff", paddingTop: 16
        }}
        contentContainerStyle={{

          paddingBottom: 64
        }}
      >

        <ScrollView contentContainerStyle={{
          paddingHorizontal: 16,
          flexDirection: "row",
          gap: 8,
        }}>
          {search_filters.slice(0, 3).map((item) => (
            <TouchableOpacity
              onPress={() => setSelectedOption(item)}
              activeOpacity={0.7}
              style={[
                tw`px-4 py-2 rounded-full`, {
                  backgroundColor: selected_option._id === item._id ? Colors.design.highContrastText : Colors.design.interactiveSurface,
                  borderColor: selected_option._id === item._id ? Colors.design.white : Colors.design.separator,
                }]}
              key={item._id}
            >
              <Text style={{
                fontSize: Typography.buttonText,
                fontFamily: selected_option._id === item._id ? Fonts.Inter_600SemiBold : Fonts.Inter_400Regular,
                color: selected_option._id === item._id ? Colors.design.white : Colors.design.text
              }}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <AllGigs gigs={gigs} />

        {/* <View style={{ marginBottom: 48 }}>
          <Text style={{
            fontSize: Typography.subheading,
            fontFamily: "Inter_600SemiBold",
            marginLeft: 16,
            marginBottom: 20,
            color: Colors.design.highContrastText

          }}>
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
                color={`bg-[#F0F0F0]`} // Dynamically set background color based on index
                name={item.name} // Example name, modify based on item data
                amount={item.amount} // Example amount, modify based on item data
                id={item.id} // Example id, modify based on item data
                removeCard={() => console.log("remove items")}
                status={item.status}
              />
            )}
            contentContainerStyle={{ gap: 16, paddingHorizontal: 16 }}
          />
        </View> */}
      </ScrollView>
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
