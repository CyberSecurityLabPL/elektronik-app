import {
  getStorageData,
  StorageKeys,
  storageEventEmitter,
} from "@/lib/storage"
import { useEffect, useState } from "react"

/**
 * Reads the first-time-user flag from storage and stays in sync with
 * writes made through `setStorageData` (via `storageEventEmitter`).
 *
 * @returns `null` while the flag is still loading, otherwise a boolean.
 */
export function useFirstTimeUser(): boolean | null {
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null)

  useEffect(() => {
    let mounted = true

    getStorageData(StorageKeys.firstTimeUser).then((res) => {
      if (!mounted) return
      // Missing key means a fresh install, `false` means onboarding is done
      setIsFirstTime(res.success ? Boolean(res.data) : true)
    })

    const onChange = (value: boolean | null) => setIsFirstTime(Boolean(value))
    storageEventEmitter.on(`storage:${StorageKeys.firstTimeUser}`, onChange)

    return () => {
      mounted = false
      storageEventEmitter.off(`storage:${StorageKeys.firstTimeUser}`, onChange)
    }
  }, [])

  return isFirstTime
}
