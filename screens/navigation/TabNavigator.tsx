import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthGuard } from '@/services/auth/AuthGuard';
import { ExploreScreen, GiftShopScreen, MyGigsScreen } from '@/screens/tabs';
import Text from '@/components/ui/Text';
import { Fonts, Typography } from '@/constants/typography';
import Colors from '@/constants/Colors';
import IconText from '@/design-system/Text/IconText';
import { SF_ICONS } from '@/constants/icons';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import NavBar from '@/components/navigation/navbar/NavBar';
import { ScrollProvider } from '@/contexts/ScrollContext';
import LeaderboardScreen from '../tabs/leaderboard';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import GigDescriptionScreen from '../detail/gig-description';
import GigModalScreen from '../detail/gig-modal';
import { StatusBar } from 'react-native';
import { FEATURE_FLAGS, useSystemPreferences } from '@/contexts/SystemPreferencesContext';
import { useFeatureFlag } from 'posthog-react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './RootNavigator';
// Import your tab screens here

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function GigDetailStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, header: () => <NavBar /> }}>
            <Stack.Screen name="GigDescriptionScreen" component={GigDescriptionScreen} />
            <Stack.Screen name="GigModalScreen" component={GigModalScreen} />
        </Stack.Navigator>
    );
}

function ExploreStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, header: () => <NavBar /> }}>
            <Stack.Screen name="ExploreMain" component={ExploreScreen} options={{
                headerShown: true,
            }} />
            <Stack.Screen name="GigDetails" component={GigDetailStack} />
        </Stack.Navigator>
    );
}

function MyGigsStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, header: () => <NavBar /> }}>
            <Stack.Screen name="MyGigsMain" component={MyGigsScreen} options={{
                headerShown: true,
            }} />
            <Stack.Screen name="GigDetails" component={GigDetailStack} />
        </Stack.Navigator>
    );
}

const getTabBarIcon = (routeName: string) => {
    switch (routeName) {
        case "ExploreScreen":
            return SF_ICONS.cards_stack;
        case "MyGigsScreen":
            return SF_ICONS.doc_text;
        case "GiftShopScreen":
            return SF_ICONS.gift_filled;
        case "LeaderboardScreen":
            return SF_ICONS.trophy_filled;
    }
}

const getTabLabel = (routeName: string) => {
    switch (routeName) {
        case "ExploreScreen":
            return "Explore";
        case "MyGigsScreen":
            return "My Gigs";
        case "GiftShopScreen":
            return "CX Store";
        case "LeaderboardScreen":
            return "Leaderboard";
    }
}

function CoreAppNavigator() {
    const showCxStore = useFeatureFlag(FEATURE_FLAGS.CX_STORE_ENABLED)
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()
    const { preferences } = useSystemPreferences()

    useEffect(() => {
        if (!preferences.hasCompletedPostAuthOnboarding) {
            console.log("Navigating to PostAuthOnboarding")
            navigation.navigate("PostAuthOnboarding")
        }
    }, [preferences])

    console.log({ preferences })


    return (
        <SafeAreaView style={{ flex: 1 }}>

            <AuthGuard>
                <BottomSheetModalProvider>
                    <ScrollProvider>
                        <Tab.Navigator screenOptions={({ route }) => ({
                            tabBarIcon: ({ focused }) => {
                                const color = focused ? Colors.design.highContrastText : Colors.design.mutedText;
                                return (
                                    <IconText style={{ color }}>
                                        {getTabBarIcon(route.name)}
                                    </IconText>
                                );
                            },
                            tabBarLabel: ({ focused }) => {
                                const label = getTabLabel(route.name);
                                return <Text style={{
                                    fontFamily: Fonts.Inter_600SemiBold,
                                    fontSize: Typography.base,
                                    lineHeight: Typography.body * 1.5,
                                    color: focused ? Colors.design.highContrastText : Colors.design.mutedText,
                                }}>{label}</Text>;
                            },
                            tabBarActiveTintColor: Colors.design.brand,
                            tabBarInactiveTintColor: Colors.design.brand,
                            headerShown: useClientOnlyValue(false, true),
                            tabBarStyle: {
                                backgroundColor: Colors.design.white,
                                height: 64,
                                alignItems: "center",
                                justifyContent: "center",
                                paddingVertical: 8
                            },
                            tabBarShowLabel: true,
                            header: () => <NavBar />,

                        })}>
                            <Tab.Screen name="ExploreScreen" component={ExploreStack} options={{ title: "Explore", headerShown: false }} />
                            <Tab.Screen name="MyGigsScreen" component={MyGigsStack} options={{ title: "My Gigs", headerShown: false }} />
                            {showCxStore &&
                                <Tab.Screen component={GiftShopScreen} name="GiftShopScreen" options={{ title: "Store", headerShown: true, }} />
                            }
                            <Tab.Screen component={LeaderboardScreen} name="LeaderboardScreen" options={{ title: "Leaderboard", headerShown: true }} />

                        </Tab.Navigator>
                    </ScrollProvider>
                </BottomSheetModalProvider>
            </AuthGuard>
        </SafeAreaView>
    );
}

// Remove the GigsNavigator as it's no longer needed

export default CoreAppNavigator;