import ScreenWrapper from "@/components/ScreenWrapper"
import { Text } from "react-native"
import Event from "@/components/Event/Event"

export default function TabOneScreen() {
	return (
		<ScreenWrapper>
			<Event
				type="event"
				title="Event Title"
				content="Event Content"
				date="Event Date"
				timeLeft="Event Time Left"
			/>
			<Event
				type="future event"
				title="Event Title"
				content="Event Content"
				date="Event Date"
				timeLeft="Event Time Left"
			/>
		</ScreenWrapper>
	)
}
