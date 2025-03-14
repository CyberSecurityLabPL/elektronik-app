import { useLuckyNumber } from "@/hooks/lucky-number/useLuckyNumber"
import useColors from "@/hooks/useColors"
import { useUserData } from "@/hooks/useUserData"
import { cn } from "@/lib/utils"
import { Clover, LoaderCircle } from "lucide-react-native"
import { memo } from "react"
import { useTranslation } from "react-i18next"
import { Text, View } from "react-native"
import { Loader } from "./Loader"

const Badge = memo(({ 
    isLoading, 
    isError, 
    children, 
    variant = 'classic', 
    withIcon 
  }: { 
    isLoading: boolean;
    isError: boolean;
    children?: string | number;
    variant?: 'classic' | 'inverted';
    withIcon?: boolean;
  }) => {
    const { t } = useTranslation()

    return (
        <View   
            className={cn("flex items-center justify-center text-center rounded-2xl w-14 h-14", {
                "bg-primary": variant === 'classic',
                "bg-foreground": variant === 'inverted'
            })}
            accessibilityRole="text"
            accessibilityLabel={
                    isLoading
                    ? t('LuckyNumber.accesibility.loading')
                    : isError
                        ? t('LuckyNumber.accesibility.error')
                        : `${t('LuckyNumber.title')} ${children}`
            }
        >
            { isLoading || isError ? (
                <Loader />
            ) : (
                <Text className="text-background text-xl font-bold">{children}</Text>
            )}
            { withIcon && (
                <View className="absolute -right-2 -top-2">
                    <Text className="text-xl">🍀</Text>
                </View>
            )}
        </View>
    )
})

export const WideLuckyNumber = memo(() => {
    const colors = useColors()
    const {
        data,
        isLoading,
        isError,
        isRefetching
    } = useLuckyNumber()
    const { t } = useTranslation()

    return (
        <View
            className="flex gap-x-8 flex-row text-center justify-center"
            accessibilityRole="text"
        >
            <View className="flex flex-row gap-x-4 text-center justify-center items-center">
                <Clover stroke={colors.foreground} size={32} />
                <Text className="text-center text-lg align-middle">{t('LuckyNumber.title')}</Text>
            </View>
            <Badge
                isError={isError}
                isLoading={isLoading || isRefetching}    
            >{data?.data?.attributes?.value ?? ''}</Badge>
        </View>
    )
})

export const LabelLuckyNumber = () => {
    const {
        data,
        isLoading,
        isError,
        isRefetching
    } = useLuckyNumber()
    const userData = useUserData()
    const { t } = useTranslation()

    if (userData?.diaryNumber === data?.data?.attributes?.value) return (
        <View className="flex flex-row gap-x-4 items-center mt-4 relative overflow-visible">
            <View   
                className="bg-primary p-4 rounded-2xl flex flex-row gap-x-4 items-center"
            >
                <Badge
                    isError={isError}
                    isLoading={isLoading || isRefetching}
                    variant="inverted"
                    withIcon
                >{data?.data?.attributes?.value}</Badge>
                <View className="w-4/5">
                    <Text className="font-pregular font-semibold text-background text-lg">{t('LuckyNumber.match')}</Text>
                </View>
            </View>
        </View>
    )

    return null
}