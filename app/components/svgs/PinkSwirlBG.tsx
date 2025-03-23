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

function PinkSwirlBG(props: any) {
  return (
    <Svg
      width={95}
      height={90}
      viewBox="0 0 95 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect
        x={3}
        width={90}
        height={90}
        rx={10}
        fill="url(#paint0_linear_104_200)"
      />
      <G filter="url(#filter0_f_104_200)">
        <Path
          d="M7 40.633C12.968 40.633 12.743 15 30.958 15c21.865 0 10.193 93.871 49.282 42.77 0 0 4.573-5.785 9.76-5.785"
          stroke="url(#paint1_linear_104_200)"
          strokeOpacity={0.5}
          strokeWidth={5}
        />
      </G>
      <Path
        d="M6 40.075C11.968 40.075 11.743 14 29.958 14c21.865 0 10.193 95.49 49.282 43.507 0 0 4.573-5.885 9.76-5.885"
        stroke="#FAF8DE"
        strokeOpacity={0.5}
        strokeWidth={2}
      />
      <Rect
        x={3}
        width={90}
        height={90}
        rx={10}
        fill="url(#paint2_linear_104_200)"
      />
      <Path
        d="M3 40.075C9.471 40.075 9.227 14 28.979 14c23.709 0 11.052 95.49 53.437 43.507 0 0 4.959-5.885 10.584-5.885"
        stroke="#FAF8DE"
        strokeOpacity={0.5}
        strokeWidth={2}
      />
      <G filter="url(#filter1_f_104_200)">
        <Path
          d="M3 40.633C9.471 40.633 9.227 15 28.979 15c23.709 0 11.052 93.871 53.437 42.77 0 0 4.959-5.785 10.584-5.785"
          stroke="url(#paint3_linear_104_200)"
          strokeOpacity={0.5}
          strokeWidth={5}
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_104_200"
          x1={45.6563}
          y1={1.40625}
          x2={44.7188}
          y2={90}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F0A37F" />
          <Stop offset={1} stopColor="#C6305D" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_104_200"
          x1={59.0826}
          y1={23.542}
          x2={59.0826}
          y2={50.3128}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FAF8DE" />
          <Stop offset={1} stopColor="#F4C27F" />
        </LinearGradient>
        <LinearGradient
          id="paint2_linear_104_200"
          x1={45.6563}
          y1={1.40625}
          x2={44.7188}
          y2={90}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F0A37F" />
          <Stop offset={1} stopColor="#C6305D" />
        </LinearGradient>
        <LinearGradient
          id="paint3_linear_104_200"
          x1={59.4751}
          y1={23.542}
          x2={59.4751}
          y2={50.3128}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FAF8DE" />
          <Stop offset={1} stopColor="#F4C27F" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default PinkSwirlBG
