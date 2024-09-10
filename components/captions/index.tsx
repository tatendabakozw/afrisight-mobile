import Colors from "@/constants/Colors"
import { SF_ICONS } from "@/constants/icons"
import { Fonts, Typography } from "@/constants/typography"
import styled from "styled-components/native"

const Container = styled.View`
    border-radius: 16px;
    margin-top: 16px;
    margin-bottom: 16px;
`

const CaptionText = styled.Text`
    font-family: ${Fonts.Inter_600SemiBold};
    font-size: ${Typography.body}px;
    color: ${Colors.design.mutedText};
    text-align: center;
`

export const EndOfListCaption = () => {
    return (
        <Container>
            <CaptionText>
                {SF_ICONS.checkmark_filled}{" "}
                You've reached the end of the list</CaptionText>
        </Container>
    )
}

export const EmptyStateCaption = (props: {
    message?: string
}) => {

    return (
        <Container>
            <CaptionText>
                {SF_ICONS.x}{" "}
                {props.message ?? "No results found"}
            </CaptionText>
        </Container>
    )
}