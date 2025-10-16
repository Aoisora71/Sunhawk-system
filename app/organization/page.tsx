"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { OrgTreeNode } from "@/components/org-tree-node"
import { OrgTreeDepartment } from "@/components/org-tree-department"
import { organizationData, ceo } from "@/lib/organization-data"
import { Users, Building2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function OrganizationPage() {
  const [expandedDepartments, setExpandedDepartments] = useState<Set<string>>(new Set(["transport"]))
  const [expandedTeams, setExpandedTeams] = useState<Set<string>>(new Set())

  const toggleDepartment = (deptId: string) => {
    setExpandedDepartments((prev) => {
      const next = new Set(prev)
      if (next.has(deptId)) {
        next.delete(deptId)
      } else {
        next.add(deptId)
      }
      return next
    })
  }

  const toggleTeam = (teamId: string) => {
    setExpandedTeams((prev) => {
      const next = new Set(prev)
      if (next.has(teamId)) {
        next.delete(teamId)
      } else {
        next.add(teamId)
      }
      return next
    })
  }

  const totalEmployees = organizationData.reduce((acc, dept) => {
    return (
      acc +
      1 +
      dept.teams.reduce((teamAcc, team) => {
        return teamAcc + 1 + team.members.length
      }, 0)
    )
  }, 1)

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex flex-col md:flex-row">
        <DashboardNav />
        <main className="flex-1 p-3 sm:p-4 md:p-8 w-full overflow-x-auto">
          <div className="max-w-full mx-auto space-y-4 sm:space-y-6 md:space-y-8">
            {/* Page Header */}
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-medium text-foreground mb-1 sm:mb-2">組織図</h1>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                株式会社サンホークの組織構成とスコア
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              <Card>
                <CardHeader className="pb-2 sm:pb-3">
                  <CardDescription className="text-xs sm:text-sm">総従業員数</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-lg sm:text-xl md:text-2xl font-medium text-foreground">
                      {totalEmployees}名
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2 sm:pb-3">
                  <CardDescription className="text-xs sm:text-sm">部門数</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-lg sm:text-xl md:text-2xl font-medium text-foreground">
                      {organizationData.length}部門
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2 sm:pb-3">
                  <CardDescription className="text-xs sm:text-sm">組織平均スコア</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-xl md:text-2xl font-medium text-foreground">78点</div>
                  <Badge className="mt-2 bg-[oklch(0.55_0.15_160)] text-white text-xs">良好</Badge>
                </CardContent>
              </Card>
            </div>

            {/* Organization Tree */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg md:text-xl">
                  <Building2 className="h-4 w-4 sm:h-5 sm:w-5" />
                  組織構成図
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 md:p-6 overflow-x-auto">
                <div className="min-w-max md:min-w-full pb-4">
                  {/* CEO */}
                  <OrgTreeNode employee={ceo} level={0} hasChildren={organizationData.length > 0}>
                    {/* Departments */}
                    <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
                      {organizationData.map((department, index) => (
                        <OrgTreeDepartment
                          key={department.id}
                          department={department}
                          isLast={index === organizationData.length - 1}
                        />
                      ))}
                    </div>
                  </OrgTreeNode>
                </div>
              </CardContent>
            </Card>

            {/* Legend */}
            <Card>
              <CardHeader className="pb-2 sm:pb-3">
                <CardTitle className="text-sm sm:text-base md:text-lg">凡例</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[oklch(0.45_0.18_145)]" />
                    <span className="text-xs sm:text-sm text-muted-foreground">85点以上</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[oklch(0.55_0.15_160)]" />
                    <span className="text-xs sm:text-sm text-muted-foreground">70-84点</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[oklch(0.65_0.12_264)]" />
                    <span className="text-xs sm:text-sm text-muted-foreground">55-69点</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[oklch(0.75_0.15_65)]" />
                    <span className="text-xs sm:text-sm text-muted-foreground">45-54点</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
