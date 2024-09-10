import { SavedSurvey } from "@/contexts/SavedSurveysContext";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Text from "../ui/Text";
import { Fonts, Typography } from "@/constants/typography";
import Colors from "@/constants/Colors";
import Row from "@/design-system/Row";
import IconText from "@/design-system/Text/IconText";
import { SF_ICONS } from "@/constants/icons";

type RootStackParamList = {
  GigDetails: {
    screen: 'GigDescriptionScreen' | 'GigModalScreen';
    params: { gig_id: string };
  };
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const MySurvey = (props: SavedSurvey) => {
  const navigation = useNavigation<NavigationProp>();

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
        paddingHorizontal: 20
      }}
    >
      <View style={styles.textContainer}>
        <Row style={{ alignItems: "center" }}>
          <Text style={styles.name}>
            {props.name}
          </Text>
          <IconText style={{ ...styles.name, color: Colors.design.accent, fontSize: Typography.heading, lineHeight: Typography.heading * 1.5 }}>
            {SF_ICONS.checkmark_filled}
          </IconText>
        </Row>
        <Text style={styles.description}>
          {props.description}
        </Text>
      </View>
      <Row>
        <Text style={styles.dollarRewardValue}>
          US${props.dollarRewardValue}
        </Text>
        <Text style={styles.rewardType}>
          {props.rewardType}
        </Text>
      </Row>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    marginBottom: 10
  },
  name: {
    fontFamily: Fonts.Inter_600SemiBold,
    fontSize: Typography.body,
    color: Colors.design.highContrastText,
    lineHeight: Typography.body * 1.5
  },
  description: {
    fontFamily: Fonts.Inter_400Regular,
    fontSize: Typography.body,
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

