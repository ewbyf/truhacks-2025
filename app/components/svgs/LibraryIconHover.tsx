import * as React from "react"
import Svg, { Path } from "react-native-svg"

function LibraryIconHover(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#FA17DB"
      {...props}
    >
      <Path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640H447l-80-80H160v480l96-320h684L837-217q-8 26-29.5 41.5T760-160H160zm84-80h516l72-240H316l-72 240zm0 0l72-240-72 240zm-84-400v-80 80z" />
    </Svg>
  )
}

export default LibraryIconHover
