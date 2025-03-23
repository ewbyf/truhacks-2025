import * as React from "react"
import Svg, {
  G,
  Path,
  Rect,
  Mask,
  Ellipse,
  Circle,
  Defs,
  LinearGradient,
  Stop
} from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function DinoDefaultBG(props: any) {
  return (
    <Svg
      width={93}
      height={90}
      viewBox="0 0 93 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G filter="url(#filter0_f_131_268)">
        <Path
          d="M42 75.689s-.38 4.656-2.809 6.491c-3 2.268-6.07 2.448-9.228.36C25.794 79.788 29.56 71 29.56 71"
          stroke="#AFAFAF"
          strokeWidth={3}
        />
      </G>
      <Rect
        x={2}
        width={90}
        height={90}
        rx={10}
        fill="url(#paint0_linear_131_268)"
      />
      <G filter="url(#filter1_f_131_268)">
        <Path
          d="M33.572 40.582s-3.095-2.315-5.181-1.785c-1.694.43-2.843 1.31-3.189 2.856-.44 1.971 1.554 2.906 3.189 4.284.975.822 1.7 1.088 2.79 1.785m53.807 8.21s-4.148.356-6.756 0c-3.808-.518-5.977-1.307-9.187-3.212-4.52-2.682-8.769-9.64-8.769-9.64l-7.174-11.066-4.384-8.925s-2.689-4.876-5.182-7.497c-1.928-2.027-5.58-4.64-5.58-4.64s-3.23-2.067-5.58-2.857c-1.944-.654-3.107-.974-5.18-1.07-2.684-.126-4.255.238-6.776 1.07-2.356.777-3.643 1.427-5.58 2.856-2.046 1.51-2.87 2.693-4.384 4.641-1.435 1.845-2.319 2.89-3.189 4.998-.825 2-1.491 3.239-1.196 5.355.183 1.312.393 2.103 1.196 3.213 1.151 1.591 2.396 2.205 4.384 2.856 2.485.814 4.262.739 6.776 0 1.522-.448 3.587-1.785 3.587-1.785l-1.594 4.284-1.993 4.284-2.392 5.712v3.213s.02 4.284.02 5.355c0 1.07-.02 5.355 2.372 9.282 2.391 3.927 3.607 4.284 4.005 4.64.399.358 3.307 2.305 4.385 2.857 2.79 1.428 2.525 1.219 5.56 2.142 3.133.953 7.592.357 8.39 1.07.796.715 2.77 5.356 2.77 5.356s1.047 4.474 3.587 5.354c2.22.77 5.998-.714 5.998-.714s3.239-.792 4.364-2.141c1.397-1.676 0-3.264 0-5.356 0-1.394-.484-2.244 0-3.57 1.34-3.664 6.707-.845 10.762-2.141 3.933-1.259 9.567-4.284 9.567-4.284s5.836-3.247 7.97-6.426c2.133-3.18 1.197-3.213-.797-3.213z"
          stroke="#AFAFAF"
          strokeWidth={3}
        />
      </G>
      <G filter="url(#filter2_f_131_268)">
        <Path
          d="M18 37.917s-1.64-.633-2.748-.77c-2-.248-3.402-.293-5.103.77-.914.57-1.62.916-1.962 1.924-.243.713-.256 1.216 0 1.925.44 1.219 1.237 2.008 2.355 2.694 1.743 1.07 5.103 1.54 5.103 1.54"
          stroke="#AFAFAF"
          strokeWidth={3}
        />
      </G>
      <G filter="url(#filter3_f_131_268)">
        <Mask id="a" fill="#fff">
          <Ellipse
            cx={2}
            cy={1.5}
            rx={2}
            ry={1.5}
            transform="matrix(-1 0 0 1 22 18)"
          />
        </Mask>
        <Ellipse
          cx={2}
          cy={1.5}
          rx={2}
          ry={1.5}
          transform="matrix(-1 0 0 1 22 18)"
          fill="#000"
        />
        <Path
          d="M21 19.5c0-.742-.408-1.185-.614-1.34-.206-.153-.352-.16-.386-.16v6c-1.139 0-2.285-.342-3.214-1.04-.93-.697-1.786-1.89-1.786-3.46h6zM20 18c-.034 0-.18.007-.386.16-.206.155-.614.598-.614 1.34h6c0 1.57-.856 2.763-1.786 3.46C22.284 23.659 21.14 24 20 24v-6zm-1 1.5c0 .742.408 1.185.614 1.34.206.153.352.16.386.16v-6c1.139 0 2.285.342 3.214 1.04.93.697 1.786 1.89 1.786 3.46h-6zm1 1.5c.034 0 .18-.007.386-.16.206-.155.614-.598.614-1.34h-6c0-1.57.856-2.763 1.786-3.46C17.716 15.341 18.86 15 20 15v6z"
          fill="#AFAFAF"
          mask="url(#a)"
        />
      </G>
      <Path
        d="M42.5 76s-.88 4.345-3.309 6.18c-3 2.268-6.07 2.448-9.228.36-4.169-2.753-.401-11.54-.401-11.54"
        stroke="#fff"
      />
      <G filter="url(#filter4_f_131_268)">
        <Path
          d="M42.5 76s-.88 4.345-3.309 6.18c-3 2.268-6.07 2.448-9.228.36-4.169-2.753-.401-11.54-.401-11.54"
          stroke="#fff"
          strokeWidth={3}
        />
      </G>
      <Path
        d="M33.572 40.582s-3.095-2.315-5.181-1.785c-1.694.43-2.843 1.31-3.189 2.856-.44 1.971 1.554 2.906 3.189 4.284.975.822 1.7 1.088 2.79 1.785m53.807 8.21s-4.148.356-6.756 0c-3.808-.518-5.977-1.307-9.187-3.212-4.52-2.682-8.769-9.64-8.769-9.64l-7.174-11.066-4.384-8.925s-2.689-4.876-5.182-7.497c-1.928-2.027-5.58-4.64-5.58-4.64s-3.23-2.067-5.58-2.857c-1.944-.654-3.107-.974-5.18-1.07-2.684-.126-4.255.238-6.776 1.07-2.356.777-3.643 1.427-5.58 2.856-2.046 1.51-2.87 2.693-4.384 4.641-1.435 1.845-2.319 2.89-3.189 4.998-.825 2-1.491 3.239-1.196 5.355.183 1.312.393 2.103 1.196 3.213 1.151 1.591 2.396 2.205 4.384 2.856 2.485.814 4.262.739 6.776 0 1.522-.448 3.587-1.785 3.587-1.785l-1.594 4.284-1.993 4.284s-2.392 4.722-2.392 7.14v1.785s.02 4.284.02 5.355c0 1.07-.02 5.355 2.372 9.282 2.391 3.927 3.607 4.284 4.005 4.64.399.358 3.307 2.305 4.385 2.857 2.79 1.428 2.525 1.219 5.56 2.142 3.133.953 7.592.357 8.39 1.07.796.715 2.77 5.356 2.77 5.356s1.047 4.474 3.587 5.354c2.22.77 5.998-.714 5.998-.714s3.239-.792 4.364-2.141c1.397-1.676 0-3.264 0-5.356 0-1.394-.484-2.244 0-3.57 1.34-3.664 6.707-.845 10.762-2.141 3.933-1.259 9.567-4.284 9.567-4.284s5.836-3.247 7.97-6.426c2.133-3.18 1.197-3.213-.797-3.213z"
        stroke="#fff"
      />
      <Path
        d="M19 37.917l-3.023-.77S11.909 36.38 10 37.5c-.974.572-1.418 1.333-1.795 2.342-.266.712-.28 1.215 0 1.924.484 1.22 1.361 2.009 2.591 2.695C12.714 45.53 16.41 46 16.41 46"
        stroke="#fff"
      />
      <Circle
        cx={1.5}
        cy={1.5}
        r={1.5}
        transform="matrix(-1 0 0 1 22 18)"
        fill="#fff"
      />
      <Path
        d="M76.292 13.625a.883.883 0 01-.648-.27.883.883 0 01-.269-.647V6.292c0-.253.09-.468.27-.648.179-.18.395-.27.647-.27h4.09l-.916.918h-3.174v6.416h6.416V9.523l.917-.917v4.102c0 .252-.09.468-.27.648a.883.883 0 01-.647.269h-6.416zm1.833-2.75V8.927l4.205-4.205a.916.916 0 01.653-.275.905.905 0 01.653.275l.642.653c.084.092.15.193.195.304.046.11.069.223.069.338a.944.944 0 01-.063.338.858.858 0 01-.2.303l-4.206 4.217h-1.948zm.917-.917h.641L82.342 7.3l-.321-.32-.332-.322-2.647 2.647v.653z"
        fill="#8E8E8E"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_131_268"
          x1={-55.3626}
          y1={-55.3125}
          x2={81.7849}
          y2={89.3706}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#787878" />
          <Stop offset={1} stopColor="#303030" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default DinoDefaultBG
