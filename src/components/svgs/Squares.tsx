import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

interface SquaresProps extends SvgProps {
  color?: string
}

const Squares: React.FC<SquaresProps> = ({ color, ...props }) => {
  return (
    <Svg width={213} height={160} viewBox="0 0 178 134" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0-44h44.5V.5H0V-44zM89 .5H44.5V45H0v44.5h44.5V134H89V89.5h44.5V134H178V89.5h-44.5V45H178V.5h-44.5V-44H89V.5zM89 45h44.5V.5H89V45zm0 0v44.5H44.5V45H89z"
        fill={color}
      />
    </Svg>
  )
}

export default Squares
