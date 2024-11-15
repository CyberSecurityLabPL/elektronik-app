import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

interface HalfCircleEventProps extends SvgProps {
  color?: string
}

const HalfCircleEvent: React.FC<HalfCircleEventProps> = ({
  color = "#FED6A7",
  ...props
}) => {
  return (
    <Svg width={250} height={125} viewBox="0 0 200 100" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M200 100C200 44.772 155.228 0 100 0S0 44.772 0 100h200z"
        fill={color}
      />
    </Svg>
  )
}

export default HalfCircleEvent
