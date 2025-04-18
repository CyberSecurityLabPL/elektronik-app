import * as React from "react"
import Svg, { SvgProps, Mask, Path, G } from "react-native-svg"
// const LogoSvg = ({ width = 96, height = 96, ...props }: SvgProps) => (
//   <Svg width={width} height={height} viewBox="0 0 96 96" fill="none" {...props}>
//     <Mask
//       id="a"
//       width={78}
//       height={78}
//       x={9}
//       y={9}
//       maskUnits="userSpaceOnUse"
//       style={{
//         maskType: "luminance",
//       }}
//     >
//       <Path
//         fill="#fff"
//         d="M67.2 9.6H28.8c-10.604 0-19.2 8.596-19.2 19.2v38.4c0 10.604 8.596 19.2 19.2 19.2h38.4c10.604 0 19.2-8.596 19.2-19.2V28.8c0-10.604-8.596-19.2-19.2-19.2Z"
//       />
//     </Mask>
//     <G mask="url(#a)">
//       <Path fill="#7BA4DB" d="M86.4 9.6H9.6v76.8h76.8V9.6Z" />
//       <Path stroke="#89B0E2" strokeWidth={19.2} d="m-9.6 86.4 115.2-19.2" />
//       <Path stroke="#98BCE9" strokeWidth={19.2} d="M-9.6 67.2 105.6 48" />
//       <Path stroke="#A7C8F0" strokeWidth={19.2} d="m-9.6 48 115.2-19.2" />
//       <Path stroke="#B6D4F7" strokeWidth={19.2} d="M-9.6 28.8 105.6 9.6" />
//       <Path stroke="#C5E0FF" strokeWidth={19.2} d="M-9.6 9.6 105.6-9.6" />
//     </G>
//     <Mask
//       id="b"
//       width={78}
//       height={78}
//       x={9}
//       y={9}
//       maskUnits="userSpaceOnUse"
//       style={{
//         maskType: "luminance",
//       }}
//     >
//       <Path
//         fill="#fff"
//         d="M67.2 9.6H28.8c-10.604 0-19.2 8.596-19.2 19.2v38.4c0 10.604 8.596 19.2 19.2 19.2h38.4c10.604 0 19.2-8.596 19.2-19.2V28.8c0-10.604-8.596-19.2-19.2-19.2Z"
//       />
//     </Mask>
//     <G mask="url(#b)">
//       <Path fill="#7293FF" d="M86.4 9.6H9.6v76.8h76.8V9.6Z" />
//       <Path stroke="#ACA7FF" strokeWidth={19.2} d="m-9.6 86.4 115.2-19.2" />
//       <Path stroke="#B8B4FF" strokeWidth={19.2} d="M-9.6 67.2 105.6 48" />
//       <Path stroke="#C3BFFF" strokeWidth={19.2} d="m-9.6 48 115.2-19.2" />
//       <Path stroke="#D2CFFF" strokeWidth={19.2} d="M-9.6 28.8 105.6 9.6" />
//       <Path stroke="#E4E2FF" strokeWidth={19.2} d="M-9.6 9.6 105.6-9.6" />
//     </G>
//     <Path fill="#fff" d="M40.8 32.4a6 6 0 0 0-12 0v31.2a6 6 0 0 0 12 0V32.4Z" />
//     <Path
//       fill="#fff"
//       d="M61.2 26.4H34.8a6 6 0 0 0 0 12h26.4a6 6 0 0 0 0-12ZM56.4 42H34.8a6 6 0 0 0 0 12h21.6a6 6 0 0 0 0-12ZM61.2 57.6H34.8a6 6 0 0 0 0 12h26.4a6 6 0 0 0 0-12Z"
//     />
//     <Path
//       fill="#fff"
//       stroke="#fff"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={0.96}
//       d="M71.29 44.736a1.152 1.152 0 0 0-.827-.828l-3.533-.911a.288.288 0 0 1 0-.554l3.533-.912a1.151 1.151 0 0 0 .828-.827l.911-3.534a.288.288 0 0 1 .555 0l.91 3.534a1.153 1.153 0 0 0 .828.828l3.534.91a.287.287 0 0 1 0 .556l-3.534.91a1.154 1.154 0 0 0-.828.828l-.91 3.534a.287.287 0 0 1-.555 0l-.911-3.534ZM20.41 73.536a1.153 1.153 0 0 0-.827-.828l-3.534-.91a.289.289 0 0 1 0-.555l3.534-.912a1.152 1.152 0 0 0 .828-.827l.91-3.534a.287.287 0 0 1 .555 0l.911 3.534a1.152 1.152 0 0 0 .828.828l3.533.91a.288.288 0 0 1 0 .556l-3.533.91a1.15 1.15 0 0 0-.828.828l-.911 3.534a.288.288 0 0 1-.555 0l-.91-3.534ZM22.81 26.016a1.152 1.152 0 0 0-.827-.828l-3.533-.91a.288.288 0 0 1 0-.555l3.533-.912a1.152 1.152 0 0 0 .828-.827l.911-3.534a.288.288 0 0 1 .555 0l.91 3.534a1.153 1.153 0 0 0 .828.828l3.534.91a.288.288 0 0 1 0 .556l-3.534.91a1.152 1.152 0 0 0-.828.828l-.91 3.534a.289.289 0 0 1-.555 0l-.911-3.534Z"
//     />
//   </Svg>
// )
// export default LogoSvg

