import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

// Define the interface for the props
interface FlowerProps extends SvgProps {
  color: string
}

const Flower: React.FC<FlowerProps> = ({ color, ...props }) => (
  <Svg width={269} height={269} fill="none" {...props}>
    <Path
      fill={color}
      d="M161.796 161.768c21.646 142.497-76.332 142.497-54.721-.005-142.53 21.658-142.513-76.301.003-54.712-21.656-142.506 76.331-142.497 54.712-.003 142.465-21.573 142.465 76.404.006 54.72Z"
    />
  </Svg>
)

export default Flower
