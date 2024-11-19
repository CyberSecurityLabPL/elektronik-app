export interface SingleTimetableInfo {
  id: string
  name: string
}

export type TimetableInfoResponse = SingleTimetableInfo[]

export interface TimetableResponse {
  id: string
  name: string
  type: "class" | "teacher" | "classroom"
  hours: string[]
  lessons: {
    poniedzialek: DayLesson[]
    wtorek: DayLesson[]
    sroda: DayLesson[]
    czwartek: DayLesson[]
    piatek: DayLesson[]
  }
}

export interface DayLesson {
  isDouble: boolean
  isEmpty: boolean
  classes: Lesson[]
}

export interface Lesson {
  class: {
    id: string
    group: string | null
    shortname: string
  }
  classroom: {
    id: string
    shortname: string
  }
  teacher: {
    id: string
    shortname: string
  }
  subject: {
    name: string
  }
}
