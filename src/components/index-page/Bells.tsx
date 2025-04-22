import { Loader } from "@/components/Loader"
import { Pressable, View, Text } from "react-native"
import { useState, useMemo } from "react"
import Modal from "@/components/ui/Modal"
import useColors from "@/hooks/useColors"
import { useTranslation } from "react-i18next"
import IconButton from "@/components/ui/IconButton"
import { X } from "lucide-react-native"
import { format, isWithinInterval, set } from "date-fns"
import { cn } from "@/lib/utils"
import useTimeLessons from "@/hooks/useTimeLessons"
import { StrapiLesson } from "@/types/strapi"
import { useBells } from "@/hooks/bells/useBells"

export const BellsBlock = () => {
    const [isBellModalOpen, setIsBellModalOpen] = useState(false)
    const colors = useColors()
    const { t } = useTranslation()

    const { data: bells } = useBells()

    const lessons = useMemo(() => {
        return Object.values(bells?.data[0]?.lessons ?? {}).filter(
            (item) => typeof item === "object" && item !== null && "id" in item,
        ) as StrapiLesson[]
    }, [bells])

    const { minutes, message, isLessonsEnded } = useTimeLessons({ lessons })

    return (<>
        <Pressable
            onPress={() => setIsBellModalOpen(true)}
            className="flex flex-row mt-6"
        >
            <View className={cn("bg-background-secondary rounded-3xl p-6 gap-4 w-2/3", {
                'w-full': isLessonsEnded
            })}>
                <Text className="font-pregular text-foreground text-left text-lg">
                    {(lessons.length > 0)
                        ? message
                        : t('General.loading')
                    }
                </Text>
            </View>
            {!isLessonsEnded && (
                <View className="w-1/3 flex justify-center items-center flex-col">
                    <Text className="text-primary font-psemibold text-2xl flex-wrap text-center">
                        {minutes == 0 ? <Loader color={colors.primary} /> : minutes}
                    </Text>
                    <Text
                        className={cn(
                            minutes == 0 ? "hidden" : "flex",
                            "text-primary font-pregular text-xl  text-center",
                        )}
                    >
                        {t("Home.minutes")}
                    </Text>
                </View>
            )}
        </Pressable>
        <Modal
            id="bells"
            isOpen={isBellModalOpen}
            onClose={() => setIsBellModalOpen(false)}
        >
            <View className="w-96 rounded-2xl flex flex-col justify-between items-center bg-background">
                <View className="py-4">
                    <Text className="text-3xl text-foreground font-pmedium text-center p-6">
                        {t("Home.bells")}
                    </Text>

                    {lessons.map((lesson, index) => {
                        const start = set(new Date(), {
                            hours: Number(lesson.startDate.toString().slice(0, -10)),
                            minutes: Number(lesson.startDate.toString().slice(3, -7)),
                        })
                        const end = set(new Date(), {
                            hours: Number(lesson.endDate.toString().slice(0, -10)),
                            minutes: Number(lesson.endDate.toString().slice(3, -7)),
                        })

                        const isSelected = isWithinInterval(new Date(), { start, end })

                        return (
                            <Text
                                className={cn(
                                    `text-center text-xl`,
                                    isSelected
                                        ? "text-primary bg-primary/20 px-4 py-1 rounded-lg"
                                        : "text-foreground",
                                )}
                                key={index}
                            >
                                {`${index}. `}
                                {format(start, "HH:mm ")}-{format(end, " HH:mm")}
                            </Text>
                        )
                    })}
                </View>
                <IconButton
                    LucideIcon={X}
                    iconColor={colors.foreground}
                    onPress={() => setIsBellModalOpen(false)}
                    className="my-4"
                />
            </View>
        </Modal>
    </>
    )
}