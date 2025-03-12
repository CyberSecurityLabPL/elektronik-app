import { getStorageData, storageEventEmitter, StorageKeys } from "@/lib/storage"
import { TimetableSettings } from "@/types/app-data"
import { useEffect, useState } from "react"

export const useTimetableSettings = () => {
  const [data, setData] = useState<TimetableSettings | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    // Initial data fetch
    getStorageData(StorageKeys.timetable).then((result) => {
      if (result.success) {
        setData(result.data)
      }
    })

    // Listen for storage changes
    const handleStorageChange = (newData: TimetableSettings) => {
      setData(newData)
    }

    storageEventEmitter.on(
      `storage:${StorageKeys.timetable}`,
      handleStorageChange,
    )

    // Cleanup subscription on component unmount
    setIsLoading(false)
    return () => {
      storageEventEmitter.off(
        `storage:${StorageKeys.timetable}`,
        handleStorageChange,
      )
    }
  }, [])

  return { data, isLoading }
}
