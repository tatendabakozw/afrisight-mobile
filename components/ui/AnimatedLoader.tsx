import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Easing } from 'react-native-reanimated';

interface DotProps {
    delay: number;
    size: number;
    color: string;
}

const Dot = ({ delay, size, color }: DotProps) => {
    const scale = new Animated.Value(0);

    useEffect(() => {
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(scale, {
                    toValue: 1,
                    duration: 400,
                    delay,
                    easing: Easing.ease,
                    useNativeDriver: true,
                }),
                Animated.timing(scale, {
                    toValue: 0,
                    duration: 400,
                    easing: Easing.ease,
                    useNativeDriver: true,
                }),
            ])
        );
        loop.start();
        return () => loop.stop();
    }, [delay]);

    return (
        <Animated.View
            style={[
                styles.dot,
                { transform: [{ scale }], width: size, height: size, borderRadius: size / 2, backgroundColor: color },
            ]}
        />
    );
};

interface ThreeDotSpinnerProps {
    size?: number;
    color?: string;
}

const AnimatedLoader = ({ size = 10, color = '#000' }: ThreeDotSpinnerProps) => {
    return (
        <View style={[styles.container, { width: size * 6 }]}>
            <Dot delay={0} size={size} color={color} />
            <Dot delay={150} size={size} color={color} />
            <Dot delay={300} size={size} color={color} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#000',
    },
});

export default AnimatedLoader;
