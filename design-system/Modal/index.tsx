import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import Animated, {
    interpolate,
    Extrapolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    runOnJS,
    withTiming,
} from 'react-native-reanimated';
import { Dimensions, StatusBar } from 'react-native';
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
    isFullScreen?: boolean;
    height?: number;
}


const CXBottomSheet: React.FC<CXBottomSheetProps> = ({ isOpen, onClose, children, title, snapPoints: _snapPoints, isFullScreen = false, height }) => {
    const [contentHeight, setContentHeight] = useState(height ?? 400); // Default height

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => _snapPoints ?? ['50%'], [_snapPoints]);

    const animatedPosition = useSharedValue(100);
    const animatedOpacity = useSharedValue(0);
    const animatedScale = useSharedValue(0.9);
    const animatedBorderRadius = useSharedValue(32);
    const animatedMargin = useSharedValue(10);

    const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

    const handleSheetChanges = useCallback((index: number) => {
        if (index === -1) {
            runOnJS(onClose)();
        }
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            bottomSheetModalRef.current?.present();
            animatedPosition.value = withSpring(0, { damping: 15, stiffness: 120 });
            animatedOpacity.value = withSpring(1, { damping: 20, stiffness: 100 });
            animatedScale.value = withSpring(1, { damping: 15, stiffness: 150 });

            if (isFullScreen) {
                animatedBorderRadius.value = withTiming(0, { duration: 300 });
                animatedMargin.value = withTiming(0, { duration: 300 });
            }
        } else {
            animatedPosition.value = withSpring(100, { damping: 15, stiffness: 120 });
            animatedOpacity.value = withSpring(0, { damping: 20, stiffness: 100 });
            animatedScale.value = withSpring(0.9, { damping: 15, stiffness: 150 });
            animatedBorderRadius.value = withTiming(32, { duration: 300 });
            animatedMargin.value = withTiming(10, { duration: 300 });
            bottomSheetModalRef.current?.dismiss();
        }
    }, [isOpen, isFullScreen]);

    const animatedContentStyle = useAnimatedStyle(() => ({
        opacity: animatedOpacity.value,
        transform: [
            { translateY: interpolate(animatedPosition.value, [0, 100], [0, 200]) },
            { scale: animatedScale.value },
        ],
        borderRadius: animatedBorderRadius.value,
        height: isFullScreen ? screenHeight : undefined,
        width: isFullScreen ? screenWidth : undefined,
    }));

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
                containerStyle={{
                    gap: 0,

                }}
                backgroundStyle={{
                    borderRadius: 32,
                }}
                handleStyle={{
                    marginBottom: 0,
                    paddingBottom: 0
                }}
                style={{
                    overflow: 'hidden',
                    marginHorizontal: isFullScreen ? 0 : 10,


                }}
                enableDynamicSizing
                animateOnMount
                enablePanDownToClose
                detached={!isFullScreen}
                bottomInset={isFullScreen ? 0 : 16}
            >
                <BottomSheetView style={{
                    zIndex: 1000,
                    flex: 0,
                    minHeight: contentHeight,
                    borderRadius: 32,
                    overflow: 'hidden',

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
    font-size: ${Typography.body}px;
    color: ${Colors.design.highContrastText};
    line-height: ${Typography.body * 1.2}px;
    text-align: center;
`;

export default CXBottomSheet;
