'use client'

import { Labeled } from '@/components/common/labeled'
import { Score } from '@/components/common/score'
import { StatTable } from '@/components/common/statTable'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  type Challenge,
  type Params,
  type Scenario,
  paramKeys,
  statLimit
} from '@/utils/const'
import { calc, pfloat, pint } from '@/utils/func'
import { useState } from 'react'

export default function Home() {
  const [scenario, setScenario] = useState<Scenario>('master')
  const [baseStats, setBaseStats] = useState<Params<number>>({
    Vo: 0,
    Da: 0,
    Vi: 0
  })
  const [lessonBonus, setLessonBonus] = useState<Params<number>>({
    Vo: 0,
    Da: 0,
    Vi: 0
  })
  const [challenge, setChallenge] = useState<Challenge>({
    slot1: 0,
    slot2: 0,
    slot3: 0
  })

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
      [stat]: Math.min(statLimit[scenario][stat], pint(value))
    }))
    console.log(pint(value))
  }

  const handleLessonBonusChange = (stat: 'Vo' | 'Da' | 'Vi', value: string) => {
    setLessonBonus(prev => ({
      ...prev,
      [stat]: Math.min(100, pfloat(value))
    }))
  }

  const handleChallengePChange = (
    slot: 'slot1' | 'slot2' | 'slot3',
    value: number
  ) => {
    setChallenge(prev => ({ ...prev, [slot]: value }))
  }

  return (
    <div className='grid justify-items-center p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-4xl'>
        <div className='fixed top-0 left-0 right-0 z-50 px-4 bg-white'>
          <Accordion
            type='single'
            collapsible
            className='w-full'
            defaultValue='item-1'
          >
            <AccordionItem value='item-1'>
              <AccordionTrigger>ステータス情報入力</AccordionTrigger>
              <AccordionContent>
                <div className='space-y-4'>
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
                      <div className='flex flex-col gap-1'>
                        <span>{key}</span>
                        <Input
                          type='number'
                          min='0'
                          step='1'
                          value={baseStats[key]}
                          onChange={e =>
                            handleBaseStatsChange(key, e.target.value)
                          }
                        />
                      </div>
                    ))}
                  </Labeled>
                  <Labeled label='レッスンボーナス'>
                    {paramKeys.map(key => (
                      <div className='flex flex-col gap-1 w-full'>
                        <span>{key}</span>
                        <div className='flex items-center'>
                          <Input
                            type='number'
                            min='0'
                            max='100'
                            step='0.1'
                            value={lessonBonus[key]}
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
                      <div className='flex flex-col gap-1'>
                        <span>{i + 1}枠目</span>
                        <Input
                          type='number'
                          min='0'
                          step='5'
                          value={challenge[key]}
                          onChange={e =>
                            handleChallengePChange(key, pint(e.target.value))
                          }
                        />
                      </div>
                    ))}
                  </Labeled>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <Tabs defaultValue='stats' className='w-full pt-8'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='stats'>ステータス</TabsTrigger>
            <TabsTrigger value='wip'>WIP</TabsTrigger>
          </TabsList>
          <TabsContent value='stats'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>
              {paramKeys.map(v1 =>
                paramKeys.map(v2 => {
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
                      lessonBonus.Vo,
                      baseStats.Vo,
                      drive,
                      lesson
                    ),
                    Da: calc(
                      scenario,
                      'Da',
                      lessonBonus.Da,
                      baseStats.Da,
                      drive,
                      lesson
                    ),
                    Vi: calc(
                      scenario,
                      'Vi',
                      lessonBonus.Vi,
                      baseStats.Vi,
                      drive,
                      lesson
                    )
                  }
                  const { Vo_result, Da_result, Vi_result } = {
                    Vo_result: Math.min(statLimit[scenario].Vo, Vo + 30),
                    Da_result: Math.min(statLimit[scenario].Da, Da + 30),
                    Vi_result: Math.min(statLimit[scenario].Vi, Vi + 30)
                  }
                  return (
                    <Card key={`${v1}-${v2}`}>
                      <CardHeader>
                        <CardTitle>{`${v1}-${v2}`}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <StatTable
                          last={{ Vo, Da, Vi }}
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
          <TabsContent value='wip'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>
              {paramKeys.map(v2 => {
                const drive = { stat: v2 }
                const { Vo, Da, Vi } = {
                  Vo: calc(scenario, 'Vo', lessonBonus.Vo, baseStats.Vo, drive),
                  Da: calc(scenario, 'Da', lessonBonus.Da, baseStats.Da, drive),
                  Vi: calc(scenario, 'Vi', lessonBonus.Vi, baseStats.Vi, drive)
                }
                const { Vo_result, Da_result, Vi_result } = {
                  Vo_result: Math.min(statLimit[scenario].Vo, Vo + 30),
                  Da_result: Math.min(statLimit[scenario].Da, Da + 30),
                  Vi_result: Math.min(statLimit[scenario].Vi, Vi + 30)
                }
                return (
                  <Card key={v2}>
                    <CardHeader>
                      <CardTitle>{v2}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <StatTable
                        last={{ Vo, Da, Vi }}
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
        </Tabs>
      </main>
    </div>
  )
}
