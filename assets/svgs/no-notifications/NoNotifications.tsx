import React, { useEffect } from "react";
import Svg, {
  SvgProps,
  Circle,
  G,
  Path,
  Defs,
  ClipPath,
} from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSpring,
} from "react-native-reanimated";

const NoNotifications = (props: SvgProps) => {
  // Create a shared value for the pulse effect
  const scale = useSharedValue(1);

  // Define the pulse animation
  useEffect(() => {
    scale.value = withRepeat(
      withSpring(1.05, { damping: 5, stiffness: 20 }), // Adjusted values for slower animation
      -1, // Repeat infinitely
      true // Alternate direction
    );
  }, [scale]);

  // Apply the animated scale to the SVG element
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <Svg width={336} height={336} fill="none" {...props}>
        <Circle
          cx={168}
          cy={168}
          r={167}
          stroke="#EFEFEF"
          strokeWidth={2}
          opacity={0.5}
        />
        <Circle
          cx={168}
          cy={168}
          r={128}
          stroke="#EFEFEF"
          strokeWidth={2}
          opacity={0.4}
        />
        <Circle cx={168} cy={168} r={87.5} fill="#F7F7F7" stroke="#EFEFEF" />
        <Circle cx={168} cy={168} r={73.5} fill="#fff" stroke="#EFEFEF" />
        <G clipPath="url(#a)">
          <Path
            fill="#5B5964"
            fillOpacity={0.4}
            d="M185.333 178.833h4.333v4.334h-43.333v-4.334h4.333v-15.166A17.338 17.338 0 0 1 168 146.333a17.334 17.334 0 0 1 17.333 17.334v15.166ZM161.5 187.5h13v4.334h-13V187.5Z"
          />
        </G>
        <Defs>
          <ClipPath id="a">
            <Path fill="#fff" d="M142 142h52v52h-52z" />
          </ClipPath>
        </Defs>
      </Svg>
    </Animated.View>
  );
};

export default NoNotifications;
