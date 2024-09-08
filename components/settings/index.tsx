import { StyleSheet, View } from "react-native"
import SettingsItem from "../settings-components/SettingsItem"
import {
    BottomSheetModal,
    BottomSheetView
} from '@gorhom/bottom-sheet'
import { useCallback, useEffect, useMemo, useRef } from "react"
import Colors from "@/constants/Colors"
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
} from "react-native-reanimated"
import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet"
import { useStackModalHeight } from "@/design-system/Modal/utils"
import { ModalStackWrapper } from "@/design-system/Modal/ModalStackWrapper"

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

const SETTINGS_MODAL_HEIGHT = 240
const SettingsModal = () => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const snapPoints = useMemo(() => ['40%'], []);

    useStackModalHeight(SETTINGS_MODAL_HEIGHT)

    return (
        <ModalStackWrapper>
            <SettingsItem
                icon_name={require("@/assets/images/imports/wallet-icon.png")}
                heading="Wallet Settings"
                description="Manage Your wallet"
                location=""
            />
            <SettingsItem
                icon_name={require("@/assets/images/imports/notification-icon.png")}
                heading="Notifications"
                description="Manage your notifications"
                location=""
            />
            <SettingsItem
                icon_name={require("@/assets/images/imports/language-icon.png")}
                heading="Language Settings"
                description="Change Language here"
                location=""
            />
            <SettingsItem
                icon_name={require("@/assets/images/imports/passkey-icon.png")}
                heading="Password Settings"
                description="Manage your password"
                location=""
            />
        </ModalStackWrapper>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
});

export default SettingsModal;