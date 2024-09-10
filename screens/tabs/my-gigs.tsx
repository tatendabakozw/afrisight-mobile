import { FlatList, Image, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import tw from "twrnc";
import GigList from "@/components/git-item/AllGigs";
import Colors from "@/constants/Colors";
import Text from "@/components/ui/Text";
import { Fonts, Typography } from "@/constants/typography";
import { axiosInstance } from "../../utils/axios";
import { GIG_ROUTES } from "@/constants/routers";
import { Survey } from "@/types";
import { useScroll } from "@/contexts/ScrollContext";
import { SF_ICONS } from "@/constants/icons";
import { NAVBAR_HEIGHT } from "@/constants/layout";
import Button from "@/design-system/Button";
import { useQuery } from "@tanstack/react-query";
import { SurveyRepository } from "@/model/survey/repo";
import { useSavedSurveys } from "@/contexts/SavedSurveysContext";
import MySurvey from "@/components/recent-activity/RecentActivityComponent";
import Separator from "@/design-system/Separator";

const search_filters = [
  { name: "All", _id: "all", icon: SF_ICONS.cards_stack, color: Colors.design.purpleText, backgroundColor: Colors.design.purple },
  { name: "Completed", _id: "completed", icon: SF_ICONS.checkmark_filled, color: Colors.design.greenText, backgroundColor: Colors.design.green },
  { name: "Saved", _id: "saved", icon: SF_ICONS.bookmark_filled, color: Colors.design.redText, backgroundColor: Colors.design.redSurface },
];


const localSurveyStoreRepository = new SurveyRepository();

const MyGigsScreen = () => {
  const { savedSurveys } = useSavedSurveys();
  const [selected_option, setSelectedOption] = useState(search_filters[0]);
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const myRecentSurveys = useQuery({
    queryKey: ['recent-surveys'],
    async queryFn() {
      return localSurveyStoreRepository.getSurveys();
    },
  });

  const onFetchData = async () => {
    const response = await axiosInstance.get(GIG_ROUTES.GET_ALL_GIGS)
    const data = response.data;
    setSurveys(data.surveys)
  };

  useEffect(() => {
    localSurveyStoreRepository.getSurveys().then(console.log)
  }, [])

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


  const renderSearchFilter = ({ item }: { item: { _id: string; name: string; icon: any, color: string, backgroundColor: string } }) => (
    <TouchableOpacity
      onPress={() => setSelectedOption(item)}
      activeOpacity={0.7}
      style={[
        tw`rounded-full`,
        {

          backgroundColor:
            selected_option._id === item._id
              ? item.backgroundColor
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
          fontSize: Typography.body,
          fontFamily:
            selected_option._id === item._id
              ? Fonts.Inter_700Bold
              : Fonts.Inter_600SemiBold,
          color: item.color,

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
          refreshing={myRecentSurveys.isLoading}
          onRefresh={myRecentSurveys.refetch}
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
        gap: 20,
        justifyContent: "center"
      }}>
        <FlatList
          data={savedSurveys}
          renderItem={({ item }) => <>
            <MySurvey key={`${item._id}-${item.name}`} {...item} />
            <Separator key={`${item._id}-${item.name}-separator`} />
          </>}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{
            gap: 20,
          }}
          style={{ flex: 1 }}
          ListEmptyComponent={EmptyState}
        />
      </View>
    </ScrollView>
  );
};

const EmptyState = () => (
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
      fontSize: Typography.body,
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
)

export default MyGigsScreen;

const styles = StyleSheet.create({});
