import * as React from "react"
import Svg, {
  Rect,
  G,
  Path,
  Defs,
  LinearGradient,
  Stop
} from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function GreenDiamondBG(props: any) {
  return (
    <Svg
      width={90}
      height={92}
      viewBox="0 0 90 92"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect width={90} height={90} rx={10} fill="url(#paint0_linear_104_199)" />
      <G filter="url(#filter0_f_104_199)">
        <Path
          d="M43.573 7L6 49.847 43.573 86 82 47.616 43.573 7z"
          stroke="#1E518B"
          strokeOpacity={0.25}
          strokeWidth={5}
        />
      </G>
      <Path
        d="M42.573 8L5 50.305 42.573 86 81 48.102 42.573 8z"
        stroke="#A4F2EA"
        strokeOpacity={0.7}
        strokeWidth={2}
      />
      <Rect width={90} height={90} rx={10} fill="url(#paint1_linear_104_199)" />
      <G filter="url(#filter1_f_104_199)">
        <Path
          d="M43.573 6L6 48.847 43.573 85 82 46.616 43.573 6z"
          stroke="#1E518B"
          strokeOpacity={0.25}
          strokeWidth={5}
        />
      </G>
      <Path
        d="M42.573 6L5 48.305 42.573 84 81 46.102 42.573 6z"
        stroke="#A4F2EA"
        strokeOpacity={0.7}
        strokeWidth={2}
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_104_199"
          x1={42.6563}
          y1={1.40625}
          x2={41.7188}
          y2={90}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#469C97" />
          <Stop offset={1} stopColor="#B0E8BD" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_104_199"
          x1={42.6563}
          y1={1.40625}
          x2={41.7188}
          y2={90}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#469C97" />
          <Stop offset={1} stopColor="#B0E8BD" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default GreenDiamondBG
