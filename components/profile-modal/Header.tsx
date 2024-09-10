import Row from "@/design-system/Row"
import IconText from "@/design-system/Text/IconText"
import { TouchableOpacity, View } from "react-native"
import Text from "../ui/Text"
import Colors from "@/constants/Colors"
import { Fonts } from "@/constants/typography"
import { SF_ICONS } from "@/constants/icons"
import Button from "@/design-system/Button"

const CXBottomModalHeader = (props: any) => {

    const onPressBack = () => {
        props.navigation.goBack()
    }

    const onPressClose = () => {
        props.navigation.goBack()
    }

    return (
        <Row style={{ justifyContent: "space-between", backgroundColor: Colors.design.surface, paddingHorizontal: 10, alignItems: "center", }}>
            <IconText style={{ width: 40 }} onPress={onPressBack}>
                {SF_ICONS.chevron_left}
            </IconText>
            <Text style={{ fontSize: 20, fontFamily: Fonts.Inter_700Bold, textAlign: "center", flex: 1, color: Colors.design.highContrastText }}>
                {props.options.title}
            </Text>
            <TouchableOpacity style={{ width: 44, height: 44, alignItems: "center", justifyContent: "center", flexDirection: "row" }} onPress={onPressClose}>
                <Text style={{ fontSize: 28, lineHeight: 32, fontFamily: Fonts.Inter_700Bold, textAlign: "center", color: Colors.design.mutedText }}>
                    {SF_ICONS.x}
                </Text>
            </TouchableOpacity>

        </Row>
    )
}

export { CXBottomModalHeader as ProfileModalHeader }