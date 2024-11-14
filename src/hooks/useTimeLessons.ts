import { Lesson } from "@/types/strapi"
import { differenceInMinutes, isAfter, isBefore, set } from "date-fns"
import { useCallback, useEffect, useState } from "react"

const useTimeLessons = ({ lessons }: { lessons: Lesson[] }) => {
  const [minutes, setMinutes] = useState<number>(0)
  const [message, setMessage] = useState<string>("")

  const calculateTimeToNextLesson = useCallback(() => {
    const now = new Date()

    const createTimeDate = (timeStr: string) => {
      const [hours, minutes] = timeStr.split(":").map(Number)
      return set(new Date(), {
        hours,
        minutes,
        seconds: 0,
        milliseconds: 0,
      })
    }
    const nightTimeStart = createTimeDate("19:00")
    const morningTimeStart = createTimeDate("06:00")
    if (isAfter(now, nightTimeStart) || isBefore(now, morningTimeStart)) {
      setMinutes(0)
      setMessage("Dobranoc! 🌙")
      return
    }

    let nextLesson = null
    let isCurrentlyInLesson = false

    for (const lesson of lessons) {
      const startTime = createTimeDate(lesson.startDate as string)
      const endTime = createTimeDate(lesson.endDate as string)

      // Debug logowanie
      // console.log("Checking lesson:", {
      //   now: format(now, "HH:mm:ss"),
      //   startTime: format(startTime, "HH:mm:ss"),
      //   endTime: format(endTime, "HH:mm:ss"),
      //   isAfterStart: isAfter(now, startTime),
      //   isBeforeEnd: isBefore(now, endTime),
      // })
      if (isAfter(now, startTime) && isBefore(now, endTime)) {
        isCurrentlyInLesson = true
        const minsToEnd = differenceInMinutes(endTime, now)
        setMinutes(minsToEnd)
        setMessage(`Do przerwy pozostało: ${minsToEnd} minut`)
        return
      }

      if (isAfter(startTime, now)) {
        if (
          !nextLesson ||
          isBefore(startTime, createTimeDate(nextLesson.startDate as string))
        ) {
          nextLesson = lesson
        }
      }
    }
    if (!nextLesson && isBefore(now, nightTimeStart)) {
      setMinutes(0)
      setMessage("Koniec Lekcji!")
      return
    }

    if (nextLesson) {
      const nextStartTime = createTimeDate(nextLesson.startDate as string)
      const minsToNext = differenceInMinutes(nextStartTime, now)
      setMinutes(minsToNext)
      setMessage(`Do następnej lekcji pozostało: ${minsToNext} minut`)
    }
  }, [lessons])

  // Aktualizuj czas co minutę
  useEffect(() => {
    calculateTimeToNextLesson()
    const interval = setInterval(calculateTimeToNextLesson, 60000)
    return () => clearInterval(interval)
  }, [calculateTimeToNextLesson])

  return { minutes, message }
}

export default useTimeLessons
