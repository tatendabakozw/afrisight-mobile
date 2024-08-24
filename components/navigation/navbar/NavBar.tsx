import React, { useState } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import tw from "twrnc";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  View,
  Platform,
} from "react-native";
import Colors from "@/constants/Colors";
import NotificationButton from "@/components/buttons/NotificationButton";
import { useUser } from "@clerk/clerk-expo";
import { Fonts, Typography } from "@/constants/typography";
import Text from "@/components/ui/Text";

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}



const NavBar = ({ navigation, back, options, route }: any) => {
  const { isLoaded, user, isSignedIn } = useUser();
  const insets = useSafeAreaInsets();
  const [searchClicked, setSearchClicked] = useState(false);
  const toggleSearch = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSearchClicked((prev) => !prev);
  };
  const title =
    options.title !== undefined ? options.title : options.route.name;

  const currentRouteName = route.name;


  return (
    <View
      style={[
        tw`${searchClicked ? `bg-white border-b border-zinc-200/50 ` : "bg-white"
          } flex flex-col px-4 gap-8`,
        {
          paddingTop: insets.top + 16,
        },
      ]}
    >
      <View>
        {!searchClicked && (
          <View style={{ marginBottom: 20 }}>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
                <TouchableOpacity style={{ height: 32, width: 32, borderRadius: 20, backgroundColor: Colors.design.brand, justifyContent: "center", alignItems: "center" }}>
                  <Text style={{ color: Colors.design.white, fontSize: Typography.subheading, fontFamily: Fonts.Inter_700Bold }}>K</Text>

                </TouchableOpacity>
                <Text style={{ fontSize: Typography.heading, fontFamily: "Inter_600SemiBold", color: Colors.design.highContrastText }}>
                  {title}
                </Text>
              </View>
              <View style={{ flexDirection: "row", gap: 12, justifyContent: "flex-end", alignItems: "center" }}>

                <TouchableOpacity style={{ height: 40, width: 40, borderRadius: 20, alignItems: "center", justifyContent: "center" }}>
                  <Feather name="search" size={24} style={{ color: Colors.design.mutedText }} />
                </TouchableOpacity>



              </View>
            </View>
          </View>
        )}

      </View>


    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({});
