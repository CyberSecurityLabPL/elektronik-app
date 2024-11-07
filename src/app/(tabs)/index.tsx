import ScreenWrapper from "@/components/ScreenWrapper"
import { Text } from "react-native"
import LessonCard from "@/components/plan/LessonCard"

export default function TabOneScreen() {
	return (
		<ScreenWrapper className="flex justify-center items-center">
			<LessonCard
				period={1}
				time="8:00-8:45"
				subject="Matematyka"
				teacher="AA"
				room="101"
			/>
		</ScreenWrapper>
	)
}
