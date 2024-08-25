import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { ReactNode, useEffect, useState } from "react";
import tw from "twrnc";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import GigDescriptionHeader from "@/components/navigation/headers/GigDescriptionHeader";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import Text from "@/components/ui/Text";
import { Fonts, Typography } from "@/constants/typography";
import Colors from "@/constants/Colors";
import useAxiosInstance from "../utils/axios";

const GigDescription = () => {
  const insets = useSafeAreaInsets();
  const { gig_type, gig_id } = useLocalSearchParams();
  const [gig, setGig] = useState<any>({});
  const instance = useAxiosInstance();
  const router = useRouter();

  useEffect(() => {
    instance.get(`/gigs/${gig_id}`).then((res) => {
      setGig(res.data);
    });
  }, [gig_id]);

  const navigateToFormPage = () => {
    router.push({
      pathname: "/(modals)/gig-modal",
      params: {
        surveyLink: gig.surveyLink,
      }
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={[
          tw`w-full gap-4 pb-4`,
          {
            paddingTop: insets.top,
            flex: 1,
          },
        ]}
      >
        <View style={{ gap: 24, padding: 16 }}>
          <GigDescriptionHeader />
          <View
            style={{
              gap: 8,
            }}
          >
            <Text
              style={[
                {
                  fontFamily: Fonts.Inter_700Bold,
                  fontSize: Typography.heading,
                  color: Colors.design.highContrastText,
                },
              ]}
            >
              {gig?.name}
            </Text>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Text
                style={{
                  fontFamily: Fonts.Inter_500Medium,
                  color: Colors.design.text,
                }}
              >
                Created {gig.age} days ago
              </Text>
              <Text style={{}}>&bull;</Text>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <Text>{gig?.duration}</Text>
              </View>
              <Text style={{}}>&bull;</Text>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <Text>{gig?.price} points</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ gap: 40 }}>
          <Section label="Description">
            <Text
              style={[
                tw`text-zinc-600`,
                {
                  lineHeight: 20,
                  fontSize: Typography.paragraph,
                  color: Colors.design.text,
                },
              ]}
            >
              {gig?.desc}
            </Text>
          </Section>
          <Section label="About the client">
            <View
              style={{
                marginBottom: 20,
              }}
            >
              <Text
                style={[
                  tw`text-zinc-600`,
                  {
                    lineHeight: 20,
                    fontSize: Typography.paragraph,
                    color: Colors.design.text,
                  },
                ]}
              >
                {gig?.location}
              </Text>
            </View>
          </Section>
        </View>
      </ScrollView>
      <View
        style={{
          borderTopWidth: 1,
          borderColor: Colors.design.separator,
          padding: 16,
          flexDirection: "row",
          backgroundColor: Colors.design.white,
          gap: 32,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text>
            <Text
              style={{
                fontFamily: Fonts.Inter_700Bold,
                color: Colors.design.highContrastText,
              }}
            >
              {gig?.price} XP
            </Text>{" "}
            reward
          </Text>
          <Text style={{ fontSize: 13, color: Colors.design.text }}>
            Closes 25 Aug 2024
          </Text>
        </View>
        <TouchableOpacity
          onPress={navigateToFormPage}
          style={{
            height: 54,
            borderRadius: 8,
            paddingHorizontal: 16,
            backgroundColor: Colors.design.brand,
            justifyContent: "center",
            alignItems: "center",
            width: 160,
          }}
        >
          <Text
            style={{
              fontSize: Typography.buttonText,
              fontFamily: Fonts.Inter_700Bold,
              color: Colors.design.white,
            }}
          >
            Start
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Section = (props: { label: string; children: ReactNode }) => {
  return (
    <View
      style={[
        tw`flex flex-col w-full gap-2 border-t`,
        {
          borderColor: Colors.design.separator,
          padding: 16,
          paddingTop: 20,
        },
      ]}
    >
      <Text
        style={{
          fontSize: Typography.buttonText,
          fontFamily: Fonts.Inter_600SemiBold,
          color: Colors.design.highContrastText,
          marginBottom: 12,
        }}
      >
        {props.label}
      </Text>
      {props.children}
    </View>
  );
};

export default GigDescription;

const styles = StyleSheet.create({});
