import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SettingsStackParamList } from "../SettingsNavigator";
import { View } from "react-native";
import Text from "@/components/ui/Text";

type NotificationsScreenProps = NativeStackScreenProps<SettingsStackParamList, "Notifications">;

const Notifications = () => {
    return (
        <View>
            <Text>Notifications</Text>
        </View>
    )
}

export default Notifications;