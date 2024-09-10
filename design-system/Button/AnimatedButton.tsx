import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface AnimatedButtonProps {
    initialText: string;
    finalText: string;
    onPress: () => void;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ initialText, finalText, onPress }) => {
    const progress = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: 1 - progress.value,
    }));

    const handlePress = () => {
        progress.value = withTiming(1, { duration: 300 }, () => {
            progress.value = withTiming(0, { duration: 300 });
        });
        onPress();
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <Animated.Text style={animatedStyle}>{initialText}</Animated.Text>
            <Animated.Text style={[animatedStyle, { position: 'absolute', opacity: progress }]}>
                {finalText}
            </Animated.Text>
        </TouchableOpacity>
    );
};

export default AnimatedButton;