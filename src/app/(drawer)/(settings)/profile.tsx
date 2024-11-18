import ScreenWrapper from "@/components/ScreenWrapper"
import Button from "@/components/ui/Button"
import Heading from "@/components/ui/Heading"
import Input from "@/components/ui/Input"
import { Select, SelectItem } from "@/components/ui/Select"
import { useUserData } from "@/hooks/useUserData"
import { setStorageData, StorageKeys } from "@/lib/storage"
import { UserData } from "@/types/app-data"
import { router } from "expo-router"
import React, { useEffect } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Text, View } from "react-native"
import { toast } from "sonner-native"

const Profile = () => {
  const userData = useUserData()

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
    console.log(data)

    const result = await setStorageData(StorageKeys.userData, {
      name: data.name,
      diaryNumber: Number(data.diaryNumber),
      grade: data.grade,
    })
    if (result.success) {
      console.log("Data saved successfully:", result.data)
      toast.success("Dane zostały zapisane")
    } else {
      console.error("Error saving data:", result.error)
      toast.error("Wystąpił błąd")
    }
    router.back()
  }

  return (
    <ScreenWrapper>
      <Heading title="Profil" screen="settings" />
      <View className="flex justify-between items-center w-full flex-col gap-7  flex-1">
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
          <Text className={`text-foreground font-pmedium text-xl p-2 `}>
            Numer w dzienniku
          </Text>
          {errors.diaryNumber && (
            <Text className="text-red-400 ml-2">
              Podaj prawidłowy numerek z dziennika
            </Text>
          )}
        </View>
        {/* dolne */}
        <View className="w-full gap-8">
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
                  defaultValue={userData?.name.toString() ?? ""}
                />
              )}
              name="name"
            />
            {errors.name && (
              <Text className="text-red-400 ml-2">{errors.name.type}</Text>
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
        </View>
        <Button text="Kontynuuj" onPress={handleSubmit(onSubmit)} />
      </View>
    </ScreenWrapper>
  )
}

export default Profile
