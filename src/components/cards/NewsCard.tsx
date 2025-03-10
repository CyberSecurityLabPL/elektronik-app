import useColors from "@/hooks/useColors"
import { cn } from "@/lib/utils"
import { ArrowUpRight, Clock } from "lucide-react-native"
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native"

const placeholderImage = require("../../assets/images/default-banner.png")

interface BaseCardProps {
  image?: string
  title: string
  date: string
  isNew?: boolean
  isFeatured?: boolean
}

interface FeaturedCardProps extends BaseCardProps {
  description: string
}

interface NotFeaturedCardProps extends BaseCardProps {
  description?: null
}

export type NewsCardProps = (FeaturedCardProps | NotFeaturedCardProps) &
  TouchableOpacityProps

export default function NewsCard({
  image,
  title,
  description,
  date,
  isFeatured,
  isNew,
  ...props
}: NewsCardProps) {
  const colors = useColors()

  if (isFeatured)
    return (
      <TouchableOpacity
        className="rounded-2xl overflow-hidden"
        activeOpacity={0.85}
        {...props}
      >
        <View className="relative">
          <Image
             source={image ? { uri: image } : placeholderImage}
            className="w-full h-52 relative top-0 left-0 object-cover"
          />
          {isNew ? (
            <View className="absolute right-4 bottom-4">
              <NewIndicator />
            </View>
          ) : null}
        </View>
        <View className="bg-background p-4 flex flex-col gap-6 justify-center items-center w-full">
          <View className="flex flex-col justify-center items-start gap-2 w-full">
            <View>
              <Text className="text-2xl font-pmedium text-foreground">
                {title}
              </Text>
            </View>
            <View>
              <Text className="text-base font-pregular text-foreground">
                {description}
              </Text>
            </View>
          </View>
          <View className="flex flex-row justify-between items-center w-full">
            <View className="flex flex-row justify-center items-center gap-2">
              <View className="flex justify-center items-center">
                <Clock size={20} color={colors.foreground} />
              </View>
              <View className="flex justify-center items-center">
                <Text className="font-pmedium flex justify-center items-center text-foreground">
                  {date}
                </Text>
              </View>
            </View>
            <View className="p-2 rounded-full bg-foreground">
              <ArrowUpRight size={24} color={colors.background} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  else
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        className="w-full flex flex-row rounded-2xl overflow-hidden relative"
        {...props}
      >
        {isNew ? (
          <View className="absolute left-2 top-2">
            <NewIndicator />
          </View>
        ) : null}
        <ImageBackground
          source={image ? { uri: image } : placeholderImage}
          className="object-cover w-5/12"
        />

        <View className="p-4 flex flex-col justify-center items-start gap-8 w-7/12 bg-background">
          <View>
            <Text className="text-xl font-pmedium text-foreground text-wrap flex-wrap">
              {title}
            </Text>
          </View>
          <View className="flex flex-row justify-between items-center w-full">
            <View className="flex flex-row justify-center items-center gap-2">
              <View className="flex justify-center items-center">
                <Clock size={20} color={colors.foreground} />
              </View>
              <View className="flex justify-center items-center">
                <Text className="font-pmedium text-sm flex justify-center items-center text-foreground">
                  {date}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
}

function NewIndicator({ small }: { small?: boolean }) {
  return (
    <View
      className={cn(`flex z-10 bg-primary justify-center items-center flex-row rounded-full`, {
        'py-0 px-2': small,
        'py-1 px-4': !small
      })}
    >
      <Text
        className={cn(`text-background font-pregular`, {
          'text-base': small,
          'text-lg': !small
        })}
      >
        Nowe
      </Text>
    </View>
  )
}
