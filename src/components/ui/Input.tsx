import { cn } from "@/lib/utils"
import React from "react"
import { TextInput, TextInputProps, View } from "react-native"
import { ClassNameValue } from "tailwind-merge"

const Input = ({
    className,
    value,
    type,
    containerClassName,
    ...props
}: TextInputProps & { type: "number" | "text", containerClassName?: ClassNameValue }) => {
    return (
        <View className={cn("bg-background-secondary p-5 rounded-3xl text-foreground shadow-md", {
            'w-full': type === 'text',
            'w-fit': type === 'number',
        }, containerClassName)}>
            <TextInput
                className={cn(
                    "placeholder:text-zinc-500 text-foreground",
                    {
                        'text-xl text-center pr-1': type === 'number',
                    },
                    className,
                )}

                keyboardType={type === 'number' ? 'numeric' : 'default'}
                maxLength={type === 'number' ? 2 : undefined}
                {...props}
            />
        </View>
    )
}

export default Input
