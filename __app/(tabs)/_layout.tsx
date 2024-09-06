import { ReactNode } from "react";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import Colors from "@/constants/Colors";
import { HomeIconSolid } from "@/assets/svgs/nav-icons/HomeIcon";
import NavBar from "@/components/navigation/navbar/NavBar";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import Text from "@/components/ui/Text";
import { Fonts, Typography } from "@/constants/typography";
import { AuthGuard } from "@/services/auth/AuthGuard";
import { Ionicons } from "@expo/vector-icons";
import { ScrollProvider } from "@/contexts/ScrollContext";
import styled from "styled-components/native";
import { SF_ICONS } from "@/constants/icons";

interface IconProps {
  children?: ReactNode;
}

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon({ children }: IconProps) {
  return children;
}

export default function TabLayout() {
  return (
    <ScrollProvider>
      <AuthGuard>
        <Tabs
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              let imageName;
              const color = focused ? Colors.design.highContrastText : Colors.design.mutedText;
              switch (route.name) {
                case "explore":
                  imageName = (
                    <IconText style={{ color }}>
                      {SF_ICONS.cards_stack}
                    </IconText>
                  );
                  break;
                case "my-gigs":
                  imageName = (
                    <IconText style={{ color }}>
                      {SF_ICONS.doc_text}
                    </IconText>
                  );
                  break;
                case "store":
                  imageName = imageName = (
                    <IconText style={{ color }}>
                      {SF_ICONS.gift_filled}
                    </IconText>
                  );
                  break;

                case "profile":
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

              return <TabBarIcon children={imageName} />;
            },
            tabBarLabel: ({ focused }) => {
              let label;
              switch (route.name) {
                case "explore":
                  label = "Explore";
                  break;
                case "my-gigs":
                  label = "My Gigs";
                  break;
                case "store":
                  label = "Gift Shop";
                  break;
                case "profile":
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
          })}
        >
          <Tabs.Screen name="explore" options={{ title: "Explore" }} />
          <Tabs.Screen name="my-gigs" options={{ title: "My Gigs" }} />
          <Tabs.Screen name="store" options={{ title: "Store", }} />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
            }}
          />
        </Tabs>
      </AuthGuard>
    </ScrollProvider>
  );
}

const IconText = styled.Text`
  font-family: ${Fonts.Inter_600SemiBold};
  font-size: ${Typography.paragraph * 1.2}px;
  line-height: ${Typography.paragraph * 1.5}px;
  color: ${Colors.design.text};
`;