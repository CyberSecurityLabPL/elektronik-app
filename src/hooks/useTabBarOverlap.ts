import {
  TAB_BAR_BOTTOM_MARGIN,
  TAB_BAR_CLEARANCE_GAP,
  TAB_BAR_CONTENT_HEIGHT,
} from "@/constants/layout"
import { useSafeAreaInsets } from "react-native-safe-area-context"

// Amount of bottom space scrollable screens should reserve so their content
// can clear the floating, blurred TabBar instead of being hidden under it.
const useTabBarOverlap = () => {
  const insets = useSafeAreaInsets()

  return (
    insets.bottom +
    TAB_BAR_BOTTOM_MARGIN +
    TAB_BAR_CONTENT_HEIGHT +
    TAB_BAR_CLEARANCE_GAP
  )
}

export default useTabBarOverlap
