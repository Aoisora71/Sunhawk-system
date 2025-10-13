"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { SurveyQuestion } from "@/lib/survey-questions"

interface SurveyQuestionCardProps {
  question: SurveyQuestion
  value: string
  onChange: (value: string) => void
}

const scaleOptions = [
  { value: "1", label: "全くそう思わない" },
  { value: "2", label: "そう思わない" },
  { value: "3", label: "どちらでもない" },
  { value: "4", label: "そう思う" },
  { value: "5", label: "非常にそう思う" },
]

export function SurveyQuestionCard({ question, value, onChange }: SurveyQuestionCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <div className="text-sm text-muted-foreground mb-2">質問 {question.id}</div>
            <h3 className="text-lg font-medium text-foreground leading-relaxed">{question.question}</h3>
          </div>

          <RadioGroup value={value} onValueChange={onChange} className="space-y-3">
            {scaleOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-3">
                <RadioGroupItem value={option.value} id={`q${question.id}-${option.value}`} />
                <Label
                  htmlFor={`q${question.id}-${option.value}`}
                  className="text-sm font-normal cursor-pointer flex-1"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  )
}
