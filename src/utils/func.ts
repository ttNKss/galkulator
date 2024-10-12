import { masterLesson, statLimit } from './const'
import type { Challenge, ParamKeyType, Scenario } from './const'

const f = Math.floor
const s = (v: number[]) => v.reduce((x, y) => x + y)

export const calc = (
  scenario: Scenario,
  stat: ParamKeyType,
  bonus: number,
  base: number,
  lesson?: {
    stat: ParamKeyType
    isSP: boolean
    challenge: Challenge
  },
  drive?: {
    stat: ParamKeyType
  },
) => {
  let v: number = base
  if (lesson) {
    const tmp =
      masterLesson.lesson_4[lesson.isSP ? 'sp' : 'normal'][lesson.stat][stat]
    v +=
      f(tmp[0] * (1 + bonus / 100)) +
      (tmp[1] === 0
        ? 0
        : f((tmp[1] + s(Object.values(lesson.challenge))) * (1 + bonus / 100)))
  }
  if (drive) {
    const tmp = masterLesson.drive_2.normal[drive.stat][stat]
    v += s(tmp.map((v) => f(v * (1 + bonus / 100))))
  }
  return Math.min(statLimit[scenario][stat], v)
}
