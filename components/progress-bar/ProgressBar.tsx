import { StyleSheet, View, Animated, Easing, Dimensions } from "react-native";
import React, { useEffect, useRef } from "react";
import tw from "twrnc";
import Colors from "@/constants/Colors";

const { width: screenWidth } = Dimensions.get("window");

type Props = {
  progress: number; // progress is now in percentage (0 to 100)
};

const ProgressBar = ({ progress }: Props) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: (progress / 100) * (screenWidth - 30), // Convert percentage to width
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [progress, animatedWidth]);

  return (
    <View style={tw`flex-1 h-2 bg-zinc-100 rounded-full`}>
      <Animated.View
        style={[
          tw`bg-[${Colors.design.accent}] h-full rounded-full`,
          { width: `${progress}%` },
        ]}
      />

    </View>
  );
};

export default ProgressBar;

