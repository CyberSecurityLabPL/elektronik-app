import { useLuckyNumber } from "@/hooks/lucky-number/useLuckyNumber"
import { useUserData } from "@/hooks/useUserData"
import { cn } from "@/lib/utils"
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
                "bg-background": variant === 'inverted'
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
                <Text className={cn("text-background text-xl font-bold", {
                    "text-background": variant === 'classic',
                    "text-primary": variant === 'inverted',
                })}>{children}</Text>
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
    const {
        data,
        isLoading,
        isError,
        isRefetching
    } = useLuckyNumber()
    const { t } = useTranslation()

    return (
        <View
            className="flex gap-x-8 flex-row text-center justify-center px-10"
            accessibilityRole="text"
        >
                <Text className="text-center text-lg align-middle text-foreground">{t('LuckyNumber.title')}</Text>
            <Badge
                isError={isError}
                isLoading={isLoading || isRefetching}
                withIcon 
            >{data?.data.value}</Badge>
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

    if (userData?.diaryNumber === data?.data.value) return (
        <View className="flex mt-4 relative">
            <View   
                className="bg-primary p-4 rounded-2xl flex flex-row items-center flex-wrap"
            >
                <Badge
                    isError={isError}
                    isLoading={isLoading || isRefetching}
                    variant="inverted"
                    withIcon
                >{data?.data.value}</Badge>
                <View className="flex-1 ml-4">
                    <Text className="font-pregular font-semibold text-background text-lg">{t('LuckyNumber.match')}</Text>
                </View>
            </View>
        </View>
    )

    return null
}