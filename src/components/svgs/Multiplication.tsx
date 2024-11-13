import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

// Define the interface for the props
interface MultiplicationProps extends SvgProps {
  color: string
}

const Multiplication: React.FC<MultiplicationProps> = ({ color, ...props }) => (
  <Svg width={220} height={200} fill="none" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M132 0H88v51.716L47.774 15.147 16.663 43.431 56.888 80H0v40h56.888l-40.226 36.568 31.113 28.285L88 148.284V200h44v-51.716l40.226 36.569 31.112-28.284L163.112 120H220V80h-56.888l40.226-36.569-31.112-28.284L132 51.716V0Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Multiplication
