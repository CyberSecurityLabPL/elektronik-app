import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

// Define the interface for the props
interface UpperLineProps extends SvgProps {
	color: string
}

const UpperLine: React.FC<UpperLineProps> = ({ color, ...props }) => (
	<Svg width={567} height={641} fill="none" {...props}>
		<Path
			stroke={color}
			strokeWidth={34}
			d="m561.818 16.452-79.24 20.673c-29.005 7.567-49.972 32.763-52.144 62.66l-1.561 21.483c-2.249 30.946-24.602 56.72-54.919 63.323l-51.832 11.29c-26.505 5.773-46.967 26.871-51.926 53.541a67.407 67.407 0 0 1-46.401 52.09l-52.858 16.308a69.993 69.993 0 0 0-33.313 22.285l-51.45 62.23c-17.003 20.565-13.081 51.22 8.551 66.843 22.861 16.509 25.709 49.477 6.018 69.663L13 628.79"
		/>
	</Svg>
)

export default UpperLine
