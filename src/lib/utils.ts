import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {
  getDataObject,
  getDataValue,
  storeDataObject,
  storeDataValue,
} from "./storage"
import { UserData } from "@/types/utils"
import { BACKEND_URL } from "@/constants/urls"
import { QueryClient, useQueryClient } from "@tanstack/react-query"

// For merging classNames
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStrapiImageUrl(url: string): string {
  return BACKEND_URL + url
}

export async function isFirstTime() {
  const hasBeenOpened = await getDataValue("has-been-opened")
  if (hasBeenOpened !== null) {
    return false
  }
  return true
}

export async function saveFirstTime() {
  await storeDataValue("has-been-opened", true)
}

export async function saveUserData(userData: UserData) {
  await storeDataObject("user-data", userData)
}

export async function getUserData(): Promise<UserData> {
  const userData: UserData = await getDataObject("user-data")
  if (!userData) throw new Error("User Data not found in async storage!")
  return userData
}

export const resetInfiniteQueryPagination = ({
  queryKey,
  queryClient,
}: {
  queryKey: string[]
  queryClient: QueryClient
}): void => {
  queryClient.setQueryData(queryKey, (oldData: any) => {
    console.log(oldData)

    if (!oldData) return undefined

    return {
      ...oldData,
      pages: oldData.pages.slice(0, 1),
      pageParams: oldData.pageParams.slice(0, 1),
    }
  })
}
