import { z } from "zod"

export const themeSchema = z.string()

export const LanguageSchema = z.string()

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

export const TimetableSettingsSchema = z.object({
  group: z.number(),
  religion: z.boolean()
})
