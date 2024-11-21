import { localeMap } from "@/config"
import { BACKEND_URL } from "@/constants/urls"
import i18n from "@/i18n/i18n.config"
import { QueryClient } from "@tanstack/react-query"
import { clsx, type ClassValue } from "clsx"
import { add, format, isWeekend, startOfWeek } from "date-fns"
import { pl } from "date-fns/locale"
import { twMerge } from "tailwind-merge"
import { getStorageData, StorageKeys } from "./storage"

// For merging classNames
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStrapiImageUrl(url: string): string {
  return BACKEND_URL + url
}

export const checkFirstTimeUser = async (): Promise<boolean> => {
  const result = await getStorageData(StorageKeys.firstTimeUser)
  return result.success && !result.data
}

export const localeFormat = (date: string | Date, formatStr: string) =>
  format(date, formatStr, {
    locale: localeMap[i18n.language as keyof typeof localeMap] || pl,
  })

/**
 * @param day - The day of week from 1 to 7
 * @returns The date of chosen day of current week
 */
export function getDayOfWeek(day: number) {
  const skip = isWeekend(new Date()) ? 2 : 0
  const mon = startOfWeek(add(new Date(), { days: skip }), { locale: pl })
  return add(mon, { days: day - 1 })
}

export const resetInfiniteQueryPagination = ({
  queryKey,
  queryClient,
}: {
  queryKey: string[]
  queryClient: QueryClient
}): void => {
  queryClient.setQueryData(queryKey, (oldData: any) => {
    if (!oldData) return undefined

    return {
      ...oldData,
      pages: oldData.pages.slice(0, 1),
      pageParams: oldData.pageParams.slice(0, 1),
    }
  })
}
