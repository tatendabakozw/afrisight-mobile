import Text from "@/components/ui/Text";
import TextInput from "@/components/ui/TextInput";
import Colors from "@/constants/Colors";
import { Fonts, Typography } from "@/constants/typography";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Styles = StyleSheet.create({
    input: {
        borderRadius: 8,
        height: 54,
        borderColor: Colors.design.highContrastBorder,
        borderWidth: 1,
        borderStyle: "solid",
        padding: 10,
        width: "100%",
        fontFamily: Fonts.Inter_400Regular
    },
    button: {
        backgroundColor: Colors.light.primary,
        borderRadius: 8,
        height: 54,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
});

export default function PasswordPage() {
    const insets = useSafeAreaInsets();
    return (
        <ScrollView
            style={{ paddingTop: insets.top, backgroundColor: Colors.design.white, paddingHorizontal: 16 }}
        >
            <Text
                style={{
                    fontSize: Typography.heading,
                    fontFamily: Fonts.Inter_700Bold,
                    marginBottom: 24,
                    color: Colors.design.highContrastText,
                }}
            >
                Enter your password
            </Text>
            <TextInput
                autoCapitalize="none"
                style={{
                    ...Styles.input,
                }}
                secureTextEntry
            />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8 }}>
                <TouchableOpacity >
                    <Text style={{ color: Colors.light.primary, fontFamily: Fonts.Inter_600SemiBold, textDecorationLine: "underline" }}>Forgot password?</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
