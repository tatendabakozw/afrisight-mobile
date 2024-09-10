import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SettingsStackParamList } from "../SettingsNavigator";
import { View } from "react-native";
import Text from "@/components/ui/Text";

type PasswordScreenProps = NativeStackScreenProps<SettingsStackParamList, "Password">;

const Password = () => {
    return (
        <View>
            <Text>Password</Text>
        </View>
    )
}

export default Password;