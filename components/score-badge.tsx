import { cn } from "@/lib/utils"

interface ScoreBadgeProps {
  score: number
  className?: string
}

export function ScoreBadge({ score, className }: ScoreBadgeProps) {
  const getScoreLevel = (score: number) => {
    if (score <= 45) return { label: "要改善", color: "bg-[oklch(0.55_0.22_25)] text-white" }
    if (score <= 54) return { label: "注意", color: "bg-[oklch(0.75_0.15_65)] text-white" }
    if (score <= 69) return { label: "標準", color: "bg-[oklch(0.65_0.12_264)] text-white" }
    if (score <= 84) return { label: "良好", color: "bg-[oklch(0.55_0.15_160)] text-white" }
    return { label: "優秀", color: "bg-[oklch(0.45_0.18_145)] text-white" }
  }

  const level = getScoreLevel(score)

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <span className="text-3xl font-medium text-foreground">{score}</span>
      <span className={cn("px-3 py-1 rounded-full text-sm font-medium", level.color)}>{level.label}</span>
    </div>
  )
}
