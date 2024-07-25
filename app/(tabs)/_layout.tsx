import React, { ReactNode } from "react";
import { Tabs } from "expo-router";
import { Platform, Text } from "react-native";
import Colors from "@/constants/Colors";
import {
  HomeIconOutline,
  HomeIconSolid,
} from "@/assets/svgs/nav-icons/HomeIcon";
import {
  GigsIconOutline,
  GigsIconSolid,
} from "@/assets/svgs/nav-icons/GigsIcon";
import {
  StatusIconOutline,
  StatusIconSolid,
} from "@/assets/svgs/nav-icons/StatusIcon";
import {
  WalletIconOutline,
  WalletIconSolid,
} from "@/assets/svgs/nav-icons/WalletIcon";
import { SettingsIconOutline } from "@/assets/svgs/nav-icons/SettingsIcon";
import NavBar from "@/components/navigation/navbar/NavBar";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

interface IconProps {
  children?: ReactNode;
}

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon({ children }: IconProps) {
  return children;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let imageName;

          switch (route.name) {
            case "index":
              imageName = focused ? <HomeIconSolid /> : <HomeIconOutline />;
              break;
            case "gigs":
              imageName = focused ? <GigsIconSolid /> : <GigsIconOutline />;
              break;
            case "status":
              imageName = focused ? <StatusIconSolid /> : <StatusIconOutline />;
              break;
            case "wallet":
              imageName = focused ? <WalletIconSolid /> : <WalletIconOutline />;
              break;
            case "settings":
              imageName = focused ? <HomeIconSolid /> : <SettingsIconOutline />;
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
            case "index":
              label = "Home";
              break;
            case "gigs":
              label = "Gigs";
              break;
            case "status":
              label = "Status";
              break;
            case "wallet":
              label = "Wallet";
              break;
            case "settings":
              label = "Settings";
              break;
            default:
              label = "Home";
              break;
          }

          return (
            <Text
              style={{
                fontSize: 13,
                paddingBottom: 10,
                color: focused ? Colors.light.primary : "#6E6D7A",
                fontWeight: focused ? "bold" : "normal",
              }}
            >
              {label}
            </Text>
          );
        },
        tabBarActiveTintColor: Colors.light.primary,
        tabBarInactiveTintColor: "#94a3b8",

        headerShown: useClientOnlyValue(false, true),
        header: (props) => <NavBar {...props} route={route} />,
        tabBarStyle: {
          paddingVertical: Platform.OS === "ios" ? 15 : 10,
          height: 70,
          backgroundColor: "#fff",
          borderTopWidth: 0,
          borderColor: "#f4f4f5",
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 1, height: -2 },
          shadowOpacity: 0.5,
          shadowRadius: 10,
        },
        tabBarShowLabel: true,
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="gigs" options={{ title: "Gigs" }} />
      <Tabs.Screen name="status" options={{ title: "Status" }} />
      <Tabs.Screen
        name="wallet"
        options={{ title: "Wallet", headerShown: false }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          title: "Settings",
        }}
      />
    </Tabs>
  );
}
