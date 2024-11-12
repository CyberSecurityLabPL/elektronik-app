import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {
	getDataObject,
	getDataValue,
	storeDataObject,
	storeDataValue,
} from "./storage"
import { UserData } from "@/types/utils"

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

export async function saveUserData(userData: UserData) {
	await storeDataObject("user-data", userData)
}

export async function getUserData(): Promise<UserData> {
	const userData: UserData = await getDataObject("user-data")
	if (!userData) throw new Error("User Data not found in async storage!")
	return userData
}
