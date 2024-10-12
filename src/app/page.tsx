'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Labeled } from '@/components/common/labeled'
import { calc, score } from '@/utils/func'
import {
  paramKeys,
  rankKeys,
  statLimit,
  type Challenge,
  type Params,
  type Scenario,
} from '@/utils/const'

export default function Home() {
  const [scenario, setScenario] = useState<Scenario>('master')
  const [baseStats, setBaseStats] = useState<Params<number>>({
    vo: 0,
    da: 0,
    vi: 0,
  })
  const [lessonBonus, setLessonBonus] = useState<Params<number>>({
    vo: 0,
    da: 0,
    vi: 0,
  })
  const [challenge, setChallenge] = useState<Challenge>({
    slot1: 0,
    slot2: 0,
    slot3: 0,
  })

  const handleScenarioChange = (scenario: 'pro' | 'master') => {
    if (scenario === 'pro' || scenario === 'master') {
      setScenario(scenario)
    } else {
      setScenario('master')
    }
  }

  const handleBaseStatsChange = (stat: 'vo' | 'da' | 'vi', value: number) => {
    setBaseStats((prev) => ({ ...prev, [stat]: value }))
  }

  const handleLessonBonusChange = (stat: 'vo' | 'da' | 'vi', value: number) => {
    setLessonBonus((prev) => ({ ...prev, [stat]: value }))
  }

  const handleChallengePChange = (
    slot: 'slot1' | 'slot2' | 'slot3',
    value: number,
  ) => {
    setChallenge((prev) => ({ ...prev, [slot]: value }))
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-md">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>ステータス情報入力</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <Labeled label="シナリオ">
                  <RadioGroup
                    value={scenario}
                    onValueChange={handleScenarioChange}
                    className="w-full"
                  >
                    <div className="flex justify-center gap-8 w-full">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pro" id="pro" />
                        <Label htmlFor="pro">プロ</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="master" id="master" />
                        <Label htmlFor="master">マスター</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </Labeled>
                <Labeled label="基礎ステータス">
                  <div className="flex-grow">
                    <div className="flex gap-2">
                      <div className="flex flex-col gap-1">
                        <span>Vo</span>
                        <Input
                          type="number"
                          min="0"
                          step="1"
                          value={baseStats.vo}
                          onChange={(e) =>
                            handleBaseStatsChange(
                              'vo',
                              Number.parseInt(e.target.value),
                            )
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span>Da</span>
                        <Input
                          type="number"
                          min="0"
                          step="1"
                          value={baseStats.da}
                          onChange={(e) =>
                            handleBaseStatsChange(
                              'da',
                              Number.parseInt(e.target.value),
                            )
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span>Vi</span>
                        <Input
                          type="number"
                          min="0"
                          step="1"
                          value={baseStats.vi}
                          onChange={(e) =>
                            handleBaseStatsChange(
                              'vi',
                              Number.parseInt(e.target.value),
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </Labeled>
                <Labeled label="レッスンボーナス">
                  <div className="flex-grow">
                    <div className="flex gap-2">
                      <div className="flex flex-col gap-1">
                        <span>Vo</span>
                        <div className="flex items-center">
                          <Input
                            type="number"
                            min="0"
                            step="0.1"
                            value={lessonBonus.vo}
                            onChange={(e) =>
                              handleLessonBonusChange(
                                'vo',
                                Number.parseFloat(e.target.value),
                              )
                            }
                          />
                          <span className="ml-1">%</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span>Da</span>
                        <div className="flex items-center">
                          <Input
                            type="number"
                            min="0"
                            step="0.1"
                            value={lessonBonus.da}
                            onChange={(e) =>
                              handleLessonBonusChange(
                                'da',
                                Number.parseFloat(e.target.value),
                              )
                            }
                          />
                          <span className="ml-1">%</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span>Vi</span>
                        <div className="flex items-center">
                          <Input
                            type="number"
                            min="0"
                            step="0.1"
                            value={lessonBonus.vi}
                            onChange={(e) =>
                              handleLessonBonusChange(
                                'vi',
                                Number.parseFloat(e.target.value),
                              )
                            }
                          />
                          <span className="ml-1">%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Labeled>
                <Labeled label="チャレンジPアイテム">
                  <div className="flex-grow">
                    <div className="flex gap-2">
                      <div className="flex flex-col gap-1">
                        <span>1枠目</span>
                        <Input
                          type="number"
                          min="0"
                          step="5"
                          value={challenge.slot1}
                          onChange={(e) =>
                            handleChallengePChange(
                              'slot1',
                              Number.parseInt(e.target.value),
                            )
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span>2枠目</span>
                        <Input
                          type="number"
                          min="0"
                          step="5"
                          value={challenge.slot2}
                          onChange={(e) =>
                            handleChallengePChange(
                              'slot2',
                              Number.parseInt(e.target.value),
                            )
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span>3枠目</span>
                        <Input
                          type="number"
                          min="0"
                          step="5"
                          value={challenge.slot3}
                          onChange={(e) =>
                            handleChallengePChange(
                              'slot3',
                              Number.parseInt(e.target.value),
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
        {paramKeys.map((v1) => (
          <div className="flex flex-grow gap-2 w-full">
            {paramKeys.map((v2) => {
              const lesson = {
                stat: v1,
                isSP: true,
                challenge,
              }
              const drive = { stat: v2 }
              const { vo, da, vi } = {
                vo: calc(
                  scenario,
                  'vo',
                  lessonBonus.vo,
                  baseStats.vo,
                  lesson,
                  drive,
                ),
                da: calc(
                  scenario,
                  'da',
                  lessonBonus.da,
                  baseStats.da,
                  lesson,
                  drive,
                ),
                vi: calc(
                  scenario,
                  'vi',
                  lessonBonus.vi,
                  baseStats.vi,
                  lesson,
                  drive,
                ),
              }
              const { vo_result, da_result, vi_result } = {
                vo_result: Math.min(statLimit[scenario].vo, vo + 30),
                da_result: Math.min(statLimit[scenario].da, da + 30),
                vi_result: Math.min(statLimit[scenario].vi, vi + 30),
              }
              return (
                <>
                  <div className="w-full">
                    {`${v1}-${v2}`}
                    <div>最終試験前</div>
                    <div className="flex gap-2">
                      <div className="flex flex-col gap-1">
                        <span>Vo</span>
                        <span>{vo}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span>Da</span>
                        <span>{da}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span>Vi</span>
                        <span>{vi}</span>
                      </div>
                    </div>
                    {`sum: ${vo + da + vi}`}
                    <div>最終試験後</div>
                    <div className="flex gap-2">
                      <div className="flex flex-col gap-1">
                        <span>Vo</span>
                        <span>{vo_result}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span>Da</span>
                        <span>{da_result}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span>Vi</span>
                        <span>{vi_result}</span>
                      </div>
                    </div>
                    {`sum: ${vo_result + da_result + vi_result}`}
                    {rankKeys.map((r) => (
                      <div>
                        {r}: {score(r, vo_result, da_result, vi_result)}
                      </div>
                    ))}
                  </div>
                </>
              )
            })}
          </div>
        ))}
      </main>
    </div>
  )
}
