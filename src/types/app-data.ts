import { z } from "zod"
import {
  FirstTimeUserSchema,
  NotificationsSchema,
  TimetableSettingsSchema,
  UserDataSchema,
} from "./schemas"

export type NotificationsState = z.infer<typeof NotificationsSchema>

export type UserData = z.infer<typeof UserDataSchema>

export type FirstTimeUser = z.infer<typeof FirstTimeUserSchema>

export type TimetableSettings = z.infer<typeof TimetableSettingsSchema>
