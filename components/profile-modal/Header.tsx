import Row from "@/design-system/Row"
import IconText from "@/design-system/Text/IconText"
import { View } from "react-native"
import Text from "../ui/Text"

const ProfileModalHeader = (props: any) => {
    return (
        <Row style={{ justifyContent: "space-between" }}>
            <IconText>
                {" "}
            </IconText>
            <Text style={{ fontSize: 20, fontFamily: "Inter_700Bold" }}>
                {props.title}
            </Text>
            <View />

        </Row>
    )
}

export { ProfileModalHeader }