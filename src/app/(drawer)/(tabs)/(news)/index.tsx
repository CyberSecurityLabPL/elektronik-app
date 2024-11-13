import ScreenWrapper from "@/components/ScreenWrapper"
import { Link } from "expo-router"
import { Text } from "react-native"
import Event from "@/components/Event/Event"

const News = () => {
  return (
    <ScreenWrapper>
      <Text>News page</Text>
      <Link href="/(tabs)/(news)/42" asChild>
        <Text className="text-white">Navigate to nested route</Text>
      </Link>
    </ScreenWrapper>
  )
}

export default News
