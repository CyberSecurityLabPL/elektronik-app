import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

// Define the interface for the props
interface RingProps extends SvgProps {
  color?: string
}

const Ring: React.FC<RingProps> = ({ color = "#F25656", ...props }) => (
  <Svg width={301} height={301} viewBox="0 0 301 301" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M150.5 301c83.118 0 150.5-67.382 150.5-150.5S233.618 0 150.5 0 0 67.382 0 150.5 67.382 301 150.5 301zm0-84.656c36.364 0 65.844-29.48 65.844-65.844 0-36.364-29.48-65.844-65.844-65.844-36.364 0-65.844 29.48-65.844 65.844 0 36.364 29.48 65.844 65.844 65.844z"
      fill={color}
    />
  </Svg>
)

export default Ring
