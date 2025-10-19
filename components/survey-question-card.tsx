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
  { value: "1", label: "まったくそう思わない" },
  { value: "2", label: "そう思わない" },
  { value: "3", label: "どちらかと言えばそう思わない" },
  { value: "4", label: "どちらかといえばそう思う" },
  { value: "5", label: "そう思う" },
  { value: "6", label: "非常にそう思う" },
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

          <RadioGroup value={value} onValueChange={onChange} className="space-y-2 md:space-y-3">
            {scaleOptions.map((option) => (
              <div
                key={option.value}
                className="flex items-start space-x-3 p-2 md:p-0 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
              >
                <RadioGroupItem
                  value={option.value}
                  id={`q${question.id}-${option.value}`}
                  className="mt-1 flex-shrink-0"
                />
                <Label
                  htmlFor={`q${question.id}-${option.value}`}
                  className="text-sm md:text-base font-normal cursor-pointer flex-1 leading-relaxed"
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
