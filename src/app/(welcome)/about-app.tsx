import ScreenWrapper from "@/components/ScreenWrapper"
import NoDataSvg from "@/components/svgs/NoDataSvg"
import DayTab from "@/components/timetable/DayTab"
import Lesson from "@/components/timetable/Lesson"
import TimetableSelect from "@/components/TimetableSelect"
import IconButton from "@/components/ui/IconButton"
import Input from "@/components/ui/Input"
import LargeButton from "@/components/ui/LargeButton"
import Modal from "@/components/ui/Modal"
import Switch from "@/components/ui/Switch"
import { TimetableInfoResponse } from "@/hooks/timetable/types"
import {
  useTimetable,
  useTimetableAllInfo,
} from "@/hooks/timetable/useTimetable"
import useColors from "@/hooks/useColors"
import { getDayOfWeek } from "@/lib/utils"
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet"
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types"
import { add, format, isWeekend, startOfWeek } from "date-fns"
import { pl } from "date-fns/locale/pl"
import {
  DoorOpen,
  GraduationCap,
  Settings,
  Users,
  X,
} from "lucide-react-native"
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { FlatList, Pressable, RefreshControl, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

type classDays = "poniedzialek" | "wtorek" | "sroda" | "czwartek" | "piatek"
type allDays = classDays | "sobota" | "niedziela"

const Timetable = () => {
  const [group, setGroup] = useState(1)
  const [showReligion, setShowReligion] = useState(false)

  const [selectedTimetable, setSelectedTimetable] = useState("o25")
  const {
    data,
    isLoading,
    isError,
    error,
    refetch: refetchTimetable,
    isRefetching: isRefetchingTimetable,
  } = useTimetable({ id: selectedTimetable })
  const {
    data: info,
    isError: isInfoError,
    error: infoError,
    isRefetching: isRefetchingInfo,
    refetch: refetchInfo,
  } = useTimetableAllInfo()

  useEffect(() => {
    refetchTimetable()
  }, [data, selectedTimetable])

  const [settingsModalOpen, setSettingsModalOpen] = useState(false)

  const getDayName = (date: Date) =>
    format(date, "EEEE", { locale: pl })
      .replaceAll("ł", "l")
      .replaceAll("ś", "s")
      .replaceAll("ą", "a") as allDays

  const [day, setDay] = useState<allDays>(
    getDayName(
      isWeekend(new Date())
        ? startOfWeek(add(new Date(), { days: 2 }), { locale: pl })
        : new Date(),
    ),
  )

  const bottomSheetRef = useRef<BottomSheet>(null)
  const handleOpenPress = () => bottomSheetRef.current?.expand()
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    [],
  )
  if (isError || isInfoError) {
    console.warn(
      "Zapewne masz zły URL planu lekcji, zmień go z localhost na ten komputera bo to tel fetchuje dane co potrzebujesz",
    )
    const err = isError ? error : infoError
    console.error(err)
  }
  const colors = useColors()

  return (
    <ScreenWrapper className="flex justify-top items-center w-full h-full px-0">
      <View className="flex flex-row justify-between items-center w-full py-4 px-8">
        <Text className="text-foreground font-psemibold text-3xl">
          Plan Lekcji
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setSettingsModalOpen(true)}
        >
          <View className="flex justify-center items-center bg-background-secondary p-2 rounded-xl">
            <Settings size={24} color={"#B6B6D9"} />
          </View>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between items-center pb-6 px-5 w-full">
        {Array(5)
          .fill("")
          .map((_, i) => (
            <DayTab
              key={`DayTab${i}`}
              day={format(getDayOfWeek(i + 1), "EEEEEE.", { locale: pl })}
              date={format(getDayOfWeek(i + 1), "dd.MM")}
              onPress={() => {
                setDay(getDayName(getDayOfWeek(i + 1)))
              }}
              active={day === getDayName(getDayOfWeek(i + 1))}
            />
          ))}
      </View>

      <View
        className="flex justify-center items-center px-4 w-full"
        style={{ marginBottom: 170 }}
      >
        <FlatList
          contentContainerClassName="pb-32"
          refreshControl={
            <RefreshControl
              refreshing={isRefetchingInfo || isRefetchingTimetable}
              onRefresh={() => {
                refetchTimetable()
                refetchInfo()
              }}
              tintColor={colors.primary}
              colors={[colors.primary]}
              progressBackgroundColor={colors.backgroundSecondary}
            />
          }
          ListEmptyComponent={isLoading ? <LoadingSkeleton /> : <NoData />}
          showsVerticalScrollIndicator={false}
          data={data?.lessons[day as classDays]}
          renderItem={({ item, index }) => {
            const groupIndex = item.isDouble && group === 2 ? 1 : 0

            if (
              item.isEmpty ||
              (item.classes.length === 1 &&
                item.classes[0].class.group != null &&
                item.classes[0].class.group?.charAt(0) != group.toString()) ||
              (!showReligion &&
                item.classes[0].subject.name.includes("religia"))
            )
              return null
            else
              return (
                <Lesson
                  teacherId={item.classes[groupIndex].teacher.id}
                  period={index}
                  time={data?.hours[index] ?? ""}
                  subject={item.classes[groupIndex].subject.name}
                  room={item.classes[groupIndex].classroom.shortname}
                  initials={item.classes[groupIndex].teacher.shortname}
                />
              )
          }}
          keyExtractor={(_, index) => `LessonMapped${index}`}
          ItemSeparatorComponent={() => <View className="h-2" />}
        />
      </View>
      <View className="w-full absolute bottom-6 bg-background flex justify-center items-center p-4 pb-8 border-y border-y-background-secondary">
        <Pressable
          className="flex w-full justify-center items-center bg-background-secondary mb-2 p-2 px-16 rounded-2xl"
          onPress={handleOpenPress}
        >
          <Text className="font-pmedium text-xl text-foreground ">
            {info
              ? info
                  ?.find((el) => el.id === selectedTimetable)
                  ?.id.toLowerCase()
                  .includes("o")
                ? info
                    ?.find((el) => el.id === selectedTimetable)
                    ?.name.split(" ")[0]
                : info?.find((el) => el.id === selectedTimetable)?.name
              : "Brak Danych"}
          </Text>
          <Text className="font-pregular text-foreground">Rozkład zajęć</Text>
        </Pressable>
      </View>

      <BottomSheet
        index={-1}
        snapPoints={["60%"]}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{ backgroundColor: colors.foreground }}
        backgroundStyle={{ backgroundColor: colors.background }}
        ref={bottomSheetRef}
      >
        <BottomSheetScrollView contentContainerClassName="p-4 pb-16">
          <BottomSheetSelectors
            bottomSheetRef={bottomSheetRef}
            info={info ?? []}
            selectedTimetable={selectedTimetable}
            setSelectedTimetable={setSelectedTimetable}
          />
        </BottomSheetScrollView>
      </BottomSheet>
      <Modal
        id="timetable-settings"
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
      >
        <View className="w-96 rounded-2xl flex flex-col justify-between items-center bg-background">
          <View className="p-6 w-full flex gap-4">
            <Text className="text-3xl text-foreground font-pmedium text-center p-6">
              Ustawienia Planu
            </Text>
            <View className="flex flex-row justify-between items-center gap-4">
              <Text className="text-foreground font-pmedium text-lg">
                Grupa
              </Text>
              <View className="flex flex-row justify-center items-center w-full gap-4">
                <LargeButton
                  className="w-20"
                  text="1"
                  selected={group === 1}
                  onPress={() => setGroup(1)}
                />
                <LargeButton
                  className="w-20"
                  text="2"
                  selected={group === 2}
                  onPress={() => setGroup(2)}
                />
              </View>
            </View>
            <View className="flex flex-row justify-between items-center gap-4">
              <Text className="text-foreground font-pmedium text-lg">
                Pokazywać religię
              </Text>
              <Switch
                isEnabled={showReligion}
                onToggle={() => {
                  setShowReligion(!showReligion)
                }}
              />
            </View>
          </View>
          <IconButton
            LucideIcon={X}
            iconColor={colors.foreground}
            onPress={() => setSettingsModalOpen(false)}
            className="my-4"
          />
        </View>
      </Modal>
    </ScreenWrapper>
  )
}

