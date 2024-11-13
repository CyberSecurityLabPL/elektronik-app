import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

// Define the interface for the props
interface CirclesProps extends SvgProps {
  color: string
}

const Circles: React.FC<CirclesProps> = ({ color, ...props }) => (
  <Svg width={200} height={200} fill="none" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M50 100c27.614 0 50-22.386 50-50 0 27.614 22.386 50 50 50-27.614 0-50 22.386-50 50 0-27.614-22.386-50-50-50Zm0 0c-27.614 0-50 22.386-50 50s22.386 50 50 50 50-22.386 50-50c0 27.614 22.386 50 50 50s50-22.386 50-50-22.386-50-50-50c27.614 0 50-22.386 50-50S177.614 0 150 0s-50 22.386-50 50c0-27.614-22.386-50-50-50S0 22.386 0 50s22.386 50 50 50Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Circles
