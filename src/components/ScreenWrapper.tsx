import { cn } from "@/lib/utils"
import React, { PropsWithChildren } from "react"
import { SafeAreaView, SafeAreaViewProps } from "react-native-safe-area-context"

const ScreenWrapper = ({
	children,
	className,
}: PropsWithChildren<SafeAreaViewProps>) => {
	return (
		<SafeAreaView
			className={cn("px-8 py-6 bg-background min-h-screen", className)}
		>
			{children}
		</SafeAreaView>
	)
}

export default ScreenWrapper
