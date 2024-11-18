import { z } from "zod"

export const NotificationsSchema = z.object({
  articles: z.boolean(),
  announcements: z.boolean(),
  substitutions: z.boolean(),
})

export const UserDataSchema = z.object({
  name: z.string(),
  diaryNumber: z.number(),
  grade: z.string(),
})

export const FirstTimeUserSchema = z.boolean().nullable()
