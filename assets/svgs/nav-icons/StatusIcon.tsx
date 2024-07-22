import * as React from "react";
import Svg, { SvgProps, Circle } from "react-native-svg";
export const StatusIconOutline = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Circle
      cx={9}
      cy={9}
      r={9}
      stroke="#6E6D7A"
      strokeDasharray="66 66"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      transform="matrix(1 0 0 -1 3 21)"
    />
  </Svg>
);
export const StatusIconSolid = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Circle
      cx={9}
      cy={9}
      r={9}
      stroke="#35A6B4"
      strokeDasharray="66 66"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      transform="matrix(1 0 0 -1 3 21)"
    />
    <Circle
      cx={5}
      cy={5}
      r={5}
      fill="#35A6B4"
      transform="matrix(1 0 0 -1 7 17)"
    />
  </Svg>
);
