import 'reflect-metadata';
import React from 'react';
import { useFonts, Inter_300Light, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import RootNavigator from './screens/navigation/RootNavigator';

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [fontsLoaded] = useFonts({
        SpaceMono: require("./assets/fonts/OpenSans-VariableFont_wdth,wght.ttf"),
        Inter_300Light,
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold,
        SF_Pro_Rounded_Regular: require("./assets/fonts/SF-Pro-Rounded-Regular.otf"),
        SF_Pro_Rounded_Medium: require("./assets/fonts/SF-Pro-Rounded-Medium.otf"),
        SF_Pro_Rounded_Bold: require("./assets/fonts/SF-Pro-Rounded-Heavy.otf"),
        SF_Pro_Rounded_Semibold: require("./assets/fonts/SF-Pro-Rounded-Bold.otf"),
    });

    React.useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return <RootNavigator />;
}