import { ArrowUpRight, Clock } from "lucide-react-native"
import {
  Image,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native"

interface BaseCardProps {
  image: string
  title: string
  date: string
  isNew?: boolean
}

interface FeaturedCardProps extends BaseCardProps {
  description: string
  isFeatured: true
}

interface NotFeaturedCardProps extends BaseCardProps {
  isFeatured?: false
  description?: null
}

type CardProps = (FeaturedCardProps | NotFeaturedCardProps) &
  TouchableOpacityProps

export default function NewsCard({
  image,
  title,
  description,
  date,
  isFeatured,
  isNew,
  ...props
}: CardProps) {
  if (isFeatured)
    return (
      <TouchableOpacity
        className="rounded-2xl overflow-hidden "
        activeOpacity={0.85}
        {...props}
      >
        <View className="relative">
          <Image
            source={{
              uri: image,
            }}
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
                <Clock size={20} color={"black"} />
              </View>
              <View className="flex justify-center items-center">
                <Text className="font-pmedium flex justify-center items-center text-foreground">
                  {date}
                </Text>
              </View>
            </View>
            <View className="p-2 rounded-full bg-foreground">
              <ArrowUpRight size={24} color={"white"} />
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
      >
        {isNew ? (
          <View className="absolute left-2 top-2">
            <NewIndicator />
          </View>
        ) : null}
        <Image source={{ uri: image }} className="object-cover w-5/12" />
        <View className="p-4 flex flex-col justify-center items-start gap-8 w-7/12 bg-background-secondary">
          <View>
            <Text className="text-2xl font-pmedium text-foreground">
              {title}
            </Text>
          </View>
          <View className="flex flex-row justify-between items-center w-full">
            <View className="flex flex-row justify-center items-center gap-2">
              <View className="flex justify-center items-center">
                <Clock size={20} color={"black"} />
              </View>
              <View className="flex justify-center items-center">
                <Text className="font-pmedium flex justify-center items-center text-foreground">
                  {date}
                </Text>
              </View>
            </View>
            <View className="p-2 rounded-full bg-foreground">
              <ArrowUpRight size={24} color={"white"} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
}

function NewIndicator({ small }: { small?: boolean }) {
  return (
    <View
      className={`flex z-10 bg-primary justify-center items-center flex-row ${
        small ? "py-0" : "py-1"
      } ${small ? "px-2" : "px-4"} rounded-full`}
    >
      <Text
        className={`text-background ${
          small ? "text-base" : "text-lg"
        } font-pregular`}
      >
        Nowe
      </Text>
    </View>
  )
}
