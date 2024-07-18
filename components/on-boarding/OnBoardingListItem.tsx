import {
  View,
  useWindowDimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import React from "react";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import tw from "twrnc";
import Colors from "@/constants/Colors";

type Props = {
  item: { text: string; image: any; desc: string };
  index: number;
  x: Animated.SharedValue<number>;
};

const OnBoardingListItem = ({ item, index, x }: Props) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const rnImageStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [100, 0, 100],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0, 1, 0],
      Extrapolate.CLAMP
    );
    return {
      opacity,
      width: SCREEN_WIDTH * 1,
      height: SCREEN_WIDTH * 0.8,
      transform: [{ translateY }],
    };
  }, [index, x]);

  const rnTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [100, 0, 100],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0, 1, 0],
      Extrapolate.CLAMP
    );
    return {
      opacity,
      transform: [{ translateY }],
    };
  }, [index, x]);
  return (
    <View
      style={[
        tw`flex flex-col pt-4 px-6 `,
        styles.itemContainer,
        { width: SCREEN_WIDTH },
      ]}
    >
      <Animated.View
        style={[
          tw` w-full flex-1 items-center h-full justify-center `,
          rnImageStyle,
        ]}
      >
        {item.image}
      </Animated.View>

      <Animated.View style={tw`flex flex-col gap-2 w-full py-8`}>
        <Animated.Text
          style={[tw`text-white text-6xl font-bold max-w-xs`, rnTextStyle]}
        >
          {item.text}
        </Animated.Text>
        <Animated.Text style={tw`text-white max-w-xs text-lg`}>
          {item.desc}
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

export default React.memo(OnBoardingListItem);

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    alignItems: "center",
  },
  textItem: {
    fontWeight: "600",
    fontSize: 34,
  },
});
