import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SettingsStackParamList } from "../SettingsNavigator";
import { View } from "react-native";
import Text from "@/components/ui/Text";

type LanguageScreenProps = NativeStackScreenProps<SettingsStackParamList, "Language">;

const Language = () => {
    return (
        <View>
            <Text>Language</Text>
        </View>
    )
}

export default Language;