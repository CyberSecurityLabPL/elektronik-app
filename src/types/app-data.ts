import { z } from "zod"
import {
  FirstTimeUserSchema,
  NotificationsSchema,
  UserDataSchema,
} from "./schemas"

export type NotificationsState = z.infer<typeof NotificationsSchema>

export type UserData = z.infer<typeof UserDataSchema>

export type FirstTimeUser = z.infer<typeof FirstTimeUserSchema>
