import { FlatList, Image, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import tw from "twrnc";
import AllGigs from "@/components/git-item/AllGigs";
import Colors from "@/constants/Colors";
import Text from "@/components/ui/Text";
import { Fonts, Typography } from "@/constants/typography";
import { axiosInstance } from "../../utils/axios";
import { GIG_ROUTES } from "@/constants/routers";
import { Survey } from "@/utils/types";
import { useScroll } from "@/contexts/ScrollContext";
import { SF_ICONS } from "@/constants/icons";
import { NAVBAR_HEIGHT } from "@/constants/layout";
import Button from "@/design-system/Button";

const search_filters = [
  { name: "All", _id: "all", icon: SF_ICONS.cards_stack },
  { name: "Completed", _id: "completed", icon: SF_ICONS.checkmark_filled },
  { name: "Saved", _id: "saved", icon: SF_ICONS.bookmark_filled },
];

const MyGigsScreen = () => {
  const [selected_option, setSelectedOption] = useState(search_filters[0]);
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const onFetchData = async () => {
    const response = await axiosInstance.get(GIG_ROUTES.GET_ALL_GIGS)
    const data = response.data;
    setSurveys(data.surveys)
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

  useEffect(() => {
    // setIsScrolled(false)
  }, [])

  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    // setIsScrolled(scrollY > 0);
  };

  const renderSearchFilter = ({ item }: { item: { _id: string; name: string; icon: any } }) => (
    <TouchableOpacity
      onPress={() => setSelectedOption(item)}
      activeOpacity={0.7}
      style={[
        tw`rounded-full`,
        {

          backgroundColor:
            selected_option._id === item._id
              ? Colors.design.surfaceOnSurface
              : Colors.design.surface,
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          paddingRight: 20,
          paddingLeft: 10,
          paddingVertical: 4
        },
      ]}
    >
      <Text
        style={{
          fontSize: Typography.paragraph,
          fontFamily:
            selected_option._id === item._id
              ? Fonts.Inter_700Bold
              : Fonts.Inter_600SemiBold,
          color: selected_option._id === item._id
            ? Colors.design.highContrastText
            : Colors.design.text,

        }}
      >
        {item.icon} {" "}
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Colors.design.white }}
      contentContainerStyle={{
        flex: 1,
        paddingTop: NAVBAR_HEIGHT + 20
      }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 8,
          marginBottom: 20,
        }}
      >
        <FlatList
          data={search_filters}
          renderItem={renderSearchFilter}
          keyExtractor={(item) => item._id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            gap: 8,
          }}
        />
      </View>
      <View style={{
        flex: 1,
        paddingHorizontal: 20,
        gap: 20,
        justifyContent: "center"
      }}>
        <View style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 40,
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Text style={{
            fontFamily: Fonts.Inter_700Bold,
            fontSize: Typography.subheading,
            color: Colors.design.highContrastText,
            lineHeight: Typography.heading * 1.2,
            textAlign: "center"
          }}>There's nothing here yet</Text>
          <Text style={{
            fontFamily: Fonts.Inter_500Medium,
            fontSize: Typography.paragraph,
            color: Colors.design.text,
            textAlign: "center",
            marginBottom: 20,
            maxWidth: 260
          }}>
            Find gigs to participate in and start earning today.
          </Text>
          <Button text={"Explore gigs"} size="medium" variant="primary" colorScheme="primary" style={{
            width: "100%"
          }} />
        </View>
      </View>
    </ScrollView>
  );
};

export default MyGigsScreen;

const styles = StyleSheet.create({});
