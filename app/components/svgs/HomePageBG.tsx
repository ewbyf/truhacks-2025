import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function HomePageBG(props: any) {
  return (
    <Svg
      width={393}
      height={852}
      viewBox="0 0 393 852"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_103_594)">
        <Path fill="#1E1E1E" d="M0 0H393V852H0z" />
        <G filter="url(#filter0_f_103_594)">
          <Path
            stroke="#6F2B66"
            strokeWidth={80}
            d="M67.6184 -7.675L165.618 144.325"
          />
        </G>
        <G filter="url(#filter1_f_103_594)">
          <Path
            stroke="#1526A4"
            strokeWidth={40}
            d="M-101.086 26.9357L107.914 181.936"
          />
        </G>
        <G filter="url(#filter2_f_103_594)">
          <Path
            stroke="#825CC6"
            strokeWidth={40}
            d="M160.863 -247.335L204.248 121.652"
          />
        </G>
        <G filter="url(#filter3_f_103_594)">
          <Path
            stroke="#825CC6"
            strokeWidth={40}
            d="M160.863 -247.335L204.248 121.652"
          />
        </G>
        <G filter="url(#filter4_f_103_594)">
          <Path
            stroke="#6F2B66"
            strokeWidth={80}
            d="M67.6184 -7.675L165.618 144.325"
          />
        </G>
        <G filter="url(#filter5_f_103_594)">
          <Path
            stroke="#1526A4"
            strokeWidth={40}
            d="M-101.086 26.9357L107.914 181.936"
          />
        </G>
      </G>
      <Defs>
        <ClipPath id="clip0_103_594">
          <Path fill="#fff" d="M0 0H393V852H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default HomePageBG
