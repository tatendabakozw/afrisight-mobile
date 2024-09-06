import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import Modal from 'react-native-modal';
import { StyleSheet, Dimensions, StatusBar, TouchableWithoutFeedback } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, Layout, FadeIn, FadeOut, Extrapolate } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { interpolate, Extrapolation } from 'react-native-reanimated';
import styled from 'styled-components/native';
import { Fonts, Typography } from '@/constants/typography';
import { BottomSheetBackdropProps, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface AnimatedModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    fullHeight?: boolean
    title?: string
}


const CustomBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
    // animated variables
    const containerAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            animatedIndex.value,
            [0, 1],
            [0, 1],
            Extrapolate.CLAMP
        ),
    }));

    // styles
    const containerStyle = useMemo(
        () => [
            style,
            {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            containerAnimatedStyle,
        ],
        [style, containerAnimatedStyle]
    );

    return <Animated.View style={containerStyle} />;
};


const CXMappersModal: React.FC<AnimatedModalProps> = ({ isOpen: isVisible, onClose, children, fullHeight, title }) => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const snapPoints = useMemo(() => ['25%', '50%'], []);

    useEffect(() => {
        if (isVisible) {
            handlePresentModalPress()
        } else {
            handleClose()
        }
    }, [isVisible])

    const handleClose = useCallback(() => {
        bottomSheetModalRef.current?.close()
    }, [])

    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            backdropComponent={CustomBackdrop}
            enableDynamicSizing={true}
            animateOnMount={true}
        >
            <BottomSheetView style={{ gap: 48, marginTop: 20, backgroundColor: Colors.design.surface, zIndex: 1000, }}>
                {title && <CXModalTitle>{title ?? "Modal title"}</CXModalTitle>}
                {children}
            </BottomSheetView>
        </BottomSheetModal>
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
        opacity: 0.3
    },
    fullHeightModal: {
        margin: 0,
        justifyContent: 'flex-end',
    },
    contentContainer: {
        backgroundColor: 'white',
        padding: 20,
        paddingTop: 10,
        maxHeight: SCREEN_HEIGHT,
        overflow: "hidden",
        borderRadius: 20,
    },
});

const CXModalHandle = styled.View`
    height: 6px;
    width: 48px;
    border-radius: 10px;
    background-color: ${Colors.design.highContrastBorder};
    margin-bottom: 16px;
    align-self: center;
`

const CXModalTitle = styled.Text`
    font-family: ${Fonts.Inter_700Bold};
    font-size: ${Typography.paragraph}px;
    color: ${Colors.design.highContrastText};
    line-height: ${Typography.paragraph * 1.2}px;
    text-align: center;
`

export default CXMappersModal;
