import ScreenWrapper from "@/components/ScreenWrapper"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import ProgressIndicator from "@/components/ui/ProgressIndicator"
import { Select, SelectItem } from "@/components/ui/Select"
import useColors from "@/hooks/useColors"
import { setStorageData, StorageKeys } from "@/lib/storage"
import { UserData } from "@/types/app-data"
import { router } from "expo-router"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native"

import {
  Circles,
  Lines,
  LogoSvg,
  Multiplication,
  SmallCircles,
} from "@/components/icons"
import { useTimetableInfo } from "@/hooks/timetable/useTimetable"
import Animated, { useAnimatedKeyboard, useAnimatedStyle } from "react-native-reanimated"

const SetUp = () => {
  const colors = useColors()
  const { t } = useTranslation()
  const keyboard = useAnimatedKeyboard()

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: -(keyboard.height.value) }],
  }))

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      grade: "",
      diaryNumber: 0,
    },
  })

  const goToHomeAsGuest = async () => {
    router.navigate("/(tabs)")
    await setStorageData(StorageKeys.firstTimeUser, false)
  }

  const onSubmit: SubmitHandler<UserData> = async (data) => {
    const result = await setStorageData(StorageKeys.userData, {
      name: data.name,
      diaryNumber: Number(data.diaryNumber),
      grade: data.grade,
    })

    if (result.success) {
      console.log("Data saved successfully:", result.data)
    } else {
      console.error("Error saving data:", result.error)
    }
    await setStorageData(StorageKeys.firstTimeUser, false)
    router.navigate("/(tabs)")
  }

  const { data } = useTimetableInfo({ filter: "class" })

  return (
    <ScreenWrapper>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}><>
      <Animated.View
        className="flex justify-between items-center flex-col h-full w-full"
        style={[animatedStyles]}
      >
      <View
        className="flex flex-col justify-center items-center w-full gap-12"
      >
        <View className="flex justify-start items-center">
          <ProgressIndicator progress={3} />
        </View>
        <View className="absolute top-4 -right-40 -z-10">
          <Multiplication color={colors.svg.multiplication} />
        </View>
        <View className="flex justify-center items-center w-full flex-col h-fit p-2 gap-2">
          <View className="flex flex-row justify-center items-center w-full gap-3 relative">
            <LogoSvg />
            <Text className="font-psemibold text-4xl text-foreground text-center py-2 flex justify-center items-center relative top-1">
              Elektronik
            </Text>
          </View>
          <Text className="text-center text-foreground text-sm">{t('Welcome.setUp.informationWhy')}</Text>
            <View className="flex justify-center items-center w-full flex-col gap-6">
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
                      containerClassName="border border-foreground/20"
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
                      enabled={data ? true : false}
                      className="border border-foreground/20"
                    >
                      {(data) ? data.map((item) => (
                        <SelectItem
                          key={item.id}
                          label={item.name.slice(0,4) + item.name.slice(5)}
                          value={item.id}
                        />
                      )) : (
                        <SelectItem
                          label={t('Welcome.setUp.timetableErrorItem')}
                          enabled={false}
                          />
                      )}
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
              <View className="flex justify-center items-center flex-col w-full">
                <Text
                  className={`text-foreground text-center w-full font-pmedium text-xl p-2 self-start`}
                >
                  {t("Welcome.setUp.diaryNumber")}
                </Text>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                    pattern: /[0-9]+/,
                    max: 30,
                    min: 1,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      onChangeText={(value) => {
                        onChange(value)
                      }}
                      value={value.toString()}
                      onBlur={onBlur}
                      type="number"
                      placeholder="0"
                      containerClassName="border border-foreground/20"
                    />
                  )}
                  name="diaryNumber"
                />
                {errors.diaryNumber && (
                  <Text className="text-red-400 ml-2">
                    {t("Welcome.setUp.diaryNumberError")}
                  </Text>
                )}
              </View>
            </View>
        </View>
      </View>
      <View className="flex justify-center w-full items-center flex-col gap-1">
        <Text className="text-sm text-foreground">{t('Welcome.setUp.privacyDisclaimer')}</Text>
        <Button
          variant="ghost"
          text={t("Button.guest")}
          onPress={goToHomeAsGuest}
        />
        <Button text={t("Button.continue")} onPress={handleSubmit(onSubmit)} />
      </View>

      <View className="absolute bottom-96 -left-8 -z-10">
        <Lines color={colors.svg.lines} />
      </View>
      <View className="absolute bottom-72 -right-24 -z-10">
        <Circles color={colors.svg.circles} />
      </View>
      <View className="absolute bottom-2 -left-16 -z-10">
        <SmallCircles color={colors.svg.smallCircles} />
      </View>
      <View className="absolute top-0 right-0 -z-10"></View>
      </Animated.View>
      </></TouchableWithoutFeedback>
    </ScreenWrapper>
  )
}

export default SetUp
