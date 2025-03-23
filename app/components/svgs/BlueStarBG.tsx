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

function BlueStarBG(props: any) {
  return (
    <Svg
      width={95}
      height={100}
      viewBox="0 0 95 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect
        x={3}
        y={4}
        width={90}
        height={90}
        rx={10}
        fill="url(#paint0_linear_140_161)"
      />
      <G filter="url(#filter0_f_140_161)">
        <Path
          d="M47.5 15.89l6.87 22.307.761 2.47h25.322L61.9 54.887l-1.933 1.482.717 2.327 6.988 22.69-18.043-13.83-2.129-1.631-2.13 1.632-18.042 13.829 6.988-22.69.717-2.327-1.933-1.481-18.553-14.22h25.322l.76-2.47L47.5 15.89z"
          stroke="#6D7FFF"
          strokeWidth={7}
        />
      </G>
      <Path
        d="M48 13.273l8.028 25.017.223.695h26.744l-21.057 15.49-.58.426.22.685 8.037 25.043-21.022-15.465-.593-.436-.593.436L26.385 80.63l8.036-25.043.22-.685-.58-.426-21.056-15.49h26.744l.223-.695L48 13.273z"
        stroke="#B9C2FF"
        strokeOpacity={0.5}
        strokeWidth={2}
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_140_161"
          x1={3}
          y1={4}
          x2={89.5}
          y2={94}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#233DFF" />
          <Stop offset={1} stopColor="#00083F" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default BlueStarBG
