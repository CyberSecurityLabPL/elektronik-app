import { Settings, X } from "lucide-react-native"
import { memo, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Pressable, Text, View } from "react-native"
import Modal from "../ui/Modal"
import useColors from "@/hooks/useColors"
import IconButton from "../ui/IconButton"
import LargeButton from "../ui/LargeButton"
import { useTimetableSettings } from "@/hooks/useTimetableSettings"
import { setStorageData, StorageKeys } from "@/lib/storage"
import { TimetableSettings } from "@/types/app-data"
import Switch from "../ui/Switch"
import { useTimetableValidDate } from "@/hooks/timetable/valid-date/useTimetableValidDate"

const setTimetableSettings = async (data: TimetableSettings) => {
    const result = await setStorageData(StorageKeys.timetable, data)

    if (!result.success) {
        console.error("Failed to save settings:", result.error)
        return result.error
    }
    console.log("Timetable settings saved: ", result.data)
    return true
}

export const TimetableHeader = () => {
    const [defaultSettingsError, setDefaultSettingsError] = useState<boolean>(false)
    const {
        data: timetableSettingsData,
        isLoading: timetableSettingsLoading,
    } = useTimetableSettings()
    const [settingsModalOpen, setSettingsModalOpen] = useState<boolean>(false)
    const { t } = useTranslation()
    const colors = useColors()

    useEffect(() => {
        const setupDefaultSettings = async () => {
            // using == instead of === because null == undefined so it checks for both
            if (timetableSettingsData?.group == null || timetableSettingsData?.religion == null) {
                try {
                    await setTimetableSettings({
                        group: 1,
                        religion: false
                    })   
                    setDefaultSettingsError(false)
                } catch {
                    setDefaultSettingsError(true)
                }
            }
        }

        // checking if data is loaded already
        if (!timetableSettingsLoading) {
            setupDefaultSettings()
        }
    }, [timetableSettingsData])

    return (
        <>
            <View className="flex flex-row justify-between items-center w-full py-4 px-8">
                <Text className="text-foreground font-psemibold text-3xl">
                    {t("Timetable.heading")}
                </Text>
                <Pressable
                    onPress={() => setSettingsModalOpen(true)}
                >
                    <View className="flex justify-center items-center bg-background-secondary p-2 rounded-xl">
                        <Settings size={24} color={"#B6B6D9"} />
                    </View>
                </Pressable>
            </View>
            <Modal
                id="timetable-settings"
                isOpen={settingsModalOpen}
                onClose={() => setSettingsModalOpen(false)}
            >
                <View className="w-96 rounded-2xl flex flex-col justify-between items-center bg-background">
                    <View className="p-6 w-full flex gap-4">
                        <Text className="text-3xl text-foreground font-pmedium text-center pt-6">
                            {t("Timetable.modal.heading")}
                        </Text>
                        <ValidDate />
                        { defaultSettingsError && (
                            <Text className="text-red-500">{t('Timetable.error.setDefaultGroup')}</Text>
                        ) }
                        <GroupChangeInputs />
                        <ReligionChangeInput />
                    </View>
                    <IconButton
                        LucideIcon={X}
                        iconColor={colors.foreground}
                        onPress={() => setSettingsModalOpen(false)}
                        className="my-4"
                    />
                </View>
            </Modal>
        </>
    )
}

const GroupChangeInputs = () => {
    const [changeSettingsError, setChangeSettingsError] = useState<boolean>(false)
    const {
        data: timetableSettingsData
    } = useTimetableSettings()
    const { t } = useTranslation()

    const handleGroupChange = async (group: number) => {
        try {
            await setTimetableSettings({
                group,
                religion: timetableSettingsData?.religion || false
            })
            setChangeSettingsError(false)
        } catch {
            setChangeSettingsError(true)
        }
    }

    return (
        <>
        { changeSettingsError && (
            <Text className="text-red-500">{t('Timetable.error.changeGroup')}</Text>
        )}
        <View className="flex flex-row justify-between items-center gap-4">
            <Text className="text-foreground font-pmedium text-lg">
                {t("Timetable.modal.group")}
            </Text>
            <View className="flex flex-row justify-center items-center w-full gap-4">
                <LargeButton
                    className="w-20"
                    text="1"
                    selected={timetableSettingsData?.group === 1}
                    onPress={() => handleGroupChange(1)}
                />
                <LargeButton
                    className="w-20"
                    text="2"
                    selected={timetableSettingsData?.group === 2}
                    onPress={() => handleGroupChange(2)}
                />
            </View>
        </View>
        </>
    )
}

const ReligionChangeInput = () => {
    const { t } = useTranslation()
    const {
        data: timetableSettingsData
    } = useTimetableSettings()
    const [changeSettingsError, setChangeSettingsError] = useState<boolean>(false)

    const handleReligionChange = async (religion: boolean) => {
        try {
            await setTimetableSettings({
                group: timetableSettingsData?.group || 1,
                religion
            })
            setChangeSettingsError(false)
        } catch {
            setChangeSettingsError(true)
        }
    }

    return (
        <>
        { changeSettingsError && (
            <Text className="text-red-500">{t('Timetable.error.changeReligion')}</Text>
        )}
        <View className="flex flex-row justify-between items-center gap-4">
            <Text className="text-foreground font-pmedium text-lg">
                {t("Timetable.modal.showRel")}
            </Text>
            <Switch
                isEnabled={timetableSettingsData?.religion || false}
                onToggle={() => handleReligionChange(!timetableSettingsData?.religion)}
            />
        </View>
        </>    
    )
}

const ValidDate = memo(() => {
    const {
        data: timetableValidDate,
        isLoading: timetableValidDateLoading
    } = useTimetableValidDate()

    if (timetableValidDateLoading) {
        return (
            <View className="w-full flex flex-row justify-center items-center pb-4">
                <View className="h-6 w-4/5 bg-background-secondary animate-pulse rounded-2xl" />
            </View>
        )
    }

    console.log(timetableValidDate)

    return (
        <View className="flex flex-row gap-x-2 justify-center items-center pb-4">
            <Text className="text-foreground">Plan obowiązuje od:</Text>
            <Text className="bg-primary text-background px-2 py-1 rounded-lg">{timetableValidDate?.date || 'Brak danych'}</Text>
        </View>
    )
})