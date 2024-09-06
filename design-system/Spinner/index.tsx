import React from 'react';
import { View, Image, StyleSheet, Animated, Easing } from 'react-native';
import styled from 'styled-components/native';
import Colors from '@/constants/Colors';

interface SpinnerProps {
    size?: number;
    color?: 'light' | 'dark';
}

const SpinnerContainer = styled(Animated.View)`
  justify-content: center;
  align-items: center;
`;

const SpinnerImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

export default function Spinner({ size = 40, color = 'light' }: SpinnerProps) {
    const spinValue = new Animated.Value(0);

    React.useEffect(() => {
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <SpinnerContainer style={{ transform: [{ rotate: spin }], width: size, height: size }}>
            <SpinnerImage
                source={color === 'light' ? require('@/assets/images/imports/spinner.png') : require('@/assets/images/imports/spinner-dark.png')}
                resizeMode="contain"
            />
        </SpinnerContainer>
    );
}
