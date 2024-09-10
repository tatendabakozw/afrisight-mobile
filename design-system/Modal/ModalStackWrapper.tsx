import Colors from "@/constants/Colors"
import { View } from "react-native"

export const ModalStackWrapper = (props: {
    children: React.ReactNode;
}) => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.design.surface, paddingHorizontal: 20, paddingVertical: 0, marginVertical: 0 }}>
            {props.children}
        </View>
    )
}