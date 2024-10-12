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

export default function Home() {
  const [scenario, setScenario] = useState<'pro' | 'master'>('master')
  const [baseStats, setBaseStats] = useState({ vo: 0, da: 0, vi: 0 })
  const [lessonBonus, setLessonBonus] = useState({ vo: 0, da: 0, vi: 0 })
  const [challenge, setChallenge] = useState({ slot1: 0, slot2: 0, slot3: 0 })

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
      </main>
    </div>
  )
}
