import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// For merging classNames
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
