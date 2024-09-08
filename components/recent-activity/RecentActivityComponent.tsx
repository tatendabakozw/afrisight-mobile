import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";

type RootStackParamList = {
  GigDetails: {
    screen: 'GigDescriptionScreen' | 'GigModalScreen';
    params: { gig_id: string };
  };
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const RecentActivityComponent = (props) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('GigDetails', {
          screen: 'GigDescriptionScreen',
          params: { gig_id: props._id }
        })
      }
    // ... rest of the component
    >
      {/* ... */}
    </TouchableOpacity>
  );
};

export default RecentActivityComponent;

