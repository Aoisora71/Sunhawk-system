"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmployeeCard } from "@/components/employee-card"
import type { Employee } from "@/lib/organization-data"
import { cn } from "@/lib/utils"

interface OrgTreeNodeProps {
  employee: Employee
  children?: React.ReactNode
  level: number
  isLast?: boolean
  hasChildren?: boolean
}

export function OrgTreeNode({ employee, children, level, isLast = true, hasChildren = false }: OrgTreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(level < 2)

  const getPaddingLeft = () => {
    if (level === 0) return "0"
    if (level === 1) return "1rem"
    if (level === 2) return "2rem"
    return "3rem"
  }

  return (
    <div className="relative">
      {/* Vertical line from parent - responsive styling */}
      {level > 0 && (
        <div
          className={cn(
            "absolute top-0 w-px bg-border/60 transition-colors",
            isLast ? "h-12 sm:h-14 md:h-16" : "h-full",
          )}
          style={{ left: `calc(${getPaddingLeft()} - 0.5rem)` }}
        />
      )}

      {/* Horizontal line to node - responsive styling */}
      {level > 0 && (
        <div
          className="absolute h-px bg-border/60 transition-colors"
          style={{
            top: "3rem",
            left: `calc(${getPaddingLeft()} - 0.5rem)`,
            width: "0.5rem",
          }}
        />
      )}

      {/* Node container */}
      <div style={{ paddingLeft: getPaddingLeft() }} className="relative">
        <div className="flex items-start gap-1.5 sm:gap-2">
          {/* Expand/collapse button */}
          {hasChildren && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-7 w-7 sm:h-8 sm:w-8 p-0 shrink-0 mt-1 hover:bg-accent/50"
            >
              {isExpanded ? (
                <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              )}
            </Button>
          )}
          {!hasChildren && level > 0 && <div className="h-7 w-7 sm:h-8 sm:w-8 shrink-0" />}

          {/* Employee card - responsive sizing */}
          <div className="flex-1 min-w-0">
            <EmployeeCard
              employee={employee}
              size={level === 0 ? "md" : level === 1 ? "sm" : "xs"}
              compact={level > 1}
            />
          </div>
        </div>

        {/* Children with smooth animation */}
        {isExpanded && children && (
          <div className="mt-3 sm:mt-4 md:mt-5 relative animate-in fade-in duration-200">{children}</div>
        )}
      </div>
    </div>
  )
}
