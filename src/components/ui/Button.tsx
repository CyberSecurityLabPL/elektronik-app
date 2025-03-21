import { cn } from "@/lib/utils";
import React from "react"
import { Pressable, PressableProps, Text } from "react-native"

const Button = ({
  variant,
  text,
  className,
  ...props
}: PressableProps & { variant?: "primary" | "ghost"; text: string }) => {
  if (variant == "ghost") {
    return (
      <Pressable
        className={cn("w-full p-4 text-center rounded-3xl active:bg-foreground/10 transition-colors", className)}
        {...props}
      >
        <Text className="text-primary text-center font-pregular text-base">
          {text}
        </Text>
      </Pressable>
    )
  }
  return (
    <Pressable
      className={cn("w-full bg-primary p-4 text-center rounded-3xl active:bg-primary/90 transition-colors", className)}
      {...props}
    >
      <Text className="text-white text-center font-pregular text-lg">
        {text}
      </Text>
    </Pressable>
  )
}

export default Button
