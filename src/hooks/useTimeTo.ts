import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns"

export function useTimeTo({ date }: { date: Date | string }) {
  const days = differenceInDays(new Date(date), new Date())
  const hours = differenceInHours(new Date(date), new Date())
  const minutes = differenceInMinutes(new Date(date), new Date())
  const seconds = differenceInSeconds(new Date(date), new Date())

  const timeNumber = (): number => {
    if (days > 0) return days
    if (hours > 0) return hours
    if (minutes > 0) return minutes
    if (seconds > 0) return seconds
    return 0
  }
  const nameString = (): string => {
    if (days > 0) {
      return days === 1
        ? "dzień"
        : days % 10 >= 2 &&
          days % 10 <= 4 &&
          (days % 100 < 10 || days % 100 >= 20)
        ? "dni"
        : "dni"
    }
    if (hours > 0) {
      return hours === 1
        ? "godzine"
        : hours % 10 >= 2 &&
          hours % 10 <= 4 &&
          (hours % 100 < 10 || hours % 100 >= 20)
        ? "godziny"
        : "godzin"
    }
    if (minutes > 0) {
      return minutes === 1
        ? "minuta"
        : minutes % 10 >= 2 &&
          minutes % 10 <= 4 &&
          (minutes % 100 < 10 || minutes % 100 >= 20)
        ? "minuty"
        : "minut"
    }
    if (seconds > 0) {
      return seconds === 1
        ? "sekunda"
        : seconds % 10 >= 2 &&
          seconds % 10 <= 4 &&
          (seconds % 100 < 10 || seconds % 100 >= 20)
        ? "sekundy"
        : "sekund"
    }
    return "czasu"
  }

  return {
    days,
    hours,
    minutes,
    seconds,
    timeNumber: timeNumber(),
    nameString: nameString(),
    refresh: () => useTimeTo({ date }),
  }
}
