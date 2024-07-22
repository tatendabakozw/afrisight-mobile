import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const HomeIconSolid = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#35A6B4"
      d="M12.848 2.751a1.2 1.2 0 0 0-1.697 0l-8.4 8.4a1.2 1.2 0 1 0 1.697 1.697l.352-.351V20.4A1.2 1.2 0 0 0 6 21.6h2.4a1.2 1.2 0 0 0 1.2-1.2V18a1.2 1.2 0 0 1 1.2-1.2h2.4a1.2 1.2 0 0 1 1.2 1.2v2.4a1.2 1.2 0 0 0 1.2 1.2H18a1.2 1.2 0 0 0 1.2-1.2v-7.903l.351.351a1.2 1.2 0 1 0 1.697-1.697l-8.4-8.4Z"
    />
  </Svg>
);

export const HomeIconOutline = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#6E6D7A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m3 12 2-2m0 0 7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11 2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6"
    />
  </Svg>
);
