import { ImageBackground, KeyboardAvoidingView, ScrollView, View } from "react-native";
import Text from "../ui/Text";
import Row from "@/design-system/Row";
import Button from "@/design-system/Button";
import styled from "styled-components/native";
import Colors from "@/constants/Colors";
import { Fonts, Typography } from "@/constants/typography";
import { SF_ICONS } from "@/constants/icons";
import IconText from "@/design-system/Text/IconText";
import Separator from "@/design-system/Separator";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBottomSheetContext } from "@/design-system/Modal/BottomSheetContext";
import { useLayoutEffect } from "react";

const EditProfile = () => {
    const navigation = useNavigation()
    const { setHeight } = useBottomSheetContext()
    const onCancelOrGoBack = () => {
        navigation.goBack()
    }

    useLayoutEffect(() => {
        setHeight(540)
    }, [setHeight])

    return (
        <SafeAreaView>
            <ScrollView style={{ paddingTop: 0, flex: 0 }} contentContainerStyle={{ padding: 20, gap: 20, paddingTop: 0 }}>

                <View>
                    <Row style={{ justifyContent: "center", marginBottom: 10 }}>
                        <ImageBackground source={require("@/assets/images/backgrounds/background-night-stars.png")} imageStyle={{ borderRadius: 100 }} style={{ width: 100, height: 100, borderRadius: 100, backgroundColor: Colors.design.surfaceOnSurface, alignItems: "center", justifyContent: "center" }}>
                            <IconText style={{ fontSize: 28, lineHeight: 34 * 1.2, color: Colors.design.white }}>
                                {SF_ICONS.image}
                            </IconText>
                        </ImageBackground>
                    </Row>
                </View>
                <View>
                    <Separator />
                    <Row style={{ gap: 20, alignItems: "center", paddingVertical: 6 }}>
                        <Text style={{ fontFamily: Fonts.Inter_700Bold, fontSize: Typography.paragraph, color: Colors.design.highContrastText, lineHeight: Typography.paragraph * 1.5, width: 64 }}>Name</Text>
                        <KeyboardAvoidingView style={{ flex: 1 }}>
                            <Input placeholder="Add a display name" />
                        </KeyboardAvoidingView>
                    </Row>
                    <Separator />
                    <Row style={{ gap: 20, alignItems: "center", paddingVertical: 6 }}>
                        <Text style={{ fontFamily: Fonts.Inter_700Bold, fontSize: Typography.paragraph, color: Colors.design.highContrastText, lineHeight: Typography.paragraph * 1.5, width: 64 }}>Bio</Text>
                        <KeyboardAvoidingView style={{ flex: 1 }}>
                            <Input placeholder="Add a bio" />
                        </KeyboardAvoidingView>
                    </Row>
                    <Separator />
                    <Row style={{ gap: 20, alignItems: "center", paddingVertical: 6 }}>
                        <Text style={{ fontFamily: Fonts.Inter_700Bold, fontSize: Typography.paragraph, color: Colors.design.highContrastText, lineHeight: Typography.paragraph * 1.5, width: 64 }}>Phone</Text>
                        <KeyboardAvoidingView style={{ flex: 1 }}>
                            <Input placeholder="Add a phone number" />
                        </KeyboardAvoidingView>
                    </Row>
                </View>

                <View>
                    <Button leftIcon={SF_ICONS.forgot_password} text="Reset password" variant="text" colorScheme="danger" onPress={onCancelOrGoBack} />

                </View>
                <Row style={{ gap: 20 }}>
                    <Button style={{ flex: 1 }} text="Cancel" colorScheme="primary" variant="primary" onPress={onCancelOrGoBack} />
                    <Button style={{ flex: 1 }} text="Save" variant="accent" />
                </Row>
            </ScrollView>
        </SafeAreaView>
    )
}

const Input = styled.TextInput`
    border-radius: 10px;
    padding: 10px;
    padding-left: 15px;
    font-family: ${Fonts.Inter_600SemiBold};
    font-size: ${Typography.paragraph};
`

export default EditProfile;