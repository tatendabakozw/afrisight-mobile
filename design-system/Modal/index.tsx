import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import Animated, { interpolate, Extrapolate, useAnimatedStyle } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import styled from 'styled-components/native';
import { Fonts, Typography } from '@/constants/typography';
import { CXBottomSheetProvider } from './BottomSheetContext';

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
    const snapPoints = useMemo(() => _snapPoints ?? ['50%'], [_snapPoints]);
    const [contentHeight, setContentHeight] = useState(400); // Default height

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

    const renderBackdrop = useCallback(
        (props: BottomSheetBackdropProps) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={1}
            />
        ),
        []
    );

    const contextValue = useMemo(() => ({
        setHeight: (height: number) => setContentHeight(height),
    }), []);

    return (
        <CXBottomSheetProvider value={contextValue}>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                onChange={handleSheetChanges}
                backdropComponent={renderBackdrop}
                bottomInset={20}
                containerStyle={{
                    gap: 0,
                    padding: 0,
                    margin: 10,
                }}
                backgroundStyle={{
                    borderRadius: 32,

                }}
                style={{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.30,
                    shadowRadius: 4.65,
                    elevation: 8,
                }}
                handleStyle={{
                    marginBottom: 0
                }}
                enableDynamicSizing
                animateOnMount
                enablePanDownToClose
                detached
            >
                <BottomSheetView style={{
                    backgroundColor: Colors.design.white,
                    zIndex: 1000,
                    overflow: 'hidden',
                    borderRadius: 32,
                    flex: 0,
                    minHeight: contentHeight,
                    marginBottom: 20,


                }}>
                    <CXBottomSheetProvider value={contextValue}>
                        {children}
                    </CXBottomSheetProvider>
                </BottomSheetView>
            </BottomSheetModal>
        </CXBottomSheetProvider>
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
