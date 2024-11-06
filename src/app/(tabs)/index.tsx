import ScreenWrapper from "@/components/ScreenWrapper"
import { Text } from "react-native"
import Event from "@/components/Event/Event"

export default function TabOneScreen() {
	return (
		<ScreenWrapper className="flex justify-center items-center gap-4
		">
			<Event
			type="event"
			title="Zawody szkolne"
			content="Mocarny Elektroniaż"
			date="12 czerwca"
			timeLeft="Za 3 dni"
			 />
			<Event
			type="future event"
			title="Zawody szkolne"
			content="Mocarny Elektroniaż"
			date="12 czerwca"
			timeLeft="Za 3 dni"
			 />
		</ScreenWrapper>
	)
}
