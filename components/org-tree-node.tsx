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

  const paddingLeft = level * 2

  return (
    <div className="relative">
      {/* Vertical line from parent */}
      {level > 0 && (
        <div
          className={cn("absolute left-0 top-0 w-px bg-border", isLast ? "h-12" : "h-full")}
          style={{ left: `${level * 2 - 1}rem` }}
        />
      )}

      {/* Horizontal line to node */}
      {level > 0 && (
        <div
          className="absolute top-12 h-px bg-border"
          style={{
            left: `${level * 2 - 1}rem`,
            width: "1rem",
          }}
        />
      )}

      {/* Node container */}
      <div style={{ paddingLeft: `${paddingLeft}rem` }} className="relative">
        <div className="flex items-start gap-2">
          {hasChildren && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-8 w-8 p-0 shrink-0 mt-1"
            >
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          )}
          {!hasChildren && level > 0 && <div className="h-8 w-8" />}

          {/* Employee card */}
          <div className="flex-1 min-w-0">
            <EmployeeCard employee={employee} size={level === 0 ? "md" : level === 1 ? "sm" : "sm"} />
          </div>
        </div>

        {/* Children */}
        {isExpanded && children && <div className="mt-4 relative">{children}</div>}
      </div>
    </div>
  )
}
