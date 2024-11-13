import { cn } from "@/lib/utils"
import React from "react"
import { TextInput, TextInputProps, View } from "react-native"

const Input = ({
  className,
  value,
  type,
  ...rest
}: TextInputProps & { type: "number" | "text" }) => {
  if (type == "text") {
    return (
      <View className="bg-background-secondary p-5 rounded-3xl text-foreground w-full ">
        <TextInput
          className={cn(
            " placeholder:text-zinc-500 text-foreground ",
            className,
          )}
          {...rest}
        />
      </View>
    )
  } else {
    return (
      <View className="bg-background-secondary p-5 rounded-3xl text-foreground w-fit ">
        <TextInput
          className={cn(
            " placeholder:text-zinc-500 text-foreground text-xl text-center pr-1 ",
            className,
          )}
          keyboardType="numeric"
          {...rest}
          maxLength={2}
        />
      </View>
    )
  }
}

export default Input
