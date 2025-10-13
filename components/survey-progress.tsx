import { Progress } from "@/components/ui/progress"

interface SurveyProgressProps {
  current: number
  total: number
  category: string
}

export function SurveyProgress({ current, total, category }: SurveyProgressProps) {
  const percentage = (current / total) * 100

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          質問 {current} / {total}
        </span>
        <span className="font-medium text-foreground">{category}</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  )
}
