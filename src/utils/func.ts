import { examRanges, masterLesson, rankThreshold, statLimit } from './const'
import type { Challenge, ParamKeyType, Rank, Scenario } from './const'

const f = Math.floor
const s = (v: number[]) => v.reduce((x, y) => x + y)

export const calc = (
  scenario: Scenario,
  stat: ParamKeyType,
  bonus: number,
  base: number,
  drive?: {
    stat: ParamKeyType
  },
  lesson?: {
    stat: ParamKeyType
    isSP: boolean
    challenge: Challenge
  }
) => {
  let v: number = base
  if (lesson) {
    const tmp =
      masterLesson.lesson_4[lesson.isSP ? 'sp' : 'normal'][lesson.stat][stat]
    v +=
      f(tmp[0] * (1 + bonus / 100)) +
      (tmp[1] === 0
        ? 0
        : f(
            (tmp[1] + s(Object.values(lesson.challenge).map(v => v ?? 0))) *
              (1 + bonus / 100)
          ))
  }
  if (drive) {
    const tmp = masterLesson.drive_2.normal[drive.stat][stat]
    v += s(tmp.map(v => f(v * (1 + bonus / 100))))
  }
  return Math.min(statLimit[scenario][stat], v)
}

export const score = (rank: Rank, Vo: number, Da: number, Vi: number) => {
  const th = rankThreshold[rank]
  const statPoint = f((Vo + Da + Vi) * 2.3)
  const x = th - 1700 - statPoint
  if (x < 0) return 0
  let y = 0
  let sum = 0

  for (const range of examRanges) {
    const rangeSize = range.max - y
    const rangePoints = rangeSize * range.rate

    if (x <= sum + rangePoints) {
      y += Math.ceil((x - sum) / range.rate)
      return y
    }

    sum += rangePoints
    y = range.max
  }

  return y
}

export const pint = (v: string) => {
  const n = Number.parseInt(v)
  return Number.isNaN(n) ? 0 : n
}
export const pfloat = (v: string) => {
  const n = Number.parseFloat(v)
  return Number.isNaN(n) ? 0 : n
}
