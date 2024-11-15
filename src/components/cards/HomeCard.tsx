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
        className="bg-transparent rounded-3xl"
        activeOpacity={0.85}
        {...props}
      >
        <ImageBackground
          source={require("../../assets/images/backgrounds/EventCardBg.png")}
          className="rounded-3xl w-full p-6 bg-cover  flex flex-col gap-4 "
          imageStyle={{
            borderRadius: 24,
            resizeMode: "cover",
          }}
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
        </ImageBackground>
      </TouchableOpacity>
    )
  } else {
    return (
      <TouchableOpacity
        className="  bg-transparent rounded-3xl  "
        onPress={() => console.log("News")}
        activeOpacity={0.85}
        {...props}
      >
        <ImageBackground
          source={
            type == "school"
              ? require("../../assets/images/backgrounds/RedCardBg.png")
              : require("../../assets/images/backgrounds/PurpleCardBg.png")
          }
          className="rounded-3xl w-full p-2 bg-cover"
          imageStyle={{
            borderRadius: 24,
            resizeMode: "cover",
          }}
        >
          <View
            className={cn(
              type == "school" ? "bg-red-400" : "bg-purple-400",
              " w-fit self-start p-5 rounded-full rounded-br-none",
            )}
          >
            <View className="bg-white w-fit self-start  p-2 rounded-lg">
              <Newspaper
                color={type == "school" ? "red" : "#D3ABFC"}
                size={24}
              />
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
        </ImageBackground>
      </TouchableOpacity>
    )
  }
}
