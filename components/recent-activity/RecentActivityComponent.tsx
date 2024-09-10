import { SavedSurvey, useSavedSurveys } from "@/contexts/SavedSurveysContext";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Text from "../ui/Text";
import { Fonts, Typography } from "@/constants/typography";
import Colors from "@/constants/Colors";
import Row from "@/design-system/Row";
import IconText from "@/design-system/Text/IconText";
import { SF_ICONS } from "@/constants/icons";
import { useMemo } from "react";

type RootStackParamList = {
  GigDetails: {
    screen: 'GigDescriptionScreen' | 'GigModalScreen';
    params: { gig_id: string };
  };
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const MySurvey = (props: SavedSurvey) => {
  const { isSaved } = useSavedSurveys()
  const navigation = useNavigation<NavigationProp>();
  const isSurveySaved = useMemo(() => isSaved(props._id), [isSaved, props._id])

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('GigDetails', {
          screen: 'GigDescriptionScreen',
          params: { gig_id: props._id }
        })
      }
      style={{
        marginBottom: 20,
        paddingHorizontal: 20,
        opacity: props.type === "completed" ? 0.5 : 1
      }}
    >
      <View style={styles.textContainer}>
        <View style={{ alignItems: "center", gap: 20, flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.name}>
            {props.name}
          </Text>
          <IconText style={{ ...styles.name, color: props.type === "saved" ? Colors.design.redText : Colors.design.greenText, fontSize: Typography.heading, lineHeight: Typography.heading * 1.5, flexShrink: 0 }}>
            {props.type === "completed" && SF_ICONS.checkmark_filled}
          </IconText>
        </View>
        <Text numberOfLines={2} style={styles.description}>
          {props.description}
        </Text>
      </View>
      <Row>
        <Text style={styles.dollarRewardValue}>
          US${props.dollarRewardValue}
        </Text>

      </Row>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    marginBottom: 10,
  },
  name: {
    fontFamily: Fonts.Inter_600SemiBold,
    fontSize: Typography.body,
    color: Colors.design.highContrastText,
    lineHeight: Typography.body * 1.5,
    flexShrink: 1
  },
  description: {
    fontFamily: Fonts.Inter_500Medium,
    fontSize: Typography.base,
    color: Colors.design.text,
    lineHeight: Typography.body * 1.2
  },
  dollarRewardValue: {
    fontFamily: Fonts.Inter_600SemiBold,
    fontSize: Typography.body,
    color: Colors.design.highContrastText,
    lineHeight: Typography.body * 1.2
  },
  rewardType: {
    fontFamily: Fonts.Inter_600SemiBold,
    fontSize: Typography.body,
    color: Colors.design.text,
    lineHeight: Typography.body * 1.2,
    textTransform: "capitalize"
  }
})

export default MySurvey;

