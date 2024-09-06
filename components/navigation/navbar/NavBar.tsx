import React, { useEffect, useRef } from "react";
import { Animated, ImageBackground, Image, TouchableOpacity } from "react-native";
import tw from "twrnc";
import Colors from "@/constants/Colors";
import { Fonts, Typography } from "@/constants/typography";
import Text from "@/components/ui/Text";
import { useScroll } from "@/contexts/ScrollContext";
import Row from "@/design-system/Row";
import { SF_ICONS } from "@/constants/icons";
import Button from "@/design-system/Button";
import useDisclosure from "@/hooks/useDisclosure";
import SettingsModal from "@/components/settings";
import { ProfileModal, ProfileModalStack } from "@/components/profile-modal";
import MoneyRewardsModal from "@/components/money-rewards-modal";
import ProfileManagerIndex from "@/components/profile-modal/ProfileManager";

const NAVBAR_HEIGHT = 72; // Adjust this value based on your navbar's height

const NavBar = ({ navigation, back, options, route }: any) => {
  const { scrollY } = useScroll();
  const title = options.title !== undefined ? options.title : options.route.name;

  const { isOpen: isProfileModalOpen, onOpen: onProfileModalOpen, onClose: onProfileModalClose } = useDisclosure()
  const { isOpen: isSettingsModalOpen, onOpen: onSettingsModalOpen, onClose: onSettingsModalClose } = useDisclosure()
  const { isOpen: isMoneyRewardsModalOpen, onOpen: onMoneyRewardsModalOpen, onClose: onMoneyRewardsModalClose } = useDisclosure()
  const animatedValue = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const isScrollingUp = useRef(true);

  useEffect(() => {
    const listenerId = scrollY.addListener(({ value }) => {
      if (value < lastScrollY.current && !isScrollingUp.current) {
        // Started scrolling up
        isScrollingUp.current = true;
        Animated.spring(animatedValue, {
          toValue: 0,
          useNativeDriver: true,
          mass: 1,
          damping: 40,
          stiffness: 300,
        }).start();
      } else if (value > lastScrollY.current && isScrollingUp.current) {
        // Started scrolling down
        isScrollingUp.current = false;
        Animated.spring(animatedValue, {
          toValue: 1,
          useNativeDriver: true,
          mass: 1,
          damping: 40,
          stiffness: 300,
        }).start();
      }
      lastScrollY.current = value;
    });

    return () => {
      scrollY.removeListener(listenerId);
    };
  }, [scrollY, animatedValue]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, isScrollingUp.current ? -NAVBAR_HEIGHT : 0],
  });


  return (
    <Animated.View
      style={[
        tw`bg-white`,
        {
          transform: [{ translateY }],
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          paddingHorizontal: 20,
          paddingVertical: 10,

        },
      ]}
    >
      <ProfileModalStack isOpen={isProfileModalOpen} onClose={onProfileModalClose} />
      <SettingsModal isOpen={isSettingsModalOpen} onClose={onSettingsModalClose} />
      <MoneyRewardsModal isOpen={isMoneyRewardsModalOpen} onClose={onMoneyRewardsModalClose} />
      <Row style={tw`gap-8`}>
        <TouchableOpacity style={{ flex: 1, flexDirection: "row" }} onPress={onProfileModalOpen}>
          <ImageBackground
            style={tw`flex flex-row items-center justify-center h-[40px] w-[40px] rounded-full bg-[${Colors.light.primary}]`}
            source={require("@/assets/images/backgrounds/background-night-stars.png")}
            imageStyle={{ borderRadius: 32 }}
          >
            <Text style={tw`text-4xl font-extrabold text-white`}></Text>
          </ImageBackground>
        </TouchableOpacity>

        <Row style={{ gap: 10 }}>
          <Button text={SF_ICONS.settings_filled} size="icon" onPress={onSettingsModalOpen} />
          <TouchableOpacity onPress={onMoneyRewardsModalOpen} style={{ flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 4, paddingRight: 20, paddingVertical: 6, borderRadius: 20, backgroundColor: Colors.design.surfaceOnSurface }}>
            <Image source={require("@/assets/images/imports/dollar-icon.png")} style={{ width: 32, height: 32 }} />
            <Text style={{ fontSize: Typography.paragraph, fontFamily: Fonts.Inter_700Bold, color: Colors.design.highContrastText }}>
              $3.20
            </Text>
          </TouchableOpacity>
        </Row>
      </Row>
    </Animated.View>
  );
};





export default NavBar;

