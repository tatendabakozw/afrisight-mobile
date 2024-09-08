import React from 'react';
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
import LeaderboardScreen from '../tabs/profile';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import GigDescriptionScreen from '../detail/gig-description';
import GigModalScreen from '../detail/gig-modal';
// Import your tab screens here

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function GigDetailStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="GigDescriptionScreen" component={GigDescriptionScreen} />
            <Stack.Screen name="GigModalScreen" component={GigModalScreen} />
        </Stack.Navigator>
    );
}

function ExploreStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ExploreMain" component={ExploreScreen} />
            <Stack.Screen name="GigDetails" component={GigDetailStack} />
        </Stack.Navigator>
    );
}

function MyGigsStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MyGigsMain" component={MyGigsScreen} />
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
    }
}

function CoreAppNavigator() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AuthGuard>
                <BottomSheetModalProvider>
                    <ScrollProvider>
                        <Tab.Navigator screenOptions={({ route }) => ({
                            header: (props) => <NavBar {...props} route={route} />,
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
                                    lineHeight: Typography.paragraph * 1.5,
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
                        })}>
                            <Tab.Screen name="ExploreScreen" component={ExploreStack} options={{ title: "Explore" }} />
                            <Tab.Screen name="MyGigsScreen" component={MyGigsStack} options={{ title: "My Gigs" }} />
                            <Tab.Screen component={GiftShopScreen} name="GiftShopScreen" options={{ title: "Store", }} />
                            <Tab.Screen component={LeaderboardScreen} name="LeaderboardScreen" options={{ title: "Leaderboard", }} />

                        </Tab.Navigator>
                    </ScrollProvider>
                </BottomSheetModalProvider>
            </AuthGuard>
        </SafeAreaView>
    );
}

// Remove the GigsNavigator as it's no longer needed

export default CoreAppNavigator;