import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import React, { ReactNode, useEffect, useState } from "react";
import tw from "twrnc";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GigDescriptionHeader from "@/components/navigation/headers/GigDescriptionHeader";
import Text from "@/components/ui/Text";
import { Fonts, Typography } from "@/constants/typography";
import Colors from "@/constants/Colors";
import { axiosInstance } from "../../utils/axios";
import { GIG_ROUTES } from "@/constants/routers";
import { Survey } from "@/utils/types";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { timeFromNow } from "@/components/git-item/GigItem";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/design-system/Button";
import { SF_ICONS } from "@/constants/icons";
import IconText from "@/design-system/Text/IconText";
import Separator from "@/design-system/Separator";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  GigDetails: {
    screen: 'GigDescriptionScreen' | 'GigModalScreen';
    params: { gig_id: string, surveyLink: string };
  };
};

type GigDescriptionScreenRouteProp = RouteProp<RootStackParamList, 'GigDetails'>;
type GigDescriptionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GigDetails'>;

function formatDollarAmount(
  amount: number,
  options?: Intl.NumberFormatOptions
): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  });

  return formatter.format(amount);
}

const GigDescriptionScreen = () => {
  const navigation = useNavigation<GigDescriptionScreenNavigationProp>();
  const route = useRoute<GigDescriptionScreenRouteProp>();
  console.log(route.params)
  const { gig_id } = route.params as any as { gig_id: string };

  const [hasStarted, setHasStarted] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const [survey, setSurvey] = useState<Survey | null>(null);

  const fetchHasSurveyStarted = async (id: string) => {
    const response = await axiosInstance.get(GIG_ROUTES.GET_SURVEY_RESPONSE_HAS_STARTED(id));
    console.log(response.data)
    setHasStarted(response.data.hasStarted);
    setIsCompleted(response.data.status === "COMPLETED")
  }

  const fetchSurveyData = async (id: string) => {
    const response = await axiosInstance.get(GIG_ROUTES.GET_GIG_BY_ID(id));
    setSurvey(response.data);
  };

  useEffect(() => {
    if (gig_id) {
      Promise.all([fetchSurveyData(gig_id as string),
      fetchHasSurveyStarted(gig_id as string)])
    }
  }, [gig_id]);

  if (!survey) {
    return <LoadingScreen />;
  }

  const navigateToFormPage = async () => {
    if (!hasStarted) {
      await axiosInstance.post(GIG_ROUTES.START_RESPONDING(survey._id))
    }
    navigation.navigate('GigDetails', {
      screen: 'GigModalScreen',
      params: {
        gig_id,
        surveyLink: typeof survey.form === "string" ? survey.form : survey.form._id,
      }
    });
  };

  const onRefresh = async () => {
    setRefreshing(true)
    try {
      await Promise.all([fetchSurveyData(gig_id as string), fetchHasSurveyStarted(gig_id as string)])
    } finally {
      setRefreshing(false)
    }
  }

  return (
    <ScrollView refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    } style={{ flex: 1, backgroundColor: Colors.design.white }} contentContainerStyle={[
      {
        paddingBottom: 60
      },
    ]}>
      <View style={{
        paddingHorizontal: 20
      }}>
        <GigDescriptionHeader />
      </View>
      <View style={{ gap: 24, padding: 24 }}>
        <View
          style={{
            gap: 8,
            alignItems: "center"
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 16 }}>
            <View
              style={{
                height: 200,
                width: 200,
                borderRadius: 16,
                backgroundColor: Colors.design.interactiveCardSurface,
              }}
            ></View>
          </View>
          <Text
            style={[
              {
                fontFamily: Fonts.Inter_700Bold,
                fontSize: Typography.heading,
                color: Colors.design.highContrastText,
                textAlign: "center",
              },
            ]}
          >
            {survey.name}
          </Text>
          <View
            style={{ flexDirection: "row", gap: 10, alignItems: "center", justifyContent: "center" }}
          >
            <Text
              style={{
                fontFamily: Fonts.Inter_600SemiBold,
                color: Colors.design.mutedText,
                fontSize: Typography.paragraph
              }}
            >
              {SF_ICONS.dollar}{" "}
              {formatDollarAmount(survey.dollarRewardValue)}
            </Text>
            <Text style={{}}>&bull;</Text>
            <Text
              style={{
                fontFamily: Fonts.Inter_600SemiBold,
                fontSize: Typography.paragraph,
                color: Colors.design.mutedText

              }}
            >
              {SF_ICONS.stopwatch}{" "}
              {survey.duration} min
            </Text>

          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <Button disabled={isCompleted} onPress={navigateToFormPage} style={{ width: "100%" }} text={"Start gig"} size="medium" variant="accent" colorScheme="primary" />

          {isCompleted && <Text style={{ fontFamily: Fonts.Inter_600SemiBold, fontSize: Typography.paragraph, color: Colors.design.mutedText, marginTop: 10 }}>
            You have already completed this gig
          </Text>}
        </View>
      </View>
      <View style={{ gap: 20, padding: 24 }}>
        <Section label="Description">
          <Text
            style={[
              tw`text-zinc-600`,
              {
                lineHeight: Typography.paragraph * 1.3,
                fontSize: Typography.paragraph,
                color: Colors.design.text,
                fontFamily: Fonts.Inter_500Medium,

              },
            ]}
          >
            {survey?.description}
          </Text>
        </Section>
        <Separator />

        <Section label="Additional information">
          <DetailItem
            label="Views"
            icon={
              <IconText>
                {SF_ICONS.eye}
              </IconText>
            }
            value={<Text style={{ fontFamily: Fonts.Inter_600SemiBold, fontSize: Typography.paragraph }}>{survey.views}</Text>}
          />
          <DetailItem
            label="Reward"
            icon={
              <IconText>
                {SF_ICONS.sparkles}
              </IconText>
            }
            value={
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
              >
                {survey.reward.type === "points" ? (
                  <>
                    <IconText>
                      {SF_ICONS.medal_filled}
                    </IconText>                    <Text style={{ fontFamily: Fonts.Inter_600SemiBold, fontSize: Typography.paragraph }}>
                      {(survey.reward.value as any).amount} XP
                    </Text>
                  </>
                ) : (
                  <>
                    <IconText>
                      {SF_ICONS.gift_filled}
                    </IconText>
                    <Text style={{ fontFamily: Fonts.Inter_600SemiBold, fontSize: Typography.paragraph, color: Colors.design.yellowText }}>
                      Voucher
                    </Text>
                  </>
                )}
              </View>
            }
          />
          <DetailItem
            label="Participants"
            icon={
              <IconText>
                {SF_ICONS.people}
              </IconText>
            }
            value={<Text style={{ fontFamily: Fonts.Inter_600SemiBold, fontSize: Typography.paragraph }}>{survey.completedParticipants}</Text>}
          />
          <DetailItem
            label="Form ID"
            icon={
              <IconText>
                {SF_ICONS.document}
              </IconText>
            }
            value={
              <Text
                style={{
                  fontFamily: Fonts.Inter_600SemiBold,
                  color: Colors.design.accent,
                  fontSize: Typography.paragraph,
                  maxWidth: 180
                }}
                numberOfLines={1}
              >
                {typeof survey.form === "string"
                  ? survey.form
                  : survey.form._id}
              </Text>
            }
          />
        </Section>
      </View>
    </ScrollView>
  );
};

const Section = (props: { label: string; children: ReactNode }) => {
  return (
    <View
      style={[
        tw`flex flex-col w-full`,

      ]}
    >
      <Text
        style={{
          fontSize: Typography.paragraph,
          fontFamily: Fonts.Inter_700Bold,
          color: Colors.design.highContrastText,
          marginBottom: 20,
        }}
      >
        {props.label}
      </Text>
      {props.children}
    </View>
  );
};

const DetailItem = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: ReactNode;
  icon: ReactNode;
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10
      }}
    >
      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
        {icon}
        <Text style={{ fontFamily: Fonts.Inter_600SemiBold, fontSize: Typography.paragraph }}>{label}</Text>
      </View>
      <View>{value}</View>
    </View>
  );
};

export default GigDescriptionScreen;
