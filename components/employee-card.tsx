import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Employee } from "@/lib/organization-data"
import { cn } from "@/lib/utils"

interface EmployeeCardProps {
  employee: Employee
  showScore?: boolean
  size?: "sm" | "md" | "lg"
}

export function EmployeeCard({ employee, showScore = true, size = "md" }: EmployeeCardProps) {
  const getScoreColor = (score?: number) => {
    if (!score) return "bg-muted"
    if (score <= 45) return "bg-[oklch(0.55_0.22_25)]"
    if (score <= 54) return "bg-[oklch(0.75_0.15_65)]"
    if (score <= 69) return "bg-[oklch(0.65_0.12_264)]"
    if (score <= 84) return "bg-[oklch(0.55_0.15_160)]"
    return "bg-[oklch(0.45_0.18_145)]"
  }

  const getTypeLabel = (type: Employee["type"]) => {
    switch (type) {
      case "executive":
        return "役員"
      case "manager":
        return "管理職"
      case "contractor":
        return "委託"
      default:
        return "社員"
    }
  }

  return (
    <Card className={cn("hover:shadow-md transition-shadow", size === "sm" && "text-sm")}>
      <CardContent className={cn("p-4", size === "sm" && "p-3")}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={cn("font-medium text-foreground truncate", size === "sm" && "text-sm")}>
                {employee.name}
              </h3>
              <Badge variant="secondary" className="text-xs shrink-0">
                {getTypeLabel(employee.type)}
              </Badge>
            </div>
            <p className={cn("text-muted-foreground truncate", size === "sm" ? "text-xs" : "text-sm")}>
              {employee.position}
            </p>
            {employee.team && (
              <p className={cn("text-muted-foreground truncate mt-0.5", size === "sm" ? "text-xs" : "text-sm")}>
                {employee.team}
              </p>
            )}
          </div>
          {showScore && employee.score && (
            <div className="flex flex-col items-end shrink-0">
              <div className={cn("font-medium text-foreground", size === "sm" ? "text-base" : "text-lg")}>
                {employee.score}
              </div>
              <div className={cn("h-1.5 w-12 rounded-full mt-1", getScoreColor(employee.score))} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
