import { getUserData } from "@/lib/utils"
import { UserData } from "@/types/utils"
import { useEffect, useState } from "react"

export const useUserData = () => {
  const [data, setData] = useState<UserData | undefined>()
  useEffect(() => {
    getUserData().then((data) => setData(data))
  }, [])

  return data
}
