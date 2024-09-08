import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { BottomSheetBackdropProps, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import Animated, { interpolate, Extrapolate, useAnimatedStyle } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import styled from 'styled-components/native';
import { Fonts, Typography } from '@/constants/typography';

interface CXBottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    snapPoints?: string[];
}

const CustomBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
    const containerAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            animatedIndex.value,
            [0, 1],
            [0, 1],
            Extrapolate.CLAMP
        ),
    }));

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

const CXBottomSheet: React.FC<CXBottomSheetProps> = ({ isOpen, onClose, children, title, snapPoints: _snapPoints }) => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => _snapPoints ?? ['100%'], [_snapPoints]);

    const handleSheetChanges = useCallback((index: number) => {
        if (index === -1) {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            bottomSheetModalRef.current?.present();
        } else {
            bottomSheetModalRef.current?.dismiss();
        }
    }, [isOpen]);

    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            backdropComponent={CustomBackdrop}
            enableDynamicSizing={true}
            animateOnMount={true}
            detached
        >
            <BottomSheetView style={{ marginVertical: 10, backgroundColor: Colors.design.surface, zIndex: 1000 }}>
                {title && <CXModalTitle>{title}</CXModalTitle>}
                {children}
            </BottomSheetView>
        </BottomSheetModal>
    );
};

const CXModalTitle = styled.Text`
    font-family: ${Fonts.Inter_700Bold};
    font-size: ${Typography.paragraph}px;
    color: ${Colors.design.highContrastText};
    line-height: ${Typography.paragraph * 1.2}px;
    text-align: center;
`;

export default CXBottomSheet;
