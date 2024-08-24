import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { Fragment, useState } from "react";
import tw from "twrnc";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import GigDescriptionHeader from "@/components/navigation/headers/GigDescriptionHeader";
import { useLocalSearchParams } from "expo-router";
import FilePicker from "@/components/survey-components/FilePicker";
import Paragraph from "@/components/survey-components/Paragraph";
import ShortAnswer from "@/components/survey-components/ShortAnswer";
import DatePicker from "@/components/survey-components/DatePicker";
import Option from "@/components/survey-components/Option";
import InfoArea from "@/components/survey-components/InfoArea";
import useSingleForm from "@/hooks/useSingleForm";
import { SectionType } from "@/utils/types";

const ITEMS_PER_PAGE = 3;

const GigModals = () => {
  const insets = useSafeAreaInsets();
  const { gig_id, surveyLink } = useLocalSearchParams();

  console.log("surveyLink", surveyLink);

  // Check if surveyLink is undefined or an array and handle accordingly
  const validSurveyLink =
    typeof surveyLink === "string" ? surveyLink : undefined;

  const { form, loading, error } = useSingleForm(validSurveyLink || "");

  const [currentPage, setCurrentPage] = useState(1);

  if (loading) {
    return (
      <View style={tw`flex-1 w-full items-center justify-center bg-white`}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`flex-1 w-full items-center justify-center bg-white`}>
        <Text>Error: {error}</Text>
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

  console.log("form from firebase ", form?.form?.sections);

  const totalSections = form.form.sections.length;
  const totalPages = Math.ceil(totalSections / ITEMS_PER_PAGE);

  const showInputArea = (section: SectionType) => {
    switch (section.type._id) {
      case "short-answer":
        return <ShortAnswer question={section.value} />;
      case "date":
        return <DatePicker question={section.value} />;
      case "multiple-choice":
        return <Option options={section.options} question={section.value} />;
      case "text-area":
        return <InfoArea />;
      case "paragraph":
        return <Paragraph question={section.value} />;
      case "file-upload":
        return <FilePicker />;
      default:
        return <ShortAnswer question={section.value} />;
    }
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentSections = form.form.sections.slice(startIndex, endIndex);

  return (
    <View
      style={[
        tw`flex-1 bg-zinc-50`,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      <View style={tw`px-4`}>
        <GigDescriptionHeader />
      </View>
      <ScrollView
        contentContainerStyle={[
          tw`items-center gap-4 pb-4 p-4`,
          { paddingTop: insets.top },
        ]}
      >
        <View style={tw`flex-col gap-6 w-full`}>
          {currentSections.map((item: SectionType, index: number) => (
            <View key={item.id}>
              <Fragment>{showInputArea(item)}</Fragment>
              {/* Add a border after each section except the last one */}
              {index < currentSections.length - 1 && (
                <View style={tw`border-b border-zinc-300/50 my-6`} />
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      <View
        style={tw`flex-row justify-between w-full p-4 border-t border-zinc-300/50`}
      >
        {currentPage > 1 && (
          <PrimaryButton
            onPress={() => setCurrentPage(currentPage - 1)}
            text="Previous"
          />
        )}
        {currentPage < totalPages && (
          <PrimaryButton
            onPress={() => setCurrentPage(currentPage + 1)}
            text="Next"
          />
        )}
      </View>
    </View>
  );
};

export default GigModals;

const styles = StyleSheet.create({});
