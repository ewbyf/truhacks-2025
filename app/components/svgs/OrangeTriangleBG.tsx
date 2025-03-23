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

function OrangeTriangleBG(props: any) {
  return (
    <Svg
      width={97}
      height={118}
      viewBox="0 0 97 118"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect
        x={4}
        y={4}
        width={90}
        height={90}
        rx={10}
        fill="url(#paint0_linear_104_202)"
      />
      <G filter="url(#filter0_f_104_202)">
        <Path
          d="M14.035 85.5L45 16.544 75.965 85.5h-61.93z"
          stroke="#DA3C1E"
          strokeWidth={7}
        />
      </G>
      <Path
        d="M11.155 83.25L45.5 12.295 79.845 83.25h-68.69z"
        stroke="#FFD7D0"
        strokeOpacity={0.5}
        strokeWidth={2}
      />
      <Rect
        x={4}
        y={4}
        width={90}
        height={90}
        rx={10}
        fill="url(#paint1_linear_104_202)"
      />
      <G filter="url(#filter1_f_104_202)">
        <Path
          d="M12.117 86L48.5 11.938 84.883 86H12.117z"
          stroke="#DA3C1E"
          strokeWidth={7}
        />
      </G>
      <Path
        d="M11.155 85.25L45.5 14.295 79.845 85.25h-68.69z"
        stroke="#FFD7D0"
        strokeOpacity={0.5}
        strokeWidth={2}
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_104_202"
          x1={-12.4062}
          y1={-21.7813}
          x2={119.781}
          y2={123.062}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#E23F30" />
          <Stop offset={1} stopColor="#E8A160" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_104_202"
          x1={-12.4062}
          y1={-21.7813}
          x2={119.781}
          y2={123.062}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#E23F30" />
          <Stop offset={1} stopColor="#E8A160" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default OrangeTriangleBG
