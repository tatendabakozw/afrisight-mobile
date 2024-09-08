import { useNavigation } from "@react-navigation/native";
import { useBottomSheetContext } from "./BottomSheetContext";
import { useEffect, useLayoutEffect } from "react";

export const useStackModalHeight = (height: number) => {
    const navigation = useNavigation();
    const { setHeight } = useBottomSheetContext();

    useLayoutEffect(() => {
        setHeight(height);
    }, [setHeight]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setHeight(height);
        });

        return unsubscribe;
    }, [navigation, setHeight]);

    return { setHeight };
};