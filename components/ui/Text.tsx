import Colors from '@/constants/Colors';
import { Fonts, Typography } from '@/constants/typography';
import React from 'react';
import { Text as RNText, TextProps } from 'react-native';

export default function Text(props: TextProps) {
    return <RNText {...props} style={[{ fontFamily: Fonts.Inter_300Light, fontSize: Typography.base, color: Colors.design.text }, props.style]} />;
}
