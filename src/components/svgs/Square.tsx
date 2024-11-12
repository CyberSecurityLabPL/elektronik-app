import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

// Define the interface for the props
interface SquareProps extends SvgProps {
	color: string
}

const Square: React.FC<SquareProps> = ({ color, ...props }) => (
	<Svg width={191} height={191} fill="none" {...props}>
		<Path
			fill={color}
			d="M174.201 43.648 79.298 2.6c-13.623-5.033-28.85 1-35.331 13.997L2.888 111.418c-5.886 13.622.38 29.436 13.996 35.331l94.871 40.966a26.281 26.281 0 0 0 20.6.41 26.277 26.277 0 0 0 14.795-14.244l41.047-94.903.061-.142c5.836-13.6-.458-29.354-14.057-35.188Z"
		/>
	</Svg>
)

export default Square
