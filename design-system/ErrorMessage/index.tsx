import Colors from "@/constants/Colors";
import { Fonts, Typography } from "@/constants/typography";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import Row from "../Row";

const styles = StyleSheet.create({
    container: {
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.design.redSurface,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        gap: 10,
    },
    text: {
        color: Colors.design.redText,
        fontFamily: Fonts.Inter_600SemiBold,
        fontSize: Typography.body
    }
})

type ErrorMessageProps = {
    message: string
    icon?: string
}

export default function ErrorMessage(props: ErrorMessageProps) {
    return (
        <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.container}>
                <Text style={styles.text}>
                    {props.message}
                </Text>
            </View>
        </Row>
    )
}