interface LogoSvgProps extends SvgProps {
  variant?: 'light' | 'dark';
}

export const LogoSvg = ({ width = 96, height = 96, variant = 'light', ...props }: LogoSvgProps) => {
  const fillColor = variant === 'light' ? '#354DFC' : '#fff'
  return (
    <Svg width={width} height={height} viewBox="0 0 1024 1024" fill="none" {...props}>
      <Path d="M429.07 809C431.832 809 434.07 806.761 434.07 804V717.475C434.07 714.714 431.832 712.475 429.07 712.475H164.461C161.7 712.475 159.461 710.236 159.461 707.475V554.125C159.461 551.364 161.7 549.125 164.461 549.125H388.25C391.011 549.125 393.25 546.886 393.25 544.125V468.738C393.25 465.976 391.011 463.738 388.25 463.738H42C39.2386 463.738 37 465.976 37 468.738V804C37 806.761 39.2386 809 42 809H429.07Z" fill={fillColor} />
      <Path d="M37 302.813C37 305.574 39.2386 307.813 42 307.813H429.07C431.832 307.813 434.07 305.574 434.07 302.813V220C434.07 217.239 431.832 215 429.07 215H42C39.2386 215 37 217.239 37 220V302.813Z" fill={fillColor} />
      <Path d="M509.578 307.813C506.817 307.813 504.578 305.574 504.578 302.813V220C504.578 217.239 506.817 215 509.578 215H621.991C624.753 215 626.991 217.239 626.991 220L626.986 302.813C626.986 305.574 624.748 307.813 621.986 307.813H509.578Z" fill={fillColor} />
      <Path d="M634.718 461.775C633.769 462.962 632.332 463.653 630.812 463.653H509.578C506.817 463.653 504.578 465.892 504.578 468.653V804C504.578 806.761 506.817 809 509.578 809H621.991C624.753 809 626.991 806.761 626.991 804V639.674C626.991 638.414 627.467 637.2 628.324 636.276L686.079 573.934C688.308 571.528 692.211 571.883 693.968 574.652L841.28 806.68C842.197 808.125 843.79 809 845.501 809H977.774C981.744 809 984.13 804.596 981.963 801.27L773.19 480.882C772.012 479.074 772.127 476.715 773.474 475.03L974.82 223.122C977.437 219.848 975.106 215 970.914 215H834.366C832.846 215 831.409 215.691 830.46 216.878L634.718 461.775Z" fill={fillColor} />
    </Svg>
  )
}

export default LogoSvg