import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { Text, Animated, Dimensions, Pressable, View } from "react-native"

const MARGIN = 4
const START_POSITION = MARGIN

export const Tabs = ({ tabs, setTabs }: { tabs: 'article' | 'announcment', setTabs: React.Dispatch<React.SetStateAction<'article' | 'announcment'>> }) => {
    const { t } = useTranslation()

    const containerWidth = Dimensions.get("window").width - 24
    const tabWidth = (containerWidth - 32) / 2

    const END_POSITION = tabWidth + MARGIN

    const slideAnim = useRef(new Animated.Value(0)).current

    const animateSlide = (toValue: string) => {
        Animated.spring(slideAnim, {
            toValue: toValue === 'article' ? START_POSITION : END_POSITION,
            useNativeDriver: true,
            tension: 80,
            friction: 10,
        }).start()
    }

    useEffect(() => {
        animateSlide(tabs)
    }, [tabs])

    return (
        <View className="bg-background-secondary h-16 rounded-2xl flex flex-row justify-around items-center px-2 relative overflow-hidde">
            <Animated.View
                style={[{
                    position: 'absolute',
                    width: tabWidth - MARGIN * 2,
                    height: 48,
                    backgroundColor: "#6994ff",
                    borderRadius: 12,
                    transform: [{ translateX: slideAnim }],
                }]} />
            <Pressable
                onPress={() => setTabs('article')}
                className="w-1/2 h-12 flex justify-center items-center" >
                <Text
                    className={cn("text-xl font-psemibold", {
                        "text-white": tabs === 'article',
                        "text-zinc-600": tabs === 'announcment',
                    })} >
                    {t("News.tabs.council")}
                </Text>
            </Pressable>
            <Pressable
                onPress={() => setTabs('announcment')}
                className="w-1/2 h-12 flex justify-center items-center" >
                <Text
                    className={cn("text-xl font-psemibold", {
                        "text-white": tabs === 'announcment',
                        "text-zinc-600": tabs === 'article',
                    })} >
                    {t("News.tabs.school")}
                </Text>
            </Pressable>
        </View>
    )
}