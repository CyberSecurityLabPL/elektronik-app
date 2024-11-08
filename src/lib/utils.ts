import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { getDataObject, getDataValue, storeDataValue } from "./storage"

// For merging classNames
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
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
