import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import tw from "twrnc";

import { GIG_ROUTES } from '@/constants/routers';
import { getSurveyComponent } from '@/components/survey-components';
import useSingleForm from "@/hooks/useSingleForm";
import { useAuth } from "@/services/auth/hooks";

import Text from "@/components/ui/Text";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import ProgressBar from "@/components/progress-bar/ProgressBar";

import Colors from "@/constants/Colors";
import { Fonts, Typography } from "@/constants/typography";
import { axiosInstance } from '../../utils/axios';
import useDisclosure from '@/hooks/useDisclosure';
import GigSubmission from '../../components/gig-submission';
import { STRINGS } from '@/constants/strings';
import AnimatedLoader from '@/components/ui/AnimatedLoader';
import Button from '@/design-system/Button';

export type Reward = {
  type: string
  code: string
  value: number
  maxRedemptions: number
  message: string
  isRedeemed: boolean
}

const GigModals = () => {
  const { gig_id, surveyLink } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const validSurveyLink = typeof surveyLink === "string" ? surveyLink : "";
  const { form, loading, error: formLoadingError } = useSingleForm(validSurveyLink);
  const { isOpen: isRewardModelOpen, onOpen: onOpenRewardModal, onClose: onCloseRewardModal } = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const [reward, setReward] = useState<Reward>()
  const [responses, setResponses] = useState<any>({});
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});


  const sections = form?.sections || [];
  const progress = useMemo(() => ((currentSectionIndex + 1) / sections.length) * 100, [currentSectionIndex, sections.length]);

  useEffect(() => {
    if (user && gig_id) {
      fetchSurveyResponsesFromServer(gig_id as string, user._id);
    }
  }, [gig_id, user]);

  const fetchSurveyResponsesFromServer = useCallback(async (id: string, userId: string) => {
    try {
      const response = await axiosInstance.get(GIG_ROUTES.GET_SURVEY_RESPONSES(id, userId));
      setResponses(response.data);
    } catch (error) {
      console.error('Error fetching survey responses:', error);
    }
  }, []);

  const getCurrentSections = useCallback(() => {
    let currentSections = [];
    let i = currentSectionIndex;

    while (i < sections.length) {
      const section = sections[i];
      if (["short-answer", "date", "rating"].includes(section.type._id)) {
        currentSections.push(section);
        i++;
      } else {
        if (currentSections.length === 0) {
          currentSections.push(section);
        }
        break;
      }
    }

    return currentSections;
  }, [currentSectionIndex, sections]);

  const validateCurrentSection = useCallback(() => {
    const currentSections = getCurrentSections();
    const newErrors: { [key: string]: string } = {};

    currentSections.forEach((section) => {
      if (!section.required && !formData[section.id]) { // TODO: We need to fix this and make the field required available on the forms builder
        newErrors[section.id] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [getCurrentSections, formData]);

  const handleNext = useCallback(() => {
    if (validateCurrentSection()) {
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
    }
  }, [currentSectionIndex, sections, validateCurrentSection]);

  const handlePrevious = useCallback(() => {
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
  }, [currentSectionIndex, sections]);

  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    try {
      const rewardData = await axiosInstance.post(GIG_ROUTES.SUBMIT_SURVEY_RESPONSES(gig_id as string), { responses: JSON.stringify(formData) });
      const { data } = rewardData

      const { message, reward, status } = data.reward;
      const { type, value, code, isRedeemed, maxRedemptions } = reward;
      setReward({
        type,
        message,
        code,
        isRedeemed,
        maxRedemptions,
        value
      })

      onOpenRewardModal()
    } catch (err) {
      setError(STRINGS.ERROR_OCCURRED_TRY_AGAIN)
    } finally {
      setIsLoading(false)
    }
  }, [formData, gig_id, router, user?._id]);

  const updateFormData = useCallback((key: string, value: string | Date) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [key]: "" }));
  }, []);

  const renderCurrentSection = useCallback(() => {
    const currentSections = getCurrentSections();

    return currentSections.map((section) => {

      const Component = getSurveyComponent(section.type._id);
      return (
        <Component
          key={section.id}
          question={section.value}
          options={section.options}
          value={formData[section.id] || ''}
          onChange={(value) => updateFormData(section.id.toString(), value)}
          error={errors[section.id]}
          required={section.required}
        />
      );
    });
  }, [getCurrentSections, formData, errors, updateFormData]);

  if (loading) return <LoadingView />;
  if (!form) return <NoFormView />;

  const handleOnCloseRewardModal = () => {
    onCloseRewardModal()
    setReward(undefined)
    navigateToHome()
  }

  const navigateToHome = () => {
    router.replace("/(tabs)/explore")
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.design.white, }}>
      {isRewardModelOpen && reward && <GigSubmission {...reward} isOpen={isRewardModelOpen} onClose={handleOnCloseRewardModal} onReturnHome={handleOnCloseRewardModal} />}
      <View style={{ flex: 1, }}>
        <Header progress={progress} onBack={() => router.back()} />
        <ScrollView style={[tw`flex-1`, { paddingTop: 20 }]} contentContainerStyle={tw`gap-6`}>
          <KeyboardAvoidingView>
            <FormInfo name={form.name} description={form.description} />
            {renderCurrentSection()}
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
      <Footer
        currentSectionIndex={currentSectionIndex}
        totalSections={sections.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        isLoading={isLoading}
      />
    </View>
  );
};

