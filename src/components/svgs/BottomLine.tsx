import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

// Define the interface for the props
interface BottomLineProps extends SvgProps {
  color: string
}

const BottomLine: React.FC<BottomLineProps> = ({ color, ...props }) => (
  <Svg width={697} height={232} fill="none" {...props}>
    <Path
      stroke={color}
      strokeWidth={29}
      d="m688.5 13-91.829 56.81a95.001 95.001 0 0 1-56.864 13.96l-67.767-4.923a95 95 0 0 0-36.22 4.393l-29.151 9.465a94.997 94.997 0 0 0-48.401 35.751l-11.724 16.69c-24.782 35.28-70.214 49.448-110.657 34.508l-31.999-11.82a94.997 94.997 0 0 0-66.66.307L6 218"
    />
  </Svg>
)

export default BottomLine
