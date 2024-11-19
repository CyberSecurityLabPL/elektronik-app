import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native"
import IconButton from "./ui/IconButton"
import { ChevronDown, ChevronUp, LucideProps } from "lucide-react-native"
import useColors from "@/hooks/useColors"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { TimetableInfoResponse } from "@/hooks/timetable/types"
import { cn } from "@/lib/utils"

export default function TimetableSelect({
  text,
  LucideIcon,
  items,
  search,
  onItemSelect,
  selectedTimetable,
  setSelectedTimetable,
}: {
  text: string
  LucideIcon: React.FC<LucideProps>
  items?: TimetableInfoResponse
  search: string
  onItemSelect: () => void
  selectedTimetable: string
  setSelectedTimetable: Dispatch<SetStateAction<string>>
}) {
  const colors = useColors()
  const [open, setOpen] = useState(false)
  const searchedValues = items?.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  )

  useEffect(() => {
    if (searchedValues && searchedValues.length > 0) setOpen(true)
    if (search.length === 0) setOpen(false)
  }, [search])

  if (
    search.length > 0 &&
    (searchedValues?.length === 0 || searchedValues === undefined)
  )
    return null

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.7}
        className="flex w-full flex-row justify-between items-center p-4"
        onPress={() => setOpen(!open)}
      >
        <View className="flex flex-row items-center justify-center gap-4">
          <View className="p-4 bg-background-secondary rounded-2xl">
            <LucideIcon size={32} color={colors.foreground} />
          </View>
          <Text className="text-foreground font-psemibold text-2xl">
            {text}
          </Text>
        </View>
        {open ? (
          <ChevronUp size={32} color={colors.foreground} />
        ) : (
          <ChevronDown size={32} color={colors.foreground} />
        )}
      </TouchableOpacity>

      {open && items && items.length > 0 && (
        <View className="flex p-8 gap-2">
          {(search === ""
            ? items
            : items.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase()),
              )
          ).map((item, index) => (
            <SelectItem
              key={item.id + index}
              id={item.id}
              text={item.name}
              selectedTimetable={selectedTimetable}
              setSelectedTimetable={setSelectedTimetable}
              onItemSelect={onItemSelect}
            />
          ))}
        </View>
      )}
    </View>
  )
}

function SelectItem({
  text,
  id,
  onItemSelect,
  selectedTimetable,
  setSelectedTimetable,
  ...props
}: {
  text: string
  id: string
  onItemSelect: () => void
  selectedTimetable: string
  setSelectedTimetable: Dispatch<SetStateAction<string>>
} & TouchableOpacityProps) {
  const isSelected = selectedTimetable === id

  return (
    <TouchableOpacity
      className={cn(
        "w-full flex justify-center items-start p-6 py-4 rounded-lg ",
        isSelected ? "bg-primary/30" : "bg-background-secondary",
      )}
      onPress={() => {
        setSelectedTimetable(id)
        onItemSelect()
      }}
      {...props}
    >
      <Text
        className={cn(
          "text-foreground font-pregular",
          isSelected ? "text-primary" : "text-foreground",
        )}
      >
        {text}
      </Text>
    </TouchableOpacity>
  )
}
