import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

// Define the interface for the props
interface GeometricFiguresProps extends SvgProps {
  color?: string
}

const GeometricFigures: React.FC<GeometricFiguresProps> = ({
  color = "#FF6767",
  ...props
}) => (
  <Svg width={192} height={178} viewBox="0 0 192 187" fill="none" {...props}>
    <Path
      d="M115.765 8.47h56.47a5.646 5.646 0 015.647 5.648v56.47a5.647 5.647 0 01-5.647 5.647h-56.47a5.646 5.646 0 01-5.647-5.647v-56.47a5.647 5.647 0 015.647-5.647zM11.295 118.589h56.47a5.647 5.647 0 015.647 5.647v56.471a5.646 5.646 0 01-5.647 5.647h-56.47a5.647 5.647 0 01-5.648-5.647v-56.471a5.648 5.648 0 015.647-5.647zm140.408-8.493l39.529 67.765c2.194 3.766-.52 8.493-4.879 8.493h-79.059c-4.359 0-7.073-4.727-4.879-8.493l39.529-67.765c2.18-3.735 7.579-3.735 9.759 0zM42.353 0c23.39 0 42.353 18.963 42.353 42.353S65.743 84.706 42.353 84.706 0 65.743 0 42.353 18.963 0 42.353 0z"
      fill={color}
    />
  </Svg>
)

export default GeometricFigures
