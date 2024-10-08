import React, { useEffect } from 'react';
import Modal from 'react-native-modal';
import { View, StyleSheet, Dimensions, TouchableOpacity, useAnimatedValue, StatusBar } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, withSpring } from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { interpolate, Extrapolation } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Text from './Text';
import { SF_ICONS } from '@/constants/icons';
import { Fonts, Typography } from '@/constants/typography';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface AnimatedModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    fullHeight?: boolean
}

const AnimatedModal: React.FC<AnimatedModalProps> = ({ isOpen: isVisible, onClose, children, fullHeight }) => {
    const translateY = useSharedValue(SCREEN_HEIGHT);
    const scale = useSharedValue(0.9);
    const opacity = useSharedValue(0);

    const springConfig = {
        damping: 50,
        mass: 1,
        stiffness: 300,
        overshootClamping: false,
        restSpeedThreshold: 0.1,
        restDisplacementThreshold: 0.1,
    };

    useEffect(() => {
        if (isVisible) {
            translateY.value = withSpring(0, springConfig);
            opacity.value = withSpring(1, springConfig);
        } else {
            translateY.value = withSpring(SCREEN_HEIGHT, springConfig);
            opacity.value = withSpring(0, springConfig);
        }
    }, [isVisible]);

    const animatedStyle = useAnimatedStyle(() => {
        const scale = interpolate(
            translateY.value,
            [SCREEN_HEIGHT, 0],
            [0.8, 1],
            Extrapolation.CLAMP
        );

        return {
            transform: [
                { translateY: translateY.value },
            ],
            opacity: opacity.value,
        };
    });

    const backdropStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                opacity.value,
                [0, 1],
                [0, 0.5],
                Extrapolation.CLAMP
            ),
        };
    });

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            onBackButtonPress={onClose}
            style={[styles.modal, fullHeight && styles.fullHeightModal]}
            backdropOpacity={0.5}
            animationIn="fadeIn"
            animationOut="fadeOut"
            statusBarTranslucent={fullHeight}
        >

            <Animated.View style={[styles.backdrop, backdropStyle]} />


            <Animated.View style={[styles.contentContainer, fullHeight ? { flex: 1, maxHeight: SCREEN_HEIGHT - 8 } : {}, animatedStyle]}>
                <View style={{ flexDirection: "row", justifyContent: "flex-end", marginBottom: 32 }}>
                    <TouchableOpacity onPress={onClose} style={{ borderRadius: 20, }}>
                        <Text style={{ fontSize: Typography.largeHeading, fontFamily: Fonts.Inter_700Bold, color: Colors.design.mutedText }}>
                            {SF_ICONS.x}
                        </Text>
                    </TouchableOpacity>
                </View>
                {children}
            </Animated.View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        margin: 0,
        justifyContent: 'flex-end',
        zIndex: 2000,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'black',
    },
    fullHeightModal: {
        margin: 0,
        justifyContent: 'flex-end',
    },
    contentContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: SCREEN_HEIGHT,
        overflow: "hidden"
    },
});

export default AnimatedModal;
