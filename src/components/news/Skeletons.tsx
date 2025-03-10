import { View } from "react-native"

export const PageLoadingSkeleton = () => (
    <View className="flex-1 w-full p-4 gap-4">
        <View className="w-full bg-background rounded-2xl animate-pulse">
            <View className="w-full h-48 dark:bg-zinc-500 bg-zinc-200 rounded-t-2xl" />
            <View className="w-full h-36 p-4 flex justify-between">
                <View>
                    <View className="w-4/5 h-6 dark:bg-zinc-500 bg-zinc-200 rounded-3xl" />
                    <View className=" w-3/5 h-3 dark:bg-zinc-500 bg-zinc-200 rounded-3xl mt-4" />
                </View>
                <View className="flex flex-row justify-between items-center w-full">
                    <View className="w-1/4 h-4 dark:bg-zinc-500 bg-zinc-200 rounded-3xl" />
                    <View className=" w-8 h-8 dark:bg-zinc-500 bg-zinc-200 rounded-full" />
                </View>
            </View>
        </View>
    </View>
)

export const LoadingSkeleton = () => (
    <View className="w-full h-48 bg-background rounded-xl animate-pulse flex flex-row gap-2">
        <View className="w-2/5 h-full pt-4 dark:bg-zinc-500 bg-zinc-200 rounded-l-2xl" />
        <View className="w-3/5 p-4">
            <View className="w-5/6 h-6  dark:bg-zinc-500 bg-zinc-200 rounded-3xl" />
            <View className="mt-4 w-3/4 h-5 dark:bg-zinc-500 bg-zinc-200 rounded-full" />
            <View className="mt-2 w-1/2 h-4 dark:bg-zinc-500 bg-zinc-200 rounded-full" />
        </View>
    </View>
)