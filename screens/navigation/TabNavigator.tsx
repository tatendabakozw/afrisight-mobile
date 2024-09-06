import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthGuard } from '@/services/auth/AuthGuard';
import { ExploreScreen, GiftShopScreen, MyGigsScreen } from '@/screens/tabs';
import Text from '@/components/ui/Text';
import { Fonts, Typography } from '@/constants/typography';
import Colors from '@/constants/Colors';
import { HomeIconSolid } from '@/assets/svgs/nav-icons/HomeIcon';
import IconText from '@/design-system/Text/IconText';
import { SF_ICONS } from '@/constants/icons';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import NavBar from '@/components/navigation/navbar/NavBar';
import { ScrollProvider } from '@/contexts/ScrollContext';
import LeaderboardScreen from '../tabs/profile';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
// Import your tab screens here

const Tab = createBottomTabNavigator();

function TabNavigator() {
    return (
        <AuthGuard>
            <BottomSheetModalProvider>
                <ScrollProvider>
                    <Tab.Navigator screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused }) => {
                            let imageName;
                            const color = focused ? Colors.design.highContrastText : Colors.design.mutedText;
                            switch (route.name) {
                                case "ExploreScreen":
                                    imageName = (
                                        <IconText style={{ color }}>
                                            {SF_ICONS.cards_stack}
                                        </IconText>
                                    );
                                    break;
                                case "MyGigsScreen":
                                    imageName = (
                                        <IconText style={{ color }}>
                                            {SF_ICONS.doc_text}
                                        </IconText>
                                    );
                                    break;
                                case "GiftShopScreen":
                                    imageName = imageName = (
                                        <IconText style={{ color }}>
                                            {SF_ICONS.gift_filled}
                                        </IconText>
                                    );
                                    break;

                                case "LeaderboardScreen":
                                    imageName = (
                                        <IconText style={{ color }}>
                                            {SF_ICONS.trophy_filled}
                                        </IconText>
                                    );
                                    break;
                                default:
                                    imageName = <HomeIconSolid />;
                                    break;
                            }

                            return imageName;
                        },
                        tabBarLabel: ({ focused }) => {
                            let label;
                            switch (route.name) {
                                case "ExploreScreen":
                                    label = "Explore";
                                    break;
                                case "MyGigsScreen":
                                    label = "My Gigs";
                                    break;
                                case "GiftShopScreen":
                                    label = "Gift Shop";
                                    break;
                                case "LeaderboardScreen":
                                    label = "Leaderboard";
                                    break;
                                default:
                                    label = "Home";
                                    break;
                            }

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
                        header: (props) => <NavBar {...props} route={route} />,
                        tabBarStyle: {
                            backgroundColor: Colors.design.white,
                            height: 64,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingVertical: 8
                        },
                        tabBarShowLabel: true,
                    })}>
                        <Tab.Screen component={ExploreScreen} name="ExploreScreen" options={{ title: "Explore" }} />
                        <Tab.Screen component={MyGigsScreen} name="MyGigsScreen" options={{ title: "My Gigs" }} />
                        <Tab.Screen component={GiftShopScreen} name="GiftShopScreen" options={{ title: "Store", }} />
                        <Tab.Screen component={LeaderboardScreen} name="LeaderboardScreen" options={{ title: "Leaderboard", }} />

                    </Tab.Navigator>
                </ScrollProvider>
            </BottomSheetModalProvider>
        </AuthGuard>
    );
}

export default TabNavigator;