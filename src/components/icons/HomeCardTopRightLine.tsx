import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

// Define the interface for the props
interface HomeCardTopRightLineProps extends SvgProps {
  color?: string
}

const HomeCardTopRightLine: React.FC<HomeCardTopRightLineProps> = ({
  color = "#CA96FF",
  ...props
}) => (
  <Svg width={187} height={111} viewBox="0 0 187 111" fill="none" {...props}>
    <Path
      d="M1 5l30.243 5.224A54.943 54.943 0 0168.96 36.023v0a54.943 54.943 0 0044.155 26.523l3.684.196a61.894 61.894 0 0140.484 18.04L183 106.5"
      stroke={color}
      strokeWidth={10}
    />
  </Svg>
)

export default HomeCardTopRightLine
