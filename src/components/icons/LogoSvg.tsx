import * as React from "react"
import Svg, { SvgProps, Mask, Path, G } from "react-native-svg"
const LogoSvg = ({ width = 96, height = 96, ...props }: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 96 96" fill="none" {...props}>
    <Mask
      id="a"
      width={78}
      height={78}
      x={9}
      y={9}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        d="M67.2 9.6H28.8c-10.604 0-19.2 8.596-19.2 19.2v38.4c0 10.604 8.596 19.2 19.2 19.2h38.4c10.604 0 19.2-8.596 19.2-19.2V28.8c0-10.604-8.596-19.2-19.2-19.2Z"
      />
    </Mask>
    <G mask="url(#a)">
      <Path fill="#7BA4DB" d="M86.4 9.6H9.6v76.8h76.8V9.6Z" />
      <Path stroke="#89B0E2" strokeWidth={19.2} d="m-9.6 86.4 115.2-19.2" />
      <Path stroke="#98BCE9" strokeWidth={19.2} d="M-9.6 67.2 105.6 48" />
      <Path stroke="#A7C8F0" strokeWidth={19.2} d="m-9.6 48 115.2-19.2" />
      <Path stroke="#B6D4F7" strokeWidth={19.2} d="M-9.6 28.8 105.6 9.6" />
      <Path stroke="#C5E0FF" strokeWidth={19.2} d="M-9.6 9.6 105.6-9.6" />
    </G>
    <Mask
      id="b"
      width={78}
      height={78}
      x={9}
      y={9}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        d="M67.2 9.6H28.8c-10.604 0-19.2 8.596-19.2 19.2v38.4c0 10.604 8.596 19.2 19.2 19.2h38.4c10.604 0 19.2-8.596 19.2-19.2V28.8c0-10.604-8.596-19.2-19.2-19.2Z"
      />
    </Mask>
    <G mask="url(#b)">
      <Path fill="#7293FF" d="M86.4 9.6H9.6v76.8h76.8V9.6Z" />
      <Path stroke="#ACA7FF" strokeWidth={19.2} d="m-9.6 86.4 115.2-19.2" />
      <Path stroke="#B8B4FF" strokeWidth={19.2} d="M-9.6 67.2 105.6 48" />
      <Path stroke="#C3BFFF" strokeWidth={19.2} d="m-9.6 48 115.2-19.2" />
      <Path stroke="#D2CFFF" strokeWidth={19.2} d="M-9.6 28.8 105.6 9.6" />
      <Path stroke="#E4E2FF" strokeWidth={19.2} d="M-9.6 9.6 105.6-9.6" />
    </G>
    <Path fill="#fff" d="M40.8 32.4a6 6 0 0 0-12 0v31.2a6 6 0 0 0 12 0V32.4Z" />
    <Path
      fill="#fff"
      d="M61.2 26.4H34.8a6 6 0 0 0 0 12h26.4a6 6 0 0 0 0-12ZM56.4 42H34.8a6 6 0 0 0 0 12h21.6a6 6 0 0 0 0-12ZM61.2 57.6H34.8a6 6 0 0 0 0 12h26.4a6 6 0 0 0 0-12Z"
    />
    <Path
      fill="#fff"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.96}
      d="M71.29 44.736a1.152 1.152 0 0 0-.827-.828l-3.533-.911a.288.288 0 0 1 0-.554l3.533-.912a1.151 1.151 0 0 0 .828-.827l.911-3.534a.288.288 0 0 1 .555 0l.91 3.534a1.153 1.153 0 0 0 .828.828l3.534.91a.287.287 0 0 1 0 .556l-3.534.91a1.154 1.154 0 0 0-.828.828l-.91 3.534a.287.287 0 0 1-.555 0l-.911-3.534ZM20.41 73.536a1.153 1.153 0 0 0-.827-.828l-3.534-.91a.289.289 0 0 1 0-.555l3.534-.912a1.152 1.152 0 0 0 .828-.827l.91-3.534a.287.287 0 0 1 .555 0l.911 3.534a1.152 1.152 0 0 0 .828.828l3.533.91a.288.288 0 0 1 0 .556l-3.533.91a1.15 1.15 0 0 0-.828.828l-.911 3.534a.288.288 0 0 1-.555 0l-.91-3.534ZM22.81 26.016a1.152 1.152 0 0 0-.827-.828l-3.533-.91a.288.288 0 0 1 0-.555l3.533-.912a1.152 1.152 0 0 0 .828-.827l.911-3.534a.288.288 0 0 1 .555 0l.91 3.534a1.153 1.153 0 0 0 .828.828l3.534.91a.288.288 0 0 1 0 .556l-3.534.91a1.152 1.152 0 0 0-.828.828l-.91 3.534a.289.289 0 0 1-.555 0l-.911-3.534Z"
    />
  </Svg>
)
export default LogoSvg
