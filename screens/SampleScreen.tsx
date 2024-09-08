import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, Button } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

function SampleScreen() {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <Button title="Open BottomSheet" onPress={handlePresentModalPress} />
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
            >
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text>BottomSheet Content</Text>
                </View>
            </BottomSheetModal>
        </View>
    );
}

export default SampleScreen;