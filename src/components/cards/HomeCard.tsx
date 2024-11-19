import { cn } from "@/lib/utils"
import {
  ArrowUpRight,
  CalendarDays,
  Clock,
  Newspaper,
} from "lucide-react-native"
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native"

interface BaseCardProps {
  title: string
  date: string
  type: "school" | "council" | "event"
}

interface EventCardProps extends BaseCardProps {
  type: "event"
  description?: string // Optional for event type
}

interface NewsCardProps extends BaseCardProps {
  type: "school" | "council"
  description: string // Required for school and council types
}

type CardProps = (EventCardProps | NewsCardProps) & TouchableOpacityProps

export default function HomeCard({
  title,
  description,
  date,
  type,
  ...props
}: CardProps) {
  if (type == "event") {
    return (
      <TouchableOpacity
        className="rounded-3xl w-full p-6 flex flex-col gap-4 bg-[#FFB55F]"
        activeOpacity={0.85}
        {...props}
      >
        <View className="flex justify-between flex-row items-center">
          <View className="flex flex-row gap-2 justify-center items-center">
            <View className="bg-white w-fit self-start  p-2 rounded-lg">
              <CalendarDays color="orange" size={24} />
            </View>
            <Text className="text-lg text-white font-pmedium">{date}</Text>
          </View>
          <View className="bg-black rounded-full p-2">
            <ArrowUpRight size={24} color="white" />
          </View>
        </View>
        <Text className="text-xl font-pmedium text-white mb-2">{title}</Text>
      </TouchableOpacity>
    )
  } else {
    return (
      <TouchableOpacity
        className={cn(
          "rounded-3xl w-full p-2",
          type == "school" ? "bg-[#ff8686]" : "bg-purple-300",
        )}
        onPress={() => console.log("News")}
        activeOpacity={0.85}
        {...props}
      >
        <View
          className={cn(
            type == "school" ? "bg-red-400" : "bg-purple-400",
            " w-fit self-start p-5 rounded-full rounded-br-none",
          )}
        >
          <View className="bg-white w-fit self-start  p-2 rounded-lg">
            <Newspaper color={type == "school" ? "red" : "#D3ABFC"} size={24} />
          </View>
        </View>
        <View className="p-4 pt-0 flex flex-col gap-6">
          <View className="flex flex-col gap-2">
            <Text className="text-2xl font-pmedium mt-4 ">{title}</Text>
            <Text className="font-pregular truncate line-clamp-4 text-base">
              {description}
            </Text>
          </View>

          <View className="flex justify-between flex-row items-center">
            <View className="bg-black rounded-full p-2">
              <ArrowUpRight size={24} color="white" />
            </View>
            <View className="flex flex-row gap-2 items-center  ">
              <Text className="font-pmedium text-xs">{date}</Text>
              <Clock size={16} color={"black"} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
