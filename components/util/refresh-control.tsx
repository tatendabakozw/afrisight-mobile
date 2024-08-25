import React from 'react';
import { RefreshControl } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const AnimatedRefreshControl = ({ refreshing, onRefresh }: {
    refreshing: boolean;
    onRefresh: () => void;
}) => {
    const rotation = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${rotation.value}deg` }],
        };
    });

    const handleRefresh = () => {
        rotation.value = withSpring(rotation.value + 360);
        onRefresh();
    };

    return (
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />

    );
};

export default AnimatedRefreshControl;
