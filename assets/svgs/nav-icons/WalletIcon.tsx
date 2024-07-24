import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export const WalletIconOutline = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#6E6D7A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3Z"
    />
  </Svg>
);

export const WalletIconSolid = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#35A6B4"
      d="M4.8 4.8a2.4 2.4 0 0 0-2.4 2.4v1.2h19.2V7.2a2.4 2.4 0 0 0-2.4-2.4H4.8Z"
    />
    <Path
      fill="#35A6B4"
      fillRule="evenodd"
      d="M21.6 10.8H2.4v6a2.4 2.4 0 0 0 2.4 2.4h14.4a2.4 2.4 0 0 0 2.4-2.4v-6ZM4.8 15.6A1.2 1.2 0 0 1 6 14.4h1.2a1.2 1.2 0 0 1 0 2.4H6a1.2 1.2 0 0 1-1.2-1.2Zm6-1.2a1.2 1.2 0 1 0 0 2.4H12a1.2 1.2 0 0 0 0-2.4h-1.2Z"
      clipRule="evenodd"
    />
  </Svg>
);
