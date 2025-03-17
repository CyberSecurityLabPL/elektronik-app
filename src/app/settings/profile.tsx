import ScreenWrapper from "@/components/ScreenWrapper"
import Button from "@/components/ui/Button"
import Heading from "@/components/ui/Heading"
import Input from "@/components/ui/Input"
import { Select, SelectItem } from "@/components/ui/Select"
import { useTimetableInfo } from "@/hooks/timetable/useTimetable"
import { useUserData } from "@/hooks/useUserData"
import { setStorageData, StorageKeys } from "@/lib/storage"
import { UserData } from "@/types/app-data"
import { router } from "expo-router"
import React, { useEffect } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Text, View } from "react-native"
import Animated, { useAnimatedKeyboard, useAnimatedStyle } from "react-native-reanimated"
import { toast } from "sonner-native"

const Profile = () => {
  const userData = useUserData()
  const { t } = useTranslation()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserData>()

  useEffect(() => {
    reset(userData)
  }, [userData])

  const onSubmit: SubmitHandler<UserData> = async (data) => {
    const result = await setStorageData(StorageKeys.userData, {
      name: data.name,
      diaryNumber: Number(data.diaryNumber),
      grade: data.grade,
    })
    if (result.success) {
      console.log("Data saved successfully:", result.data)
      toast.success(t("Toast.success"))
    } else {
      console.error("Error saving data:", result.error)
      toast.error(t("Toast.error"))
    }
    router.back()
  }

  const { data, isLoading, isError } = useTimetableInfo({ filter: "class" })

  const keyboard = useAnimatedKeyboard()

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: -(keyboard.height.value) }],
  }))

  return (
    <Animated.View
      style={[animatedStyles]}
    >
      <ScreenWrapper>
        <Heading title={t("Settings.profile.heading")} screen="settings" />
        <View className="flex justify-between items-center w-full flex-col flex-1">
          <View className="flex justify-center items-center flex-col w-full">
            <Controller
              control={control}
              rules={{
                required: true,
                pattern: /^\d+$/,
                max: 30,
                min: 1,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onChangeText={(value) => {
                    onChange(value)
                  }}
                  value={value?.toString()}
                  onBlur={onBlur}
                  type="number"
                  placeholder="0"
                  defaultValue={userData?.diaryNumber.toString() ?? ""}
                />
              )}
              name="diaryNumber"
            />
            <Text
              className={`text-foreground text-center font-pmedium text-xl p-2 `}
            >
              {t("Welcome.setUp.diaryNumber")}
            </Text>
            {errors.diaryNumber && (
              <Text className="text-red-400 ml-2">
                {t("Welcome.setUp.diaryNumberError")}
              </Text>
            )}
            <Text className="text-sm text-foreground text-center px-5">{t('Welcome.setUp.informationWhy')}</Text>
          </View>
          <View className="w-full gap-6 -mt-5">
            <View className="flex justify-center items-start flex-col w-full">
              <Text className={`text-foreground font-pmedium text-xl p-2`}>
                {t("Welcome.setUp.name")}
              </Text>

              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    onBlur={onBlur}
                    type="text"
                    placeholder={t("Welcome.setUp.name")}
                    defaultValue={userData?.name.toString() ?? ""}
                  />
                )}
                name="name"
              />
              {errors.name && (
                <Text className="text-red-400 ml-2">
                  {t("Welcome.setUp.nameError")}
                </Text>
              )}
            </View>
            <View className="w-full h-fit">
              <Text className={`text-foreground font-pmedium text-xl p-2`}>
                {t("Welcome.setUp.class")}
              </Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <Select
                    selectedValue={value}
                    onValueChange={(itemValue: any) => onChange(itemValue)}
                    placeholder={t("Welcome.setUp.class")}
                  >
                    {data?.map((item) => (
                      <SelectItem
                        key={item.id}
                        label={item.name.slice(0, 4) + item.name.slice(5)}
                        value={item.id}
                      />
                    ))}
                  </Select>
                )}
                name="grade"
              />
              {errors.grade && (
                <Text className="text-red-400 ml-2">
                  {t("Welcome.setUp.classError")}
                </Text>
              )}
            </View>
          </View>
          <View className="w-full flex flex-col gap-y-2">
            <Text className="text-sm text-foreground text-center">{t('Welcome.setUp.privacyDisclaimer')}</Text>
            <Button text={t("Button.continue")} onPress={handleSubmit(onSubmit)} />
          </View>
        </View>
      </ScreenWrapper>
    </Animated.View>
  )
}

export default Profile
