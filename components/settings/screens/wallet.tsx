import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SettingsStackParamList } from "../SettingsNavigator";
import { View } from "react-native";
import Text from "@/components/ui/Text";

type WalletScreenProps = NativeStackScreenProps<SettingsStackParamList, "Wallet">;

const Wallet = () => {
    return (
        <View>
            <Text>Wallet</Text>
        </View>
    )
}

export default Wallet;