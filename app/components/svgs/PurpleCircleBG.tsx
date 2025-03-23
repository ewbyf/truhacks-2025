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

function PurpleCircleBG(props: any) {
  return (
    <Svg
      width={90}
      height={90}
      viewBox="0 0 90 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect width={90} height={90} rx={10} fill="url(#paint0_linear_104_201)" />
      <G filter="url(#filter0_f_104_201)">
        <Path
          d="M80 44.5C80 65.885 63.764 83 44 83S8 65.885 8 44.5 24.236 6 44 6s36 17.115 36 38.5z"
          stroke="#6126D5"
          strokeWidth={4}
        />
      </G>
      <Path
        d="M86.25 45.5c0 22-16.722 39.75-37.25 39.75S11.75 67.5 11.75 45.5 28.472 5.75 49 5.75 86.25 23.5 86.25 45.5z"
        stroke="#D4BEFF"
        strokeOpacity={0.8}
        strokeWidth={1.5}
      />
      <Rect width={90} height={90} rx={10} fill="url(#paint1_linear_104_201)" />
      <G filter="url(#filter1_f_104_201)">
        <Path
          d="M80 44.5C80 65.885 63.764 83 44 83S8 65.885 8 44.5 24.236 6 44 6s36 17.115 36 38.5z"
          stroke="#6126D5"
          strokeWidth={4}
        />
      </G>
      <Path
        d="M86.25 45.5c0 22-16.722 39.75-37.25 39.75S11.75 67.5 11.75 45.5 28.472 5.75 49 5.75 86.25 23.5 86.25 45.5z"
        stroke="#D4BEFF"
        strokeOpacity={0.8}
        strokeWidth={1.5}
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_104_201"
          x1={42.6563}
          y1={1.40625}
          x2={41.7188}
          y2={90}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#BEAEE6" />
          <Stop offset={1} stopColor="#543AB6" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_104_201"
          x1={42.6563}
          y1={1.40625}
          x2={41.7188}
          y2={90}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#BEAEE6" />
          <Stop offset={1} stopColor="#543AB6" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default PurpleCircleBG
