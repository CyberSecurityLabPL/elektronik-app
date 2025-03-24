import useColors from "@/hooks/useColors";
import { cn } from "@/lib/utils";
import { SquareArrowOutUpRight } from "lucide-react-native";
import React from "react"
import { Pressable, PressableProps, Text, View } from "react-native"

const Button = ({
  variant = "primary",
  text,
  className,
  redirect,
  ...props
}: PressableProps & { variant?: "primary" | "ghost"; text: string, redirect?: boolean }) => {
  const colors = useColors()
  return (
    <Pressable
      className={cn('w-full p-4 text-center rounded-3xl transition-colors relative', {
        'bg-primary active:bg-primary/90': variant === 'primary',
        'active:bg-foreground/10': variant === 'ghost',
      }, className)}
      {...props}
    >
      <Text className={cn('text-center font-pregular', {
        'text-white text-lg': variant === 'primary',
        'text-primary text-base': variant === 'ghost'
      })}>
        {text}
      </Text>
      {redirect && (
        <View
          className="absolute right-5 top-1/2"
        >
          <SquareArrowOutUpRight
            color={variant === 'primary' ? 'white' : colors.primary}
            size={24}
          />
        </View>
      )}
    </Pressable>
  )
}

export default Button
