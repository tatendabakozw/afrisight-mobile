import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function Banner(props: {
    message: string;
}) {
    return (
        <View
            style={{
                width: "100%",
                padding: 16,
                flexDirection: "row",
                gap: 12,
                alignItems: "center",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 10,
                backgroundColor: "#fff",
                marginBottom: 0,
                borderRadius: 8,
                shadowColor: '#000', // Shadow color
                shadowOffset: { width: 0, height: 6 }, // Offset for the shadow
                shadowOpacity: 0.1, // Opacity of the shadow
                shadowRadius: 10, // Blur radius
                elevation: 10, // Elevation for Android
            }}
        >
            <Feather style={{ color: "#F16A50" }} size={32} name="alert-circle" />

            <Text style={{ fontWeight: "700" }}>{props.message}</Text>
        </View>
    );
}
