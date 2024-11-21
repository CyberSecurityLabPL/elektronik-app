import { getStorageData, storageEventEmitter, StorageKeys } from "@/lib/storage"
import { UserData } from "@/types/app-data"
import { useEffect, useState } from "react"

export const useUserData = () => {
  const [data, setData] = useState<UserData | undefined>()

  useEffect(() => {
    // Initial data fetch
    getStorageData(StorageKeys.userData).then((result) => {
      if (result.success) {
        setData(result.data)
      }
    })

    // Listen for storage changes
    const handleStorageChange = (newData: UserData) => {
      setData(newData)
    }

    storageEventEmitter.on(
      `storage:${StorageKeys.userData}`,
      handleStorageChange,
    )

    // Cleanup subscription on component unmount
    return () => {
      storageEventEmitter.off(
        `storage:${StorageKeys.userData}`,
        handleStorageChange,
      )
    }
  }, [])

  return data
}
