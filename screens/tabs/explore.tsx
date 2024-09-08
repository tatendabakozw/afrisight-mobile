import { ScrollView, RefreshControl, View, Animated } from "react-native";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axios";
import { GIG_ROUTES } from "@/constants/routers";
import { Survey } from "@/utils/types";
import Colors from "@/constants/Colors";
import MyPointsCard from "@/components/explore/MyPointsCard";
import DiscoverGigsSection from "@/components/explore/DiscoverGigsSection";
import AllGigs from "@/components/git-item/AllGigs";
import RecentActivitySection from "@/components/explore/RecentActivitySection";
import { useScroll } from "@/contexts/ScrollContext";
import { NAVBAR_HEIGHT } from "@/constants/layout";
import { RouteProp } from "@react-navigation/native";

export default function ExploreScreen() {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const { scrollY } = useScroll();

  const onFetchData = async () => {
    const response = await axiosInstance.get(GIG_ROUTES.GET_ALL_GIGS);
    const data = response.data;
    setSurveys(data.surveys);
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

  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    // setIsScrollingUp(scrollY > 0);
  };

  return (
    <Animated.ScrollView
      style={{ flex: 1, backgroundColor: Colors.design.white, }}
      contentContainerStyle={{
        gap: 60,
        paddingTop: NAVBAR_HEIGHT + 20
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      scrollEventThrottle={16}
    >
      <MyPointsCard points={1000} rank={325} />
      <RecentActivitySection surveys={surveys.slice(0, 5)} />
      <View>
        <DiscoverGigsSection />
        <AllGigs gigs={surveys} />
      </View>
    </Animated.ScrollView>
  );
}
