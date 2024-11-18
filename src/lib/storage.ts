import {
  FirstTimeUserSchema,
  NotificationsSchema,
  UserDataSchema,
} from "@/types/schemas"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { z } from "zod"

// claude zgotował

// Make Result type exportable
export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: StorageError }

export type StorageError =
  | { type: "VALIDATION_ERROR"; error: z.ZodError }
  | { type: "STORAGE_ERROR"; error: unknown }
  | { type: "NOT_FOUND" }

// Storage keys string values mapped to their schemas
type SchemaType = {
  notifications: typeof NotificationsSchema
  "first-time-user": typeof FirstTimeUserSchema
  "user-data": typeof UserDataSchema
}

// Storage keys mapped to their string values
export const StorageKeys = {
  notifications: "notifications",
  firstTimeUser: "first-time-user",
  userData: "user-data",
  // ... other keys
} as const

// Type from the keys
export type StorageKey = (typeof StorageKeys)[keyof typeof StorageKeys]

// Schema registry with explicit typing
export const StorageSchemas: SchemaType = {
  [StorageKeys.notifications]: NotificationsSchema,
  [StorageKeys.firstTimeUser]: FirstTimeUserSchema,
  [StorageKeys.userData]: UserDataSchema,
  // Add your settings schema here
} as const

type StorageValueType<K extends StorageKey> = K extends "notifications"
  ? z.infer<typeof NotificationsSchema>
  : K extends "first-time-user"
  ? z.infer<typeof FirstTimeUserSchema>
  : never

// Helper type to get the inferred type for a schema
type InferSchemaType<K extends StorageKey> = z.infer<(typeof StorageSchemas)[K]>

/**
 *
 * @param key Storage key. Storage keys are defined in `StorageKeys` in `src/lib/storage.ts`
 * @returns
 */
export async function getStorageData<K extends StorageKey>(
  key: K,
): Promise<Result<StorageValueType<K>>> {
  try {
    const value = await AsyncStorage.getItem(key)

    if (!value) {
      return {
        success: false,
        error: { type: "NOT_FOUND" },
      }
    }

    const parsedValue = JSON.parse(value)
    const validatedData = StorageSchemas[key].parse(
      parsedValue,
    ) as StorageValueType<K>

    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: { type: "VALIDATION_ERROR", error },
      }
    }
    return {
      success: false,
      error: { type: "STORAGE_ERROR", error },
    }
  }
}

/**
 * @description Store a schema-validated value in storage
 * @param key Storage key
 * @param value Value to store
 * @param schema Zod schema to validate the value. Should be imported from `src/types/schemas.ts`
 * @returns Result object with success status and data or error
 *
 * @example
 *  ```ts
 * const result = await setStorageData("notifications", { articles: true, announcements: true, substitutions: false }, NotificationsSchema)
 *
 * if (result.success) {
 *   console.log("Data stored successfully:", result.data)
 * } else {
 *   switch (result.error.type) {
 *     case "VALIDATION_ERROR":
 *       console.error("Invalid data format:", result.error.error)
 *       break
 *     case "STORAGE_ERROR":
 *       console.error("Storage error:", result.error.error)
 *       break
 *   }
 * }
 *
 */
export async function setStorageData<K extends StorageKey>(
  key: K,
  value: InferSchemaType<K>,
): Promise<Result<InferSchemaType<K>>> {
  try {
    const validatedData = StorageSchemas[key].parse(value)
    console.log("validatedData", validatedData)

    await AsyncStorage.setItem(key, JSON.stringify(validatedData))
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: { type: "VALIDATION_ERROR", error },
      }
    }
    return {
      success: false,
      error: { type: "STORAGE_ERROR", error },
    }
  }
}

export async function removeStorageData(
  key: StorageKey,
): Promise<Result<void>> {
  try {
    await AsyncStorage.removeItem(key)
    return { success: true, data: undefined }
  } catch (error) {
    return {
      success: false,
      error: { type: "STORAGE_ERROR", error },
    }
  }
}

export async function clearStorage(): Promise<Result<void>> {
  try {
    await AsyncStorage.clear()
    return { success: true, data: undefined }
  } catch (error) {
    return {
      success: false,
      error: { type: "STORAGE_ERROR", error },
    }
  }
}

export async function getAllStorageData(): Promise<
  Result<{ [key in StorageKey]: unknown }>
> {
  const keys = Object.values(StorageKeys)
  const data: { [key in StorageKey]?: unknown } = {}

  for (const key of keys) {
    const result = await getStorageData(key)
    if (result.success) {
      data[key] = result.data
    } else {
      data[key] = undefined
    }
  }

  return { success: true, data: data as { [key in StorageKey]: unknown } }
}
