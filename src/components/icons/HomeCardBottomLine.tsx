import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

// Define the interface for the props
interface HomeCardBottomLineProps extends SvgProps {
  color?: string
}

const HomeCardBottomLine: React.FC<HomeCardBottomLineProps> = ({
  color = "#C998F9",
  ...props
}) => (
  <Svg width={393} height={334} viewBox="0 0 393 334" fill="none" {...props}>
    <Path
      d="M391 13.22l-3.499-1.419a84.999 84.999 0 00-66.522 1.128l-5.658 2.52a84.989 84.989 0 00-28.333 20.497l-22.373 24.632a68.495 68.495 0 00-17.428 39.003l-1.279 12.364a44.73 44.73 0 01-22.9 34.571v0a44.733 44.733 0 01-38.143 2.386L150.5 135.22l-16.028-5.778a55.793 55.793 0 00-50.58 6.548v0a55.79 55.79 0 00-19.726 24.211L39 219.72l-14 43.5-20 69"
      stroke={color}
      strokeWidth={10}
    />
  </Svg>
)

export default HomeCardBottomLine
