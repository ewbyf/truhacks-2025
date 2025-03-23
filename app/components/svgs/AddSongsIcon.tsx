import * as React from "react"
import Svg, { Path } from "react-native-svg"

function AddSongsIcon(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#BBB"
      {...props}
    >
      <Path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160zM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200zm0-80h560v-560H200v560zm0-560v560-560z" />
    </Svg>
  )
}

export default AddSongsIcon
