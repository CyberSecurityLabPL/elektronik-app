import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

// Define the interface for the props
interface SmallSquaresProps extends SvgProps {
  color: string
}

const SmallSquares: React.FC<SmallSquaresProps> = ({ color, ...props }) => (
  <Svg width={108} height={108} fill="none" {...props}>
    <Path
      fill={color}
      d="M91.813 73.511a8.026 8.026 0 0 1-11.35 0L66.627 59.674a8.025 8.025 0 0 1 0-11.35l13.836-13.836a8.026 8.026 0 0 1 11.35 0l13.837 13.837a8.027 8.027 0 0 1 0 11.35L91.813 73.51Zm-64.276 0a8.026 8.026 0 0 1-11.35 0L2.35 59.674a8.025 8.025 0 0 1 0-11.35l13.836-13.836a8.026 8.026 0 0 1 11.35 0l13.836 13.837a8.025 8.025 0 0 1 0 11.35L27.537 73.51Zm32.138 32.138a8.024 8.024 0 0 1-11.35 0L34.488 91.813a8.026 8.026 0 0 1 0-11.35l13.837-13.836a8.025 8.025 0 0 1 11.35 0l13.836 13.836a8.026 8.026 0 0 1 0 11.35l-13.836 13.836Zm0-64.276a8.025 8.025 0 0 1-11.35 0L34.488 27.537a8.026 8.026 0 0 1 0-11.35L48.326 2.35a8.026 8.026 0 0 1 11.35 0l13.836 13.837a8.026 8.026 0 0 1 0 11.35L59.675 41.373Z"
    />
  </Svg>
)

export default SmallSquares
