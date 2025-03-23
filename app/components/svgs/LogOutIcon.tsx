import * as React from "react"
import Svg, { Path } from "react-native-svg"

function LogOutIcon(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      height="20px"
      viewBox="0 -960 960 960"
      width="20px"
      fill="#FFF"
      {...props}
    >
      <Path d="M216-144q-29.7 0-50.85-21.15Q144-186.3 144-216v-528q0-29.7 21.15-50.85Q186.3-816 216-816h264v72H216v528h264v72H216zm432-168l-51-51 81-81H384v-72h294l-81-81 51-51 168 168-168 168z" />
    </Svg>
  )
}

export default LogOutIcon
