import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

interface StarProps extends SvgProps {
  color?: string
}

const Star: React.FC<StarProps> = ({ color, ...props }) => {
  return (
    <Svg width={200} height={200} viewBox="0 0 200 200" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M107.143 0H92.857v63.253L69.162 4.606 55.917 9.957l24.308 60.167L34.34 24.239 24.24 34.34l43.979 43.98-56.994-24.902-5.72 13.09 60.307 26.35H0v14.285h65.81L5.505 133.491l5.72 13.091 56.993-24.901-43.98 43.979 10.102 10.101 45.885-45.885-24.308 60.167 13.245 5.351 23.695-58.647V200h14.286v-63.253l23.695 58.647 13.245-5.351-24.308-60.167 45.885 45.885 10.101-10.101-43.979-43.979 56.994 24.901 5.719-13.091-60.305-26.348H200V92.857h-65.811l60.306-26.348-5.719-13.09-56.994 24.9 43.979-43.979-10.101-10.102-45.885 45.886 24.308-60.167-13.245-5.351-23.695 58.647V0z"
        fill={color}
      />
    </Svg>
  )
}

export default Star
