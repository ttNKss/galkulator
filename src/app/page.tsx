'use client'

import { Labeled } from '@/components/common/labeled'
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  type Challenge,
  type Params,
  type Scenario,
  paramKeys,
  rankKeys,
  statLimit
} from '@/utils/const'
import { calc, pfloat, pint, score } from '@/utils/func'
import { useState } from 'react'

export default function Home() {
  const [scenario, setScenario] = useState<Scenario>('master')
  const [baseStats, setBaseStats] = useState<Params<number>>({
    vo: 0,
    da: 0,
    vi: 0
  })
  const [lessonBonus, setLessonBonus] = useState<Params<number>>({
    vo: 0,
    da: 0,
    vi: 0
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

  const handleBaseStatsChange = (stat: 'vo' | 'da' | 'vi', value: string) => {
    setBaseStats(prev => ({
      ...prev,
      [stat]: Math.min(statLimit[scenario][stat], pint(value))
    }))
    console.log(pint(value))
  }

  const handleLessonBonusChange = (stat: 'vo' | 'da' | 'vi', value: string) => {
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
                  <div className='flex-grow'>
                    <div className='flex gap-2'>
                      <div className='flex flex-col gap-1'>
                        <span>Vo</span>
                        <Input
                          type='number'
                          min='0'
                          step='1'
                          value={baseStats.vo}
                          onChange={e =>
                            handleBaseStatsChange('vo', e.target.value)
                          }
                        />
                      </div>
                      <div className='flex flex-col gap-1'>
                        <span>Da</span>
                        <Input
                          type='number'
                          min='0'
                          step='1'
                          value={baseStats.da}
                          onChange={e =>
                            handleBaseStatsChange('da', e.target.value)
                          }
                        />
                      </div>
                      <div className='flex flex-col gap-1'>
                        <span>Vi</span>
                        <Input
                          type='number'
                          min='0'
                          step='1'
                          value={baseStats.vi}
                          onChange={e =>
                            handleBaseStatsChange('vi', e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </Labeled>
                <Labeled label='レッスンボーナス'>
                  <div className='flex-grow'>
                    <div className='flex gap-2'>
                      <div className='flex flex-col gap-1'>
                        <span>Vo</span>
                        <div className='flex items-center'>
                          <Input
                            type='number'
                            min='0'
                            max='100'
                            step='0.1'
                            value={lessonBonus.vo}
                            onChange={e =>
                              handleLessonBonusChange('vo', e.target.value)
                            }
                          />
                          <span className='ml-1'>%</span>
                        </div>
                      </div>
                      <div className='flex flex-col gap-1'>
                        <span>Da</span>
                        <div className='flex items-center'>
                          <Input
                            type='number'
                            min='0'
                            max='100'
                            step='0.1'
                            value={lessonBonus.da}
                            onChange={e =>
                              handleLessonBonusChange('da', e.target.value)
                            }
                          />
                          <span className='ml-1'>%</span>
                        </div>
                      </div>
                      <div className='flex flex-col gap-1'>
                        <span>Vi</span>
                        <div className='flex items-center'>
                          <Input
                            type='number'
                            min='0'
                            max='100'
                            step='0.1'
                            value={lessonBonus.vi}
                            onChange={e =>
                              handleLessonBonusChange('vi', e.target.value)
                            }
                          />
                          <span className='ml-1'>%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Labeled>
                <Labeled label='チャレンジPアイテム'>
                  <div className='flex-grow'>
                    <div className='flex gap-2'>
                      <div className='flex flex-col gap-1'>
                        <span>1枠目</span>
                        <Input
                          type='number'
                          min='0'
                          step='5'
                          value={challenge.slot1}
                          onChange={e =>
                            handleChallengePChange(
                              'slot1',
                              pint(e.target.value)
                            )
                          }
                        />
                      </div>
                      <div className='flex flex-col gap-1'>
                        <span>2枠目</span>
                        <Input
                          type='number'
                          min='0'
                          step='5'
                          value={challenge.slot2}
                          onChange={e =>
                            handleChallengePChange(
                              'slot2',
                              pint(e.target.value)
                            )
                          }
                        />
                      </div>
                      <div className='flex flex-col gap-1'>
                        <span>3枠目</span>
                        <Input
                          type='number'
                          min='0'
                          step='5'
                          value={challenge.slot3}
                          onChange={e =>
                            handleChallengePChange(
                              'slot3',
                              pint(e.target.value)
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </Labeled>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Tabs defaultValue='stats' className='w-full'>
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
                  const { vo, da, vi } = {
                    vo: calc(
                      scenario,
                      'vo',
                      lessonBonus.vo,
                      baseStats.vo,
                      lesson,
                      drive
                    ),
                    da: calc(
                      scenario,
                      'da',
                      lessonBonus.da,
                      baseStats.da,
                      lesson,
                      drive
                    ),
                    vi: calc(
                      scenario,
                      'vi',
                      lessonBonus.vi,
                      baseStats.vi,
                      lesson,
                      drive
                    )
                  }
                  const { vo_result, da_result, vi_result } = {
                    vo_result: Math.min(statLimit[scenario].vo, vo + 30),
                    da_result: Math.min(statLimit[scenario].da, da + 30),
                    vi_result: Math.min(statLimit[scenario].vi, vi + 30)
                  }
                  return (
                    <Card key={`${v1}-${v2}`}>
                      <CardHeader>
                        <CardTitle>{`${v1}-${v2}`}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>ステータス</TableHead>
                              <TableHead>最終試験前</TableHead>
                              <TableHead>最終試験後</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>Vo</TableCell>
                              <TableCell>{vo}</TableCell>
                              <TableCell>{vo_result}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Da</TableCell>
                              <TableCell>{da}</TableCell>
                              <TableCell>{da_result}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Vi</TableCell>
                              <TableCell>{vi}</TableCell>
                              <TableCell>{vi_result}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>合計</TableCell>
                              <TableCell>{vo + da + vi}</TableCell>
                              <TableCell>
                                {vo_result + da_result + vi_result}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                        <div className='mt-4'>
                          <h4 className='font-semibold mb-2'>スコア</h4>
                          <ul className='space-y-1'>
                            {rankKeys.map(r => (
                              <li key={r}>
                                {r}: {score(r, vo_result, da_result, vi_result)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })
              )}
            </div>
          </TabsContent>
          <TabsContent value='wip'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>
              WIP
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
