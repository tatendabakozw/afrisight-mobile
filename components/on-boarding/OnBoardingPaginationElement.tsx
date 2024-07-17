import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React, { useCallback } from "react";
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";

type Props = {
  length: number;
  x: Animated.SharedValue<number>;
};

const PaginationElement = ({ length, x }: Props) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const PaginationComponent = useCallback(({ index }: { index: number }) => {
    const inputRange = [
      (index - 1) * SCREEN_WIDTH,
      index * SCREEN_WIDTH,
      (index + 1) * SCREEN_WIDTH,
    ];
    const itemRnStyle = useAnimatedStyle(() => {
      const width = interpolate(
        x.value,
        inputRange,
        [10, 35, 10],
        Extrapolate.CLAMP
      );

      const bgColor = interpolateColor(x.value, inputRange, [
        "#fff",
        "#07D1A6",
        "#fff",
      ]);

      return {
        width,
        backgroundColor: bgColor,
      };
    }, [x]);
    return <Animated.View style={[styles.itemStyle, itemRnStyle]} />;
  }, []);

  return (
    <View style={styles.container}>
      {Array.from({ length }).map((_, index) => {
        return <PaginationComponent index={index} key={index} />;
      })}
    </View>
  );
};

export default PaginationElement;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  itemStyle: {
    width: 35,
    height: 10,
    borderRadius: 5,

    marginHorizontal: 5,
  },
});
