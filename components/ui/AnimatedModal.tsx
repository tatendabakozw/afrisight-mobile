import React, { useEffect } from 'react';
import Modal from 'react-native-modal';
import { View, StyleSheet, Dimensions, TouchableOpacity, useAnimatedValue, StatusBar } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { interpolate } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
    const insets = useSafeAreaInsets();


    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: translateY.value },
                { scale: interpolate(translateY.value, [SCREEN_HEIGHT, 0], [0.9, 1]) },
            ],
        };
    });

    useEffect(() => {
        if (isVisible) {
            translateY.value = withTiming(0, {
                duration: 300,
                easing: Easing.out(Easing.exp),
            });
            scale.value = withTiming(1, {
                duration: 300,
                easing: Easing.out(Easing.exp),
            });
        } else {
            translateY.value = withTiming(SCREEN_HEIGHT, {
                duration: 300,
                easing: Easing.in(Easing.exp),
            });
            scale.value = withTiming(0.9, {
                duration: 300,
                easing: Easing.in(Easing.exp),
            });
        }
    }, [isVisible]);


    useEffect(() => {

    }, [isVisible]);

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

            <StatusBar
                backgroundColor={'transparent'}
                barStyle="default"
                translucent={fullHeight}
            />
            <Animated.View style={[styles.contentContainer, fullHeight ? { flex: 1, maxHeight: SCREEN_HEIGHT - 8 } : {}, animatedStyle]}>
                <View style={{ flexDirection: "row", justifyContent: "flex-start", marginBottom: 32 }}>
                    <TouchableOpacity onPress={onClose} style={{ borderRadius: 20, }}>
                        <Feather name='x' size={24} />
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
    },
});

export default AnimatedModal;
