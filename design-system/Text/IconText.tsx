import Colors from "@/constants/Colors";
import { Fonts, Typography } from "@/constants/typography";
import styled from "styled-components/native";

const IconText = styled.Text`
    font-family: ${Fonts.Inter_600SemiBold};
    font-size: ${Typography.paragraph}px;
    line-height: ${Typography.paragraph * 1.3}px;
    width: 28px;
    text-align: center;
    color: ${Colors.design.text};
`

export default IconText