import SettingsItem from "../settings-components/SettingsItem"
import {
    BottomSheetModal
} from '@gorhom/bottom-sheet'
import { useCallback, useMemo, useRef } from "react"
import { useStackModalHeight } from "@/design-system/Modal/utils"
import { ModalStackWrapper } from "@/design-system/Modal/ModalStackWrapper"


const SETTINGS_MODAL_HEIGHT = 240
const SettingsModal = () => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);


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


export default SettingsModal;