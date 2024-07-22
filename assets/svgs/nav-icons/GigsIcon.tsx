import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export const GigsIconSolid = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#35A6B4"
      d="M8.4 3.6a1.2 1.2 0 0 0 0 2.4h7.2a1.2 1.2 0 0 0 0-2.4H8.4ZM4.8 8.4A1.2 1.2 0 0 1 6 7.2h12a1.2 1.2 0 0 1 0 2.4H6a1.2 1.2 0 0 1-1.2-1.2ZM2.4 13.2a2.4 2.4 0 0 1 2.4-2.4h14.4a2.4 2.4 0 0 1 2.4 2.4V18a2.4 2.4 0 0 1-2.4 2.4H4.8A2.4 2.4 0 0 1 2.4 18v-4.8Z"
    />
  </Svg>
);

export const GigsIconOutline = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#6E6D7A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 11H5m14 0a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2m14 0V9a2 2 0 0 0-2-2M5 11V9a2 2 0 0 1 2-2m0 0V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2M7 7h10"
    />
  </Svg>
);
