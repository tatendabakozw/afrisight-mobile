import { useSignUp } from "@clerk/clerk-expo";
import { ScrollView, Text, View } from "react-native";

export default function CreateProfileDetails() {
    const { isLoaded, signUp, setActive } = useSignUp()

    return (
        <ScrollView style={{ flex: 1 }}>
            <Text style={{ fontSize: 28, fontWeight: "700" }}>
                Finish signing up
            </Text>
            <View style={{ marginTop: 12, gap: 12 }}></View>
        </ScrollView>
    )
}