export default Timetable

function BottomSheetSelectors({
  selectedTimetable,
  setSelectedTimetable,
  info,
  bottomSheetRef,
}: {
  selectedTimetable: string
  setSelectedTimetable: Dispatch<SetStateAction<string>>
  info: TimetableInfoResponse
  bottomSheetRef: React.RefObject<BottomSheetMethods>
}) {
  const [search, setSearch] = useState("")

  return (
    <>
      <Input
        type="text"
        onChangeText={(text) => setSearch(text)}
        placeholder="Wyszukaj plan..."
      />
      <TimetableSelect
        selectedTimetable={selectedTimetable}
        setSelectedTimetable={setSelectedTimetable}
        text="Klasa"
        search={search}
        LucideIcon={GraduationCap}
        items={info.filter((item) => item.id.toLocaleLowerCase().includes("o"))}
        onItemSelect={() => bottomSheetRef.current?.close()}
      />
      <TimetableSelect
        selectedTimetable={selectedTimetable}
        setSelectedTimetable={setSelectedTimetable}
        text="Nauczyciel"
        search={search}
        LucideIcon={Users}
        items={info.filter((item) => item.id.toLocaleLowerCase().includes("n"))}
        onItemSelect={() => bottomSheetRef.current?.close()}
      />
      <TimetableSelect
        selectedTimetable={selectedTimetable}
        setSelectedTimetable={setSelectedTimetable}
        text="Sala"
        search={search}
        LucideIcon={DoorOpen}
        items={info.filter((item) => item.id.toLocaleLowerCase().includes("s"))}
        onItemSelect={() => bottomSheetRef.current?.close()}
      />
    </>
  )
}

const LoadingSkeleton = () => {
  return (
    <View className="min-w-full h-full flex flex-col justify-center items-center p-4 gap-2">
      {Array(5)
        .fill("")
        .map((_, i) => (
          <View
            key={`Loading-Skeleton-${i}`}
            className="w-full h-24 bg-background-secondary animate-pulse rounded-2xl"
          ></View>
        ))}
    </View>
  )
}

const NoData = () => {
  return (
    <View className="min-w-full min-h-96 flex flex-col justify-center items-center p-4 gap-2">
      <View className="size-2/3religia">
        <NoDataSvg />
      </View>
    </View>
  )
}
