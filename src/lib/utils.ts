import { BACKEND_URL } from "@/constants/urls"
import { NotificationsSchema } from "@/types/schemas"
import { clsx, type ClassValue } from "clsx"
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
