import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Employee } from "@/lib/organization-data"
import { getPositionColor } from "@/lib/position-colors"
import { cn } from "@/lib/utils"

interface EmployeeCardProps {
  employee: Employee
  showScore?: boolean
  size?: "xs" | "sm" | "md" | "lg"
  compact?: boolean
}

export function EmployeeCard({ employee, showScore = true, size = "md", compact = false }: EmployeeCardProps) {
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

  const positionColor = getPositionColor(employee.position)

  const sizeClasses = {
    xs: "p-1.5 sm:p-2",
    sm: "p-2 sm:p-2.5",
    md: "p-2.5 sm:p-3",
    lg: "p-3 sm:p-4",
  }

  const textSizeClasses = {
    xs: "text-xs",
    sm: "text-xs sm:text-sm",
    md: "text-sm sm:text-base",
    lg: "text-base sm:text-lg",
  }

  return (
    <Card
      className={cn(
        "hover:shadow-md transition-all border-2 duration-200 active:shadow-lg",
        positionColor.border,
        size === "sm" && "text-sm",
        size === "xs" && "text-xs",
      )}
    >
      <CardContent className={sizeClasses[size]}>
        <div className={cn("flex items-start justify-between gap-1.5 sm:gap-2", compact && "flex-col gap-1")}>
          <div className="flex-1 min-w-0">
            {/* Position badge - mobile optimized */}
            <div
              className={cn(
                "inline-block px-1 sm:px-1.5 py-0.5 rounded text-xs font-medium mb-0.5 sm:mb-1",
                positionColor.bg,
                positionColor.text,
                size === "xs" && "px-1 py-0.5 text-xs",
              )}
            >
              {positionColor.label}
            </div>

            {/* Name and type - improved mobile layout */}
            <div className="flex items-center gap-1 sm:gap-1.5 mb-0.5">
              <h3 className={cn("font-medium text-foreground truncate", textSizeClasses[size])}>{employee.name}</h3>
              <Badge variant="secondary" className={cn("text-xs shrink-0", size === "xs" && "text-xs px-1 py-0")}>
                {getTypeLabel(employee.type)}
              </Badge>
            </div>

            {/* Position */}
            <p className={cn("text-muted-foreground truncate", size === "xs" ? "text-xs" : "text-xs sm:text-sm")}>
              {employee.position}
            </p>

            {/* Team - hidden on xs size for mobile */}
            {employee.team && !compact && (
              <p
                className={cn(
                  "text-muted-foreground truncate mt-0.5",
                  size === "xs" ? "text-xs" : "text-xs sm:text-sm",
                )}
              >
                {employee.team}
              </p>
            )}
          </div>

          {/* Score display - mobile optimized positioning */}
          {showScore && employee.score && (
            <div className={cn("flex flex-col items-end shrink-0 gap-0.5", compact && "flex-row items-center gap-1")}>
              <div className={cn("font-medium text-foreground", textSizeClasses[size])}>{employee.score}</div>
              <div
                className={cn("h-1 sm:h-1.5 rounded-full", getScoreColor(employee.score), compact && "w-6 sm:w-8")}
                style={{ width: compact ? "1.5rem" : "2.5rem" }}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
