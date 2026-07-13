import { z } from "zod"
import {
  FirstTimeUserSchema,
  TimetableSettingsSchema,
  UserDataSchema,
} from "./schemas"

export type UserData = z.infer<typeof UserDataSchema>

export type FirstTimeUser = z.infer<typeof FirstTimeUserSchema>

export type TimetableSettings = z.infer<typeof TimetableSettingsSchema>
