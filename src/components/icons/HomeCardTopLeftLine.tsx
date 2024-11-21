import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

// Define the interface for the props
interface HomeCardTopLeftLineProps extends SvgProps {
  color?: string
}

const HomeCardTopLeftLine: React.FC<HomeCardTopLeftLineProps> = ({
  color = "#CA96FF",
  ...props
}) => (
  <Svg width={208} height={169} viewBox="0 0 208 169" fill="none" {...props}>
    <Path
      d="M203.5 3l-5.257 8.98a45.686 45.686 0 01-18.627 17.597v0c-18.83 9.629-28.589 30.923-23.59 51.473l.153.631c3.073 12.632.633 26.1-6.578 36.917v0c-11.08 16.621-31.525 24.724-50.922 19.954l-4.396-1.081a42.94 42.94 0 00-41.46 12.202v0a42.942 42.942 0 01-41.767 12.125L2 159.5"
      stroke={color}
      strokeWidth={10}
    />
  </Svg>
)

export default HomeCardTopLeftLine