const LoadingView = () => (
  <View style={tw`flex-1 w-full items-center justify-center bg-white`}>
    <Text>Loading...</Text>
  </View>
);

const NoFormView = () => (
  <View style={tw`flex-1 w-full items-center justify-center bg-white`}>
    <Text>No Form found</Text>
  </View>
);

const Header = ({ progress, onBack }: {
  progress: number;
  onBack: () => void
}) => (
  <View style={{
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderColor: Colors.design.separator,
    borderBottomWidth: 1,
    alignItems: "center"
  }}>
    <TouchableOpacity onPress={onBack}>
      <MaterialIcons name="arrow-back" size={24} color={Colors.design.highContrastText} />
    </TouchableOpacity>
    <ProgressBar progress={progress} />
    <View style={{
      height: 24,
      paddingHorizontal: 10,
      backgroundColor: Colors.design.accent,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center"
    }}>
      <Text style={{ fontFamily: Fonts.Inter_700Bold, color: Colors.design.white }}>32 XP</Text>
    </View>
  </View>
);

const FormInfo = ({ name, description }: {
  name: string, description: string
}) => (
  <View style={{
    gap: 8,
    paddingHorizontal: 20,
  }}>
    <Text style={{ fontSize: Typography.largeHeading, color: Colors.design.highContrastText, fontFamily: Fonts.Inter_700Bold }}>{name}</Text>
    <Text style={{ fontSize: Typography.paragraph, color: Colors.design.text }}>{description}</Text>
  </View>
);

const Footer = ({ currentSectionIndex, isLoading, onPrevious, onNext }: {
  currentSectionIndex: number,
  totalSections: number,
  onNext: () => void
  onPrevious: () => void
  isLoading: boolean
}) => (
  <View style={{
    flexDirection: 'row',
    gap: 20,
    padding: 20,
    borderTopWidth: 1,
    borderColor: Colors.design.separator,
    marginTop: 0
  }} >
    {currentSectionIndex > 0 && (
      <Button style={{ flex: 1 }} text="Previous" variant="surface" colorScheme="surface" onPress={onPrevious} />
    )}

    <Button style={{ flex: 1 }} text="Submit" variant="accent" onPress={onNext} isLoading={isLoading} disabled={isLoading} loadingIndicatorColor='dark' />
  </View>
);

export default GigModals;
