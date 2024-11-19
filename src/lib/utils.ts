import { UserData } from "@/types/utils"
import { clsx, type ClassValue } from "clsx"
import { add, isWeekend, startOfWeek } from "date-fns"
import { pl } from "date-fns/locale/pl"
import { twMerge } from "tailwind-merge"
import {
  getDataObject,
  getDataValue,
  storeDataObject,
  storeDataValue,
} from "./storage"
import { BACKEND_URL } from "@/constants/urls"
import { QueryClient, useQueryClient } from "@tanstack/react-query"

// For merging classNames
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStrapiImageUrl(url: string): string {
  return BACKEND_URL + url
}

/**
 * @param day - The day of week from 1 to 7
 * @returns The date of chosen day of current week
 */
export function getDayOfWeek(day: number) {
  const skip = isWeekend(new Date()) ? 2 : 0
  const mon = startOfWeek(add(new Date(), { days: skip }), { locale: pl })
  return add(mon, { days: day - 1 })
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
