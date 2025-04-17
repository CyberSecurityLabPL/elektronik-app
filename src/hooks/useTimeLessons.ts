import { StrapiLesson } from "@/types/strapi"
import {
  addMinutes,
  differenceInMilliseconds,
  differenceInMinutes,
  isAfter,
  isBefore,
  isEqual,
  isWeekend,
  isWithinInterval,
  set,
} from "date-fns"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

const useTimeLessons = ({ lessons }: { lessons: StrapiLesson[] }) => {
  const [minutes, setMinutes] = useState<number>(0)
  const [message, setMessage] = useState<string>("")
  const [isLessonsEnded, setIsLessonsEnded] = useState<boolean>(false)
  const { t } = useTranslation()

  const calculateTimeToNextLesson = () => {
    const createTimeDate = (timeStr: string) => {
      const [hours, minutes] = timeStr.split(":").map(Number)
      return set(new Date(), {
        hours,
        minutes,
        seconds: 0,
        milliseconds: 0,
      })
    }

    const now = new Date()
    now.setSeconds(0, 0)

    if (isWeekend(now)) {
      setMinutes(0)
      setIsLessonsEnded(true)
      setMessage(t("Home.timeMessage.weekend"))
      return
    }

    const nightTimeStart = createTimeDate("19:00")
    const morningTimeStart = createTimeDate("06:00")
    if (isAfter(now, nightTimeStart) || isBefore(now, morningTimeStart)) {
      setMinutes(0)
      setIsLessonsEnded(true)
      setMessage(t("Home.timeMessage.goodnight"))
      return
    }

    let nextLesson = null
    let isCurrentlyInLesson = false
    setIsLessonsEnded(false)

    for (const lesson of lessons) {
      const startTime = createTimeDate(lesson.startDate as string)
      const endTime = createTimeDate(lesson.endDate as string)

      if (
        isWithinInterval(now, { start: startTime, end: endTime }) &&
        !isEqual(now, endTime)
      ) {
        isCurrentlyInLesson = true
        const minsToEnd = differenceInMinutes(endTime, now)
        setMinutes(minsToEnd)
        setMessage(t("Home.timeMessage.toBreak"))
        return
      }

      if (isBefore(now, startTime)) {
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
      setIsLessonsEnded(true)
      setMessage(t("Home.timeMessage.endLesson"))
      return
    }

    if (nextLesson) {
      const nextStartTime = createTimeDate(nextLesson.startDate as string)
      const minsToNext = differenceInMinutes(nextStartTime, now)
      setMinutes(minsToNext)
      setMessage(t("Home.timeMessage.toLesson"))
    }
  }

  useEffect(() => {
    calculateTimeToNextLesson()

    const setupNextMinuteTimer = () => {
      const now = new Date()
      const nextMinute = addMinutes(new Date(), 1)
      nextMinute.setSeconds(0, 0)
      const timeUntilNextMinute = differenceInMilliseconds(nextMinute, now)

      return setTimeout(() => {
        calculateTimeToNextLesson()

        const interval = setInterval(calculateTimeToNextLesson, 60000)

        return () => clearInterval(interval)
      }, timeUntilNextMinute)
    }

    const initialTimeout = setupNextMinuteTimer()

    return () => {
      clearTimeout(initialTimeout)
    }
  }, [calculateTimeToNextLesson])

  return { minutes, message, isLessonsEnded }
}

export default useTimeLessons
