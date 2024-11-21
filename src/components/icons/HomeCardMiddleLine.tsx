import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

// Define the interface for the props
interface HomeCardMiddleLineProps extends SvgProps {
  color?: string
}

const HomeCardMiddleLine: React.FC<HomeCardMiddleLineProps> = ({
  color = "#CA96FF",
  ...props
}) => (
  <Svg width={394} height={189} viewBox="0 0 394 189" fill="none" {...props}>
    <Path
      d="M392 33.59L289.419 7.784a83.891 83.891 0 00-59.228 6.956l-2.684 1.399a77.666 77.666 0 00-40.455 54.582l-.478 2.551a72.957 72.957 0 01-44.785 54.378l-2.95 1.171a63.153 63.153 0 01-38.835 2.52v0a63.155 63.155 0 00-60.97 17.36L4 185"
      stroke={color}
      strokeWidth={10}
    />
  </Svg>
)

export default HomeCardMiddleLine
