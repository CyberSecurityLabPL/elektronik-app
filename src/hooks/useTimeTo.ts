import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  set,
} from "date-fns"

export function useTimeTo({ date }: { date: Date | string }) {
  const days = differenceInDays(
    new Date(date),
    set(new Date(), {
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    }),
  )
  const hours = differenceInHours(
    new Date(date),
    new Date().getHours() === new Date(date).getHours()
      ? set(new Date(), {
          minutes: 0,
          seconds: 0,
          milliseconds: 0,
        })
      : new Date(),
  )
  const minutes = differenceInMinutes(
    new Date(date),
    new Date().getMinutes() === new Date(date).getMinutes()
      ? set(new Date(), {
          seconds: 0,
          milliseconds: 0,
        })
      : new Date(),
  )
  const seconds = differenceInSeconds(
    new Date(date),
    new Date().getSeconds() === new Date(date).getSeconds()
      ? set(new Date(), {
          milliseconds: 0,
        })
      : new Date(),
  )

  return { days, hours, minutes, seconds }
}
