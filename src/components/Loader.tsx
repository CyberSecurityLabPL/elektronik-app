import useColors from "@/hooks/useColors";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react-native";
import { memo } from "react";
import { View } from "react-native";
import { ClassNameValue } from "tailwind-merge";

export const Loader = memo(({ className, color, size = 16 }: { className?: ClassNameValue, color?: string, size?: number } ) => {
    const colors = useColors()

    return (
        <View className={cn("animate-spin", className)}>
            <LoaderCircle size={size} color={color || colors.background} />
        </View>
    )
})