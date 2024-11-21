import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

interface ArcProps extends SvgProps {
  color?: string
}

const Arc: React.FC<ArcProps> = ({ color = "#FF9A25EE", ...props }) => {
  return (
    <Svg width={465} height={234} viewBox="0 0 465 234" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M463.971 209.806c1.27 12.81-9.289 23.275-22.162 23.275h-84.492c-12.873 0-23.033-10.575-25.939-23.114-10.47-45.183-50.973-78.859-99.34-78.859-48.369 0-88.874 33.676-99.344 78.859-2.906 12.539-13.066 23.114-25.939 23.114H22.263c-12.87 0-23.43-10.465-22.16-23.275C11.782 92.006 111.166 0 232.037 0s220.255 92.007 231.935 209.806z"
        fill={color}
      />
    </Svg>
  )
}

export default Arc
