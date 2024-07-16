import React, { useRef, useEffect } from "react";
import { View, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import Colors from "@/constants/Colors";

const PulsingView = () => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.08,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scale]);

  return (
    <Animated.View
      style={[
        tw`bg-[${Colors.light.primary}]/15 p-8 rounded-full`,
        { transform: [{ scale }] },
      ]}
    >
      <View style={tw`bg-[${Colors.light.primary}]/15 p-8 rounded-full`}>
        <Ionicons name="mail-open" size={32} color={Colors.light.primary} />
      </View>
    </Animated.View>
  );
};

export default PulsingView;
