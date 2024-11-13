import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

// Define the interface for the props
interface SmallCirclesProps extends SvgProps {
	color: string
}

const SmallCircles: React.FC<SmallCirclesProps> = ({ color, ...props }) => (
	<Svg width={191} height={191} fill="none" {...props}>
		<Path
			fill={color}
			fillRule="evenodd"
			d="M0 21.222a21.222 21.222 0 1 1 42.444 0 21.222 21.222 0 0 1-42.444 0Zm74.278 0a21.222 21.222 0 1 1 42.444 0 21.222 21.222 0 0 1-42.444 0Zm74.278 0a21.221 21.221 0 1 1 36.228 15.007 21.222 21.222 0 0 1-36.228-15.007ZM0 95.5a21.222 21.222 0 1 1 42.445 0A21.222 21.222 0 0 1 0 95.5Zm74.278 0a21.222 21.222 0 1 1 42.445 0 21.222 21.222 0 0 1-42.445 0Zm74.278 0a21.221 21.221 0 1 1 42.443-.003 21.221 21.221 0 0 1-42.443.003ZM0 169.778a21.223 21.223 0 1 1 42.446 0 21.223 21.223 0 0 1-42.446 0Zm74.278 0a21.223 21.223 0 1 1 42.446 0 21.223 21.223 0 0 1-42.446 0Zm74.278 0a21.222 21.222 0 1 1 42.444-.003 21.222 21.222 0 0 1-42.444.003Z"
			clipRule="evenodd"
		/>
	</Svg>
)

export default SmallCircles
