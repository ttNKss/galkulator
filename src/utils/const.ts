export type Params<T> = { Vo: T; Da: T; Vi: T }
export type ParamKeyType = keyof Params<any>
export const paramKeys: ParamKeyType[] = ['Vo', 'Da', 'Vi']

export type Scenario = 'pro' | 'master'
export type Challenge = {
  slot1: number | undefined
  slot2: number | undefined
  slot3: number | undefined
}

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
      Vo: { Vo: [75, 75], Da: [0, 0], Vi: [0, 0] },
      Da: { Vo: [0, 0], Da: [75, 75], Vi: [0, 0] },
      Vi: { Vo: [0, 0], Da: [0, 0], Vi: [75, 75] }
    },
    sp: {
      Vo: { Vo: [110, 110], Da: [0, 0], Vi: [0, 0] },
      Da: { Vo: [0, 0], Da: [110, 110], Vi: [0, 0] },
      Vi: { Vo: [0, 0], Da: [0, 0], Vi: [110, 110] }
    }
  },
  drive_2: {
    normal: {
      Vo: { Vo: [165, 145], Da: [0, 145], Vi: [0, 145] },
      Da: { Vo: [0, 145], Da: [165, 145], Vi: [0, 145] },
      Vi: { Vo: [0, 145], Da: [0, 145], Vi: [165, 145] }
    }
  }
} as const

export const examStats: Params<number> = { Vo: 30, Da: 30, Vi: 30 } as const

export const statLimit: Record<Scenario, Params<number>> = {
  pro: { Vo: 1500, Da: 1500, Vi: 1500 },
  master: { Vo: 1800, Da: 1800, Vi: 1800 }
} as const

export type Rank = 'A+' | 'S' | 'S+' | 'SS'
export const rankKeys: Rank[] = ['A+', 'S', 'S+', 'SS']
export const rankThreshold: Record<Rank, number> = {
  'A+': 11500,
  S: 13000,
  'S+': 14500,
  SS: 16000
}
export const examRanges = [
  { max: 5000, rate: 0.3 },
  { max: 10000, rate: 0.15 },
  { max: 20000, rate: 0.08 },
  { max: 30000, rate: 0.04 },
  { max: 40000, rate: 0.02 },
  { max: Number.POSITIVE_INFINITY, rate: 0.01 }
]
