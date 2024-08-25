import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Fragment, useMemo, useState } from "react";
import tw from "twrnc";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import GigDescriptionHeader from "@/components/navigation/headers/GigDescriptionHeader";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import FilePicker from "@/components/survey-components/FilePicker";
import Paragraph from "@/components/survey-components/Paragraph";
import ShortAnswer from "@/components/survey-components/ShortAnswer";
import DatePicker from "@/components/survey-components/DatePicker";
import Option from "@/components/survey-components/Option";
import InfoArea from "@/components/survey-components/InfoArea";
import useSingleForm from "@/hooks/useSingleForm";
import { SectionType } from "@/utils/types";
import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { Fonts, Typography } from "@/constants/typography";
import { getSurveyComponent } from "@/components/survey-components";
import { useRoute } from "@react-navigation/native";
import ProgressBar from "@/components/progress-bar/ProgressBar";

const ITEMS_PER_PAGE = 3;

const GigModals = () => {
  const insets = useSafeAreaInsets();
  const { gig_id, surveyLink } = useLocalSearchParams();
  const router = useRouter();
  const validSurveyLink = typeof surveyLink === "string" ? surveyLink : "";
  const { form, loading, error } = useSingleForm(validSurveyLink || "");

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const currentSection = useMemo(() => form?.form.sections[currentSectionIndex], [
    currentSectionIndex, form
  ]);

  if (loading) {
    return (
      <View style={tw`flex-1 w-full items-center justify-center bg-white`}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!form) {
    return (
      <View style={tw`flex-1 w-full items-center justify-center bg-white`}>
        <Text>No Form found</Text>
      </View>
    );
  }

  const sections = form.form.sections;
  const progress = ((currentSectionIndex + 1) / sections.length) * 100;


  const handleNext = () => {
    let nextIndex = currentSectionIndex;
    do {
      nextIndex++;
    } while (
      nextIndex < sections.length &&
      ["short-answer", "date", "rating"].includes(sections[nextIndex].type._id)
    );

    if (nextIndex < sections.length) {
      setCurrentSectionIndex(nextIndex);
    } else {
      onSubmit();
    }
  };
  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      let prevIndex = currentSectionIndex - 1;
      while (
        prevIndex > 0 &&
        ["short-answer", "date", "rating"].includes(sections[prevIndex].type._id)
      ) {
        prevIndex--;
      }
      setCurrentSectionIndex(prevIndex);
    }
  };


  const onSubmit = () => {
    console.log("Form submitted:", formData);
    router.push("/(modals)/gig-submission");
  };

  const updateFormData = (key: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const renderCurrentSection = () => {
    let currentSections = [];
    let i = currentSectionIndex;

    // Group consecutive short-answer, date, and rating sections
    while (i < sections.length) {
      const section = sections[i];
      if (["short-answer", "date", "rating"].includes(section.type._id)) {
        currentSections.push(section);
        i++;
      } else {
        break;
      }
    }

    // If no groupable sections were found, render the current section
    if (currentSections.length === 0) {
      currentSections.push(sections[currentSectionIndex]);
    }

    return (
      currentSections.map((section) => {
        const Component = getSurveyComponent(section.type._id);
        return (
          <Component
            key={section.id}
            question={section.value}
            options={section.options}
            value={formData[section.id] || ''}
            onChange={(value) => updateFormData(section.id as unknown as string, value)}
          />
        );
      })
    );
  };



  return (
    <View
      style={[
        tw`flex-1`,
        {
          paddingTop: insets.top,
          backgroundColor: Colors.design.white,
        },
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 24, paddingTop: 16, paddingRight: 16, justifyContent: 'space-between' }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            padding: 8,
            borderRadius: 20,
          }}
        >
          <Feather name="chevron-left" size={32} color={Colors.design.highContrastText} />
        </TouchableOpacity>
        <ProgressBar progress={progress} />

        <View style={{ paddingHorizontal: 8, paddingVertical: 4, backgroundColor: Colors.design.accent, alignItems: "center", justifyContent: "center", borderRadius: 8 }}>
          <Text style={{ fontFamily: Fonts.Inter_700Bold, color: Colors.design.white }}>
            32 XP
          </Text>
        </View>
      </View>

      <ScrollView style={{ flex: 1, paddingVertical: 32, }} contentContainerStyle={{ gap: 24 }}>
        <View
          style={{
            gap: 4,
            paddingBottom: 4,
            borderColor: Colors.design.separator,
            backgroundColor: Colors.design.white,
            paddingHorizontal: 16,
          }}
        >

          {form && (
            <>
              <Text
                style={{
                  fontSize: Typography.largeHeading,
                  color: Colors.design.highContrastText,
                  fontFamily: Fonts.Inter_700Bold,
                }}
              >
                {form.form.name}
              </Text>
              <Text style={{
                fontSize: Typography.buttonText,
                color: Colors.design.text,
              }}>
                {form.form.description}
              </Text>
            </>
          )}


        </View>
        {renderCurrentSection()}
      </ScrollView>
      <View
        style={[tw`flex-row justify-between w-full mb-4 gap-4`, { padding: 16, borderTopWidth: 1, borderTopColor: Colors.design.separator }]}
      >
        {currentSectionIndex > 0 && (
          <PrimaryButton onPress={handlePrevious} text="Previous" />
        )}
        <PrimaryButton
          onPress={handleNext}
          text={
            currentSectionIndex === sections.length - 1 ? "Submit" : "Next"
          }
        />
      </View>
    </View>
  );
};

export default GigModals;

const styles = StyleSheet.create({});
