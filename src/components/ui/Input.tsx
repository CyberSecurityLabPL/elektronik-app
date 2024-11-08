import { cn } from "@/lib/utils"
import React, { useState } from "react"
import { TextInput, TextInputProps, View } from "react-native"

const Input = ({
	className,
	value,
	type,
	...rest
}: TextInputProps & { type: "number" | "text" }) => {
	const [inputValue, setInputValue] = useState(value)

	const handleChange = (text: string) => {
		if (type == "number") {
			const numericValue = text.replace(/[^0-9]/g, "")
			setInputValue(numericValue)
		}
	}
	if (type == "text") {
		return (
			<View className="bg-background-secondary p-5 rounded-3xl text-foreground   ">
				<TextInput
					className={cn(
						" placeholder:text-zinc-500 text-foreground ",
						className,
					)}
					value={inputValue}
					onChangeText={handleChange}
					{...rest}
				/>
			</View>
		)
	} else {
		return (
			<View className="bg-background-secondary p-5 rounded-3xl text-foreground  w-fit self-start ">
				<TextInput
					className={cn(
						" placeholder:text-zinc-500 text-foreground text-xl text-center pr-1 ",
						className,
					)}
					keyboardType="numeric"
					value={inputValue}
					onChangeText={handleChange}
					{...rest}
					maxLength={2}
				/>
			</View>
		)
	}
}

export default Input
