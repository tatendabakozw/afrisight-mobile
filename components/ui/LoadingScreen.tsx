import { StyleSheet, View } from "react-native";
import Text from "./Text";
import { Typography } from "@/constants/typography";
import Colors from "@/constants/Colors";
import AnimatedLoader from "./AnimatedLoader";

export default function LoadingScreen(props: {
    title?: string
    message?: string
}) {
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                {
                    props.title && <Text style={styles.title}>{props.title}</Text>
                }
                {
                    props.message && <Text style={styles.message}>{props.message}</Text>
                }
                <AnimatedLoader />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },
    contentContainer: {
        padding: 20,
        backgroundColor: Colors.design.white,
        borderRadius: 8,

        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    title: {
        fontSize: Typography.heading,
        marginBottom: 20,
        textAlign: "center",

    },
    message: {
        fontSize: Typography.buttonText,
        textAlign: "center",
        marginBottom: 20,

    },
})