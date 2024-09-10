import Colors from "@/constants/Colors";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  FlatList,
  ScrollView,
  RefreshControl,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "twrnc";
import TabsWithChat from "@/layouts/TabsWithChat";
import MySurvey from "@/components/recent-activity/RecentActivityComponent";
import GigList from "@/components/git-item/AllGigs";
import { Fonts, Typography } from "@/constants/typography";
import Text from "@/components/ui/Text";
import { useEffect, useState } from "react";
import { Image } from "react-native";
import { useAuth } from "@/services/auth/hooks";
import { NAVBAR_HEIGHT } from "@/constants/layout";
import Button from "@/design-system/Button";
import { SF_ICONS } from "@/constants/icons";
import Separator from "@/design-system/Separator";

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

export default function GiftShopScreen() {
  const [gigs, setGigs] = useState([]);
  const [selected_option, setSelectedOption] = useState(search_filters[0]);

  const [refreshing, setRefreshing] = useState(false);

  const onFetchData = () => {

  };

  const onRefresh = async () => {
    console.log("Refreshing");
    setRefreshing(true);
    await onFetchData();
    setRefreshing(false);
  };

  useEffect(() => {
    onFetchData();
  }, []);



  return (
    <ScrollView

      style={{ flex: 1, backgroundColor: Colors.design.white }}

      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >

      <View style={{
        marginBottom: 40, marginTop: NAVBAR_HEIGHT + 20,
      }}>
        <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingHorizontal: 20, alignItems: "baseline", gap: 6 }}>
          <Text style={{ fontFamily: Fonts.Inter_700Bold, color: Colors.design.highContrastText, fontSize: Typography.heading }}>
            My collection
          </Text>
        </View>
        <View style={{ marginBottom: 20, paddingHorizontal: 20, }}>
          <CollectedItem code="XC828B" name="Pick n Pay Contributors" price="90" expiryDate="12 Nov 2024" />
          <CollectedItem code="XC828B" name="Pick n Pay Contributors" price="90" expiryDate="12 Nov 2024" />
          <CollectedItem code="XC828B" name="Pick n Pay Contributors" price="90" expiryDate="12 Nov 2024" />
        </View>
        <Button style={{ marginHorizontal: 20 }} text="View all collected items" />
      </View>

      <View style={{ marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: "space-between", padding: 20, alignItems: "baseline", gap: 6, }}>
          <Text style={{ fontFamily: Fonts.Inter_700Bold, color: Colors.design.highContrastText, fontSize: Typography.heading, lineHeight: Typography.heading * 1.2 }}>
            Marketplace
          </Text>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            <Text style={{ fontFamily: Fonts.Inter_700Bold, color: Colors.design.highContrastText, fontSize: Typography.body, lineHeight: Typography.body * 1.2 }}>
              Most expensive
            </Text>
            <Image source={require("@/assets/images/illustrations/chevron-down-icon-gray.png")} style={{ height: 20, width: 20 }} />

          </View>
        </View>
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <MarketplaceItem name={"Delta Super"} currentPrice={29} basePrice={20} _id={"jdkdh"} />
          <Separator />
          <MarketplaceItem name={"Delta Super"} currentPrice={12} basePrice={20} _id={"jdkdh"} />
          <Separator />
          <MarketplaceItem name={"Delta Super"} currentPrice={29} basePrice={20} _id={"jdkdh"} />

        </View>
        <Button style={{ marginHorizontal: 20 }} text="View all marketplace items" />

      </View>


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
  );
}


const CollectedItem = (props: {
  name: string
  price: string
  expiryDate: string
  code: string
}) => {
  return (
    <View style={{ flexDirection: "row", gap: 20, alignItems: "flex-start", paddingVertical: 10 }}>
      <ImageBackground source={require("@/assets/images/backgrounds/background-lime.png")} style={{ height: 48, width: 48, }} imageStyle={{ borderRadius: 10 }}>
      </ImageBackground>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: Typography.body, color: Colors.design.highContrastText, fontFamily: Fonts.Inter_600SemiBold, marginBottom: 4, lineHeight: Typography.body }}>
          {props.name}
        </Text>

        <Text style={{ fontFamily: Fonts.Inter_600SemiBold, fontSize: Typography.body, color: Colors.design.mutedText }}>
          {SF_ICONS.clock} {props.expiryDate}
        </Text>
      </View>
      <Text style={{ fontSize: Typography.body, color: Colors.design.highContrastText, fontFamily: Fonts.Inter_700Bold, lineHeight: Typography.body }}>
        {props.code}
      </Text>
    </View>
  )
}

const MarketplaceItem = (props: {
  name: string
  currentPrice: number
  basePrice: number
  _id: string
}) => {
  return (
    <View style={{ flexDirection: "row", gap: 20, alignItems: "center", paddingVertical: 10 }}>
      <ImageBackground source={require("@/assets/images/backgrounds/background-lime.png")} style={{ height: 48, width: 48, }} imageStyle={{ borderRadius: 10 }}>
      </ImageBackground>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: Typography.body, color: Colors.design.highContrastText, fontFamily: Fonts.Inter_600SemiBold, marginBottom: 6, lineHeight: Typography.body * 1.2 }}>
          {props.name}
        </Text>
        <Text style={{ fontFamily: Fonts.Inter_600SemiBold, textAlign: "left", fontSize: Typography.body, color: Colors.design.mutedText, lineHeight: Typography.body * 1.2 }}>
          Base price: {props.basePrice} XP
        </Text>

      </View>
      <View>
        <Text style={{ fontSize: Typography.body, color: Colors.design.highContrastText, fontFamily: Fonts.Inter_700Bold, marginBottom: 6, textAlign: "right", lineHeight: Typography.body }}>
          {props.currentPrice} XP
        </Text>
        <Text style={{ fontFamily: Fonts.Inter_700Bold, textAlign: "right", color: props.currentPrice - props.basePrice > 0 ? Colors.design.text : Colors.design.redText, lineHeight: 16 }}>
          {Intl.NumberFormat().format((props.currentPrice - props.basePrice) / props.basePrice)}% {" "}
        </Text>

      </View>
    </View>
  )
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
