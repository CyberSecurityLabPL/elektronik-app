import ScreenWrapper from "@/components/ScreenWrapper"
import { LogoSvg } from "@/components/svgs/LogoSvg"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import ProgressIndicator from "@/components/ui/ProgressIndicator"
import { Select, SelectItem } from "@/components/ui/Select"
import useColors from "@/hooks/useColors"
import { saveFirstTime, saveUserData } from "@/lib/utils"
import { router } from "expo-router"
import { Text, View } from "react-native"
import Circles from "@/components/svgs/Circles"
import Lines from "@/components/svgs/Lines"
import Multiplication from "@/components/svgs/Multiplication"
import SmallCircles from "@/components/svgs/SmallCircles"
import { UserData } from "@/types/utils"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

const SetUp = () => {
  const colors = useColors()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>()

  const goToHomeAsGuest = async () => {
    router.push("/home")
    await saveFirstTime()
  }
  const onSubmit: SubmitHandler<UserData> = async (data) => {
    await saveUserData({
      name: data.name,
      diaryNumber: data.diaryNumber,
      grade: data.grade,
    })
    await saveFirstTime()
    router.push("/home")
  }

  return (
    <ScreenWrapper className="flex justify-between items-center flex-col h-full w-full">
      <View className="flex flex-col justify-center items-center w-full gap-12">
        <View className="flex justify-start items-center">
          <ProgressIndicator progress={3} />
        </View>
        <View className="absolute top-4 -right-40 -z-10">
          <Multiplication color={colors.svg.multiplication} />
        </View>
        <View className="flex justify-center items-center w-full flex-col h-fit p-2 gap-8">
          <View className="flex flex-row justify-center items-center w-full gap-3 relative">
            <LogoSvg />
            <Text className="font-psemibold text-4xl text-foreground text-center py-2 flex justify-center items-center relative top-1">
              Elektronik
            </Text>
          </View>
          <View className="flex justify-center items-center w-full flex-col gap-6">
            <View className="flex justify-center items-start flex-col w-full">
              <Text className={`text-foreground font-pmedium text-xl p-2`}>
                Podaj Imię
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
                    placeholder="Firstname"
                  />
                )}
                name="name"
              />
              {errors.name && (
                <Text className="text-red-400 ml-2">Podaj imię</Text>
              )}
            </View>
            <View className="w-full h-fit">
              <Text className={`text-foreground font-pmedium text-xl p-2`}>
                Podaj Klasę
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
                    placeholder="Wybierz klase"
                  >
                    <SelectItem label="1ta Technik Programista" value="1ta" />
                    <SelectItem label="1tb Technik Programista" value="1tb" />
                  </Select>
                )}
                name="grade"
              />
              {errors.grade && (
                <Text className="text-red-400 ml-2">Wybierz klase</Text>
              )}
            </View>
            <View className="flex justify-center items-center flex-col w-full">
              <Text
                className={`text-foreground font-pmedium text-xl p-2 self-start`}
              >
                Wybierz numer z dziennika
              </Text>
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
                  />
                )}
                name="diaryNumber"
              />
              {errors.diaryNumber && (
                <Text className="text-red-400 ml-2">
                  Podaj prawidłowy numerek z dziennika
                </Text>
              )}
            </View>
          </View>
        </View>
      </View>
      <View className="flex justify-center w-full items-center flex-col gap-1">
        <Button
          variant="ghost"
          text="Kontynuuj jako gość"
          onPress={goToHomeAsGuest}
        />
        <Button text="Kontynuuj" onPress={handleSubmit(onSubmit)} />
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
    </ScreenWrapper>
  )
}

export default SetUp
