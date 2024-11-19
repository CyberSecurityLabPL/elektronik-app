import { getStorageData, StorageKeys } from "@/lib/storage"
import { UserData } from "@/types/app-data"
import { useEffect, useState } from "react"

export const useUserData = () => {
  const [data, setData] = useState<UserData | undefined>()
  useEffect(() => {
    getStorageData(StorageKeys.userData).then((result) => {
      if (result.success) {
        setData(result.data)
      }
    })
  }, [])

  return data
}
