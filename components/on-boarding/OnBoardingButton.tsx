import {
  ImageURISource,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback } from "react";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { router } from "expo-router";

type Props = {
  currentIndex: Animated.SharedValue<number>;
  length: number;
  flatListRef: any;
};
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const OnBoardingButton = ({ currentIndex, length, flatListRef }: Props) => {
  const rnBtnStyle = useAnimatedStyle(() => {
    return {
      width:
        currentIndex.value === length - 1 ? withSpring(140) : withSpring(60),
      height: 60,
    };
  }, [currentIndex, length]);

  const rnTextStyle = useAnimatedStyle(() => {
    return {
      opacity:
        currentIndex.value === length - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX:
            currentIndex.value === length - 1 ? withTiming(0) : withTiming(100),
        },
      ],
    };
  }, [currentIndex, length]);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        currentIndex.value !== length - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX:
            currentIndex.value !== length - 1 ? withTiming(0) : withTiming(100),
        },
      ],
    };
  }, [currentIndex, length]);

  const onPress = useCallback(() => {
    if (currentIndex.value === length - 1) {
      router.push("/(tabs)");
      return;
    } else {
      flatListRef?.current?.scrollToIndex({
        index: currentIndex.value + 1,
      });
    }
  }, []);
  return (
    <AnimatedPressable style={[styles.container, rnBtnStyle]} onPress={onPress}>
      <Animated.Text style={[styles.textStyle, rnTextStyle]}>
        Get Started
      </Animated.Text>
      <Animated.View style={[styles.imageStyle, imageAnimatedStyle]}>
        <AntDesign name="arrowright" size={24} color={Colors.light.primary} />
      </Animated.View>
    </AnimatedPressable>
  );
};

export default OnBoardingButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 100,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  textStyle: {
    color: Colors.light.primary,
    position: "absolute",
    fontWeight: "600",
    fontSize: 16,
  },
  imageStyle: {
    width: 24,
    height: 24,
    position: "absolute",
  },
});
