import { RefreshControl, View, Animated } from "react-native";
import { axiosInstance } from "../../utils/axios";
import { GIG_ROUTES } from "@/constants/routers";
import Colors from "@/constants/Colors";
import MyPointsCard from "@/components/explore/MyPointsCard";
import DiscoverGigsSection from "@/components/explore/DiscoverGigsSection";
import GigList from "@/components/git-item/AllGigs";
import RecentActivitySection from "@/components/explore/RecentActivitySection";
import { NAVBAR_HEIGHT } from "@/constants/layout";
import { SurveyRepository } from "@/model/survey/repo";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/services/auth/hooks";


const localSurveyStoreRepository = new SurveyRepository();


export default function ExploreScreen() {
  const { user } = useAuth();
  const myRecentSurveys = useQuery({
    queryKey: ['recent-surveys'],
    async queryFn() {
      return localSurveyStoreRepository.getSurveys();
    },
  });

  const newSurveys = useQuery({
    queryKey: ['surveys'],
    async queryFn() {
      return onFetchData();
    },
    enabled: !!user
  });


  const onFetchData = async () => {
    const response = await axiosInstance.get(GIG_ROUTES.GET_ALL_GIGS);
    return response.data;
  };

  const onRefresh = async () => {
    await newSurveys.refetch();
  };


  return (
    <Animated.ScrollView
      style={{ flex: 1, backgroundColor: Colors.design.white, }}
      contentContainerStyle={{
        gap: 60,
        paddingTop: NAVBAR_HEIGHT + 20
      }}
      refreshControl={
        <RefreshControl refreshing={newSurveys.isLoading} onRefresh={onRefresh} />
      }
      scrollEventThrottle={16}
    >

      <MyPointsCard points={user?.xp?.points ?? 0} rank={325} />
      <RecentActivitySection surveys={myRecentSurveys.data} />
      <View>
        <DiscoverGigsSection />
        <GigList gigs={newSurveys.data ?? []} />
      </View>
    </Animated.ScrollView>
  );
}
