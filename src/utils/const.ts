export type Params<T> = { vo: T; da: T; vi: T }
export type ParamKeyType = keyof Params<any>
export const paramKeys: ParamKeyType[] = ['vo', 'da', 'vi']

export type Scenario = 'pro' | 'master'
export type Challenge = { slot1: number; slot2: number; slot3: number }

export const masterLesson: {
  lesson_4: {
    normal: Params<Params<[number, number]>>
    sp: Params<Params<[number, number]>>
  }
  drive_2: {
    normal: Params<Params<[number, number]>>
  }
} = {
  lesson_4: {
    normal: {
      vo: { vo: [75, 75], da: [0, 0], vi: [0, 0] },
      da: { vo: [0, 0], da: [75, 75], vi: [0, 0] },
      vi: { vo: [0, 0], da: [0, 0], vi: [75, 75] },
    },
    sp: {
      vo: { vo: [110, 110], da: [0, 0], vi: [0, 0] },
      da: { vo: [0, 0], da: [110, 110], vi: [0, 0] },
      vi: { vo: [0, 0], da: [0, 0], vi: [110, 110] },
    },
  },
  drive_2: {
    normal: {
      vo: { vo: [165, 145], da: [0, 145], vi: [0, 145] },
      da: { vo: [0, 145], da: [165, 145], vi: [0, 145] },
      vi: { vo: [0, 145], da: [0, 145], vi: [165, 145] },
    },
  },
} as const

export const examStats: Params<number> = { vo: 30, da: 30, vi: 30 } as const

export const statLimit: Record<Scenario, Params<number>> = {
  pro: { vo: 1500, da: 1500, vi: 1500 },
  master: { vo: 1800, da: 1800, vi: 1800 },
} as const

export type Rank = 'A+' | 'S' | 'S+' | 'SS'
export const rankKeys: Rank[] = ['A+', 'S', 'S+', 'SS']
export const rankThreshold: Record<Rank, number> = {
  'A+': 11500,
  S: 13000,
  'S+': 14500,
  SS: 16000,
}
export const examRanges = [
  { max: 5000, rate: 0.3 },
  { max: 10000, rate: 0.15 },
  { max: 20000, rate: 0.08 },
  { max: 30000, rate: 0.04 },
  { max: 40000, rate: 0.02 },
  { max: Number.POSITIVE_INFINITY, rate: 0.01 },
]
