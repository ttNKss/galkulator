'use client'

import { Labeled } from '@/components/common/labeled'
import { Score } from '@/components/common/score'
import { StatTable } from '@/components/common/statTable'
import { StatusRanking } from '@/components/common/statusRanking'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  type Challenge,
  type ParamKeyType,
  type Params,
  type Scenario,
  paramKeys,
  statLimit
} from '@/utils/const'
import { calc, pfloat, pint, sum } from '@/utils/func'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import { useEffect, useState, useMemo } from 'react'

export default function Home() {
  const [scenario, setScenario] = useState<Scenario>('master')
  const [baseStats, setBaseStats] = useState<Params<number | undefined>>({
    Vo: undefined,
    Da: undefined,
    Vi: undefined
  })
  const [lessonBonus, setLessonBonus] = useState<Params<number | undefined>>({
    Vo: undefined,
    Da: undefined,
    Vi: undefined
  })
  const [challenge, setChallenge] = useState<Challenge>({
    slot1: undefined,
    slot2: undefined,
    slot3: undefined
  })

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash) {
        const element = document.querySelector(hash)
        if (element) {
          const headerHeight =
            document.querySelector('.fixed')?.clientHeight || 0
          const elementPosition =
            element.getBoundingClientRect().top + window.scrollY
          window.scrollTo({
            top: elementPosition - headerHeight - 12,
            behavior: 'smooth'
          })
        }
      }
    }

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const handleScenarioChange = (scenario: 'pro' | 'master') => {
    if (scenario === 'pro' || scenario === 'master') {
      setScenario(scenario)
    } else {
      setScenario('master')
    }
  }

  const handleBaseStatsChange = (stat: 'Vo' | 'Da' | 'Vi', value: string) => {
    setBaseStats(prev => ({
      ...prev,
      [stat]:
        value === ''
          ? undefined
          : Math.min(statLimit[scenario][stat], pint(value))
    }))
  }

  const handleLessonBonusChange = (stat: 'Vo' | 'Da' | 'Vi', value: string) => {
    setLessonBonus(prev => ({
      ...prev,
      [stat]: value === '' ? undefined : Math.min(100, pfloat(value))
    }))
  }

  const handleChallengePChange = (
    slot: 'slot1' | 'slot2' | 'slot3',
    value: string
  ) => {
    setChallenge(prev => ({
      ...prev,
      [slot]: value === '' ? undefined : pint(value)
    }))
  }

  const calculateFinalStats = (v1: ParamKeyType, v2: ParamKeyType) => {
    const lesson = {
      stat: v1,
      isSP: true,
      challenge
    }
    const drive = { stat: v2 }
    const { Vo, Da, Vi } = {
      Vo: calc(
        scenario,
        'Vo',
        lessonBonus.Vo ?? 0,
        baseStats.Vo ?? 0,
        drive,
        lesson
      ),
      Da: calc(
        scenario,
        'Da',
        lessonBonus.Da ?? 0,
        baseStats.Da ?? 0,
        drive,
        lesson
      ),
      Vi: calc(
        scenario,
        'Vi',
        lessonBonus.Vi ?? 0,
        baseStats.Vi ?? 0,
        drive,
        lesson
      )
    }
    return {
      last: { Vo, Da, Vi },
      result: {
        Vo: Math.min(statLimit[scenario].Vo, Vo + 30),
        Da: Math.min(statLimit[scenario].Da, Da + 30),
        Vi: Math.min(statLimit[scenario].Vi, Vi + 30)
      }
    }
  }

  const calculateOnlyDriveStats = (v2: ParamKeyType) => {
    const drive = { stat: v2 }
    const { Vo, Da, Vi } = {
      Vo: calc(scenario, 'Vo', lessonBonus.Vo ?? 0, baseStats.Vo ?? 0, drive),
      Da: calc(scenario, 'Da', lessonBonus.Da ?? 0, baseStats.Da ?? 0, drive),
      Vi: calc(scenario, 'Vi', lessonBonus.Vi ?? 0, baseStats.Vi ?? 0, drive)
    }
    return {
      last: { Vo, Da, Vi },
      result: {
        Vo: Math.min(statLimit[scenario].Vo, Vo + 30),
        Da: Math.min(statLimit[scenario].Da, Da + 30),
        Vi: Math.min(statLimit[scenario].Vi, Vi + 30)
      }
    }
  }

  const lessonAndDriveCombinations = paramKeys
    .flatMap(v1 =>
      paramKeys.map(v2 => {
        const { last: _, result } = calculateFinalStats(v1, v2)
        return { v1, v2, result, total: sum(Object.values(result)) }
      })
    )
    .sort((a, b) => b.total - a.total)
    .map(x => ({ v1: x.v1, v2: x.v2, result: { ...x.result } }))

  const onlyDriveCombinations = paramKeys
    .map(v2 => {
      const { last: _, result } = calculateOnlyDriveStats(v2)
      return { v2, result, total: sum(Object.values(result)) }
    })
    .sort((a, b) => b.total - a.total)
    .map(x => ({ v2: x.v2, result: { ...x.result } }))

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const finalResult = useMemo(
    () => ({
      Vo: Math.min(statLimit[scenario].Vo, (baseStats.Vo ?? 0) + 30),
      Da: Math.min(statLimit[scenario].Da, (baseStats.Da ?? 0) + 30),
      Vi: Math.min(statLimit[scenario].Vi, (baseStats.Vi ?? 0) + 30)
    }),
    [scenario, baseStats]
  )

  return (
    <div className='grid justify-items-center py-8 pb-20 px-4 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center w-full max-w-5xl'>
        <div className='fixed top-0 left-0 right-0 z-50 px-4 bg-white'>
          <Accordion
            type='single'
            collapsible
            className='w-full'
            defaultValue='item-1'
          >
            <AccordionItem value='item-1'>
              <AccordionTrigger>ステータス情報入力</AccordionTrigger>
              <AccordionContent className='px-1'>
                <div className='space-y-4 justify-items-center flex flex-col items-center'>
                  <div className='max-w-2xl w-full'>
                    <Labeled label='シナリオ'>
                      <RadioGroup
                        value={scenario}
                        onValueChange={handleScenarioChange}
                        className='w-full'
                      >
                        <div className='flex justify-center gap-8 w-full'>
                          <div className='flex items-center space-x-2'>
                            <RadioGroupItem
                              value='pro'
                              id='pro'
                              className='w-6 h-6'
                            />
                            <Label htmlFor='pro' className='text-base'>
                              プロ
                            </Label>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <RadioGroupItem
                              value='master'
                              id='master'
                              className='w-6 h-6'
                            />
                            <Label htmlFor='master' className='text-base'>
                              マスター
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </Labeled>
                    <Labeled label='基礎ステータス'>
                      {paramKeys.map(key => (
                        <div
                          className='flex flex-col gap-1 w-full'
                          key={`base-${key}`}
                        >
                          <span>{key}</span>
                          <Input
                            type='number'
                            min='0'
                            step='1'
                            value={
                              baseStats[key] === undefined ? '' : baseStats[key]
                            }
                            onChange={e =>
                              handleBaseStatsChange(key, e.target.value)
                            }
                          />
                        </div>
                      ))}
                    </Labeled>
                    <Labeled label='レッスンボーナス'>
                      {paramKeys.map(key => (
                        <div
                          className='flex flex-col gap-1 w-full'
                          key={`lesson-${key}`}
                        >
                          <span>{key}</span>
                          <div className='flex items-center'>
                            <Input
                              type='number'
                              min='0'
                              max='100'
                              step='0.1'
                              value={
                                lessonBonus[key] === undefined
                                  ? ''
                                  : lessonBonus[key]
                              }
                              onChange={e =>
                                handleLessonBonusChange(key, e.target.value)
                              }
                            />
                            <span className='ml-1'>%</span>
                          </div>
                        </div>
                      ))}
                    </Labeled>
                    <Labeled label='チャレンジPアイテム'>
                      {(['slot1', 'slot2', 'slot3'] as const).map((key, i) => (
                        <div
                          className='flex flex-col gap-1 w-full'
                          key={`challenge-${key}`}
                        >
                          <span>{i + 1}枠目</span>
                          <Input
                            type='number'
                            min='0'
                            step='5'
                            value={
                              challenge[key] === undefined ? '' : challenge[key]
                            }
                            onChange={e =>
                              handleChallengePChange(key, e.target.value)
                            }
                          />
                        </div>
                      ))}
                    </Labeled>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <Tabs defaultValue='lessonAndDrive' className='w-full pt-8'>
          <TabsList className='grid grid-cols-3 w-full mb-2'>
            <TabsTrigger value='lessonAndDrive'>レッスンあり</TabsTrigger>
            <TabsTrigger value='onlyDrive'>追い込みのみ</TabsTrigger>
            <TabsTrigger value='finalExam'>最終試験</TabsTrigger>
          </TabsList>
          <TabsContent
            value='lessonAndDrive'
            className='flex flex-col items-center gap-4 mt-0'
          >
            <StatusRanking
              combinations={lessonAndDriveCombinations}
              isLessonAndDrive={true}
            />
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full'>
              {paramKeys.map(v1 =>
                paramKeys.map(v2 => {
                  const {
                    last,
                    result: { Vo: Vo_result, Da: Da_result, Vi: Vi_result }
                  } = calculateFinalStats(v1, v2)
                  return (
                    <Card key={`${v1}-${v2}`} id={`${v1}-${v2}`}>
                      <CardHeader>
                        <CardTitle>{`${v1}-${v2}`}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <StatTable
                          last={{ ...last }}
                          result={{
                            Vo: Vo_result,
                            Da: Da_result,
                            Vi: Vi_result
                          }}
                        />
                        <Score
                          result={{
                            Vo: Vo_result,
                            Da: Da_result,
                            Vi: Vi_result
                          }}
                        />
                      </CardContent>
                    </Card>
                  )
                })
              )}
            </div>
          </TabsContent>
          <TabsContent
            value='onlyDrive'
            className='flex flex-col items-center gap-4 mt-0'
          >
            <StatusRanking
              combinations={onlyDriveCombinations}
              isLessonAndDrive={false}
            />
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full'>
              {paramKeys.map(v2 => {
                const {
                  last,
                  result: { Vo: Vo_result, Da: Da_result, Vi: Vi_result }
                } = calculateOnlyDriveStats(v2)
                return (
                  <Card key={v2} id={v2}>
                    <CardHeader>
                      <CardTitle>{v2}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <StatTable
                        last={{ ...last }}
                        result={{ Vo: Vo_result, Da: Da_result, Vi: Vi_result }}
                      />
                      <Score
                        result={{
                          Vo: Vo_result,
                          Da: Da_result,
                          Vi: Vi_result
                        }}
                      />
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
          <TabsContent
            value='finalExam'
            className='flex flex-col items-center gap-4 mt-0'
          >
            <div className='w-full max-w-md'>
              <Card>
                <CardHeader>
                  <CardTitle>試験前のステータス</CardTitle>
                </CardHeader>
                <CardContent>
                  <StatTable
                    last={{
                      Vo: baseStats.Vo ?? 0,
                      Da: baseStats.Da ?? 0,
                      Vi: baseStats.Vi ?? 0
                    }}
                    result={{ ...finalResult }}
                  />
                  <Score result={{ ...finalResult }} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Button
        className='fixed bottom-4 right-4 z-50 rounded-full p-2 h-10 w-10'
        onClick={scrollToTop}
        aria-label='トップへ戻る'
      >
        <ArrowUpIcon className='h-6 w-6' />
      </Button>
    </div>
  )
}
