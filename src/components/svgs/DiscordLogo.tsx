import { LucideProps } from "lucide-react-native"
import * as React from "react"
import Svg, { Path } from "react-native-svg"
const DiscordLogo = ({ color, ...props }: LucideProps) => (
  <Svg width={25} height={24} fill="none" {...props}>
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m9 17.25-1 2c-1.274-.53-2.593-1.061-3.995-1.975a1.763 1.763 0 0 1-.797-1.443c-.061-2.996.641-6.008 2.42-9.191A1.97 1.97 0 0 1 6.7 5.758c1.073-.38 1.802-.675 3.05-.883l.75 1.375s.75-.25 2-.25 2 .25 2 .25l.75-1.375c1.248.208 1.977.503 3.05.883.45.16.838.466 1.071.883 1.78 3.184 2.482 6.195 2.421 9.19a1.763 1.763 0 0 1-.797 1.444c-1.402.914-2.721 1.444-3.995 1.975l-1-2m-8.5-1s2.5 1.25 5 1.25 5-1.25 5-1.25"
    />
    <Path
      fill={color}
      d="M9.375 14.5c.898 0 1.625-.84 1.625-1.875 0-1.036-.727-1.875-1.625-1.875-.897 0-1.625.84-1.625 1.875 0 1.036.728 1.875 1.625 1.875ZM15.625 14.5c.898 0 1.625-.84 1.625-1.875 0-1.036-.727-1.875-1.625-1.875S14 11.59 14 12.625c0 1.036.727 1.875 1.625 1.875Z"
    />
  </Svg>
)
export default DiscordLogo
