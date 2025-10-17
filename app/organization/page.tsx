"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { OrgTreeNode } from "@/components/org-tree-node"
import { OrgTreeDepartment } from "@/components/org-tree-department"
import { organizationData, ceo } from "@/lib/organization-data"
import { Users, Building2, TrendingUp } from "lucide-react"
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
        <main className="flex-1 p-2 sm:p-3 md:p-8 w-full overflow-x-auto">
          <div className="max-w-full mx-auto space-y-3 sm:space-y-4 md:space-y-6">
            {/* Page Header - mobile optimized */}
            <div>
              <h1 className="text-lg sm:text-xl md:text-3xl font-medium text-foreground mb-0.5 sm:mb-1">組織図</h1>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                株式会社サンホークの組織構成とスコア
              </p>
            </div>

            {/* Stats - mobile optimized grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
              <Card className="hover:shadow-sm transition-shadow">
                <CardHeader className="pb-1.5 sm:pb-2">
                  <CardDescription className="text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2">
                    <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                    総従業員数
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-base sm:text-lg md:text-2xl font-medium text-foreground">
                    {totalEmployees}名
                  </span>
                </CardContent>
              </Card>

              <Card className="hover:shadow-sm transition-shadow">
                <CardHeader className="pb-1.5 sm:pb-2">
                  <CardDescription className="text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2">
                    <Building2 className="h-3 w-3 sm:h-4 sm:w-4" />
                    部門数
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-base sm:text-lg md:text-2xl font-medium text-foreground">
                    {organizationData.length}部門
                  </span>
                </CardContent>
              </Card>

              <Card className="hover:shadow-sm transition-shadow sm:col-span-2 lg:col-span-1">
                <CardHeader className="pb-1.5 sm:pb-2">
                  <CardDescription className="text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2">
                    <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                    組織平均スコア
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-base sm:text-lg md:text-2xl font-medium text-foreground">78点</span>
                    <Badge className="bg-[oklch(0.55_0.15_160)] text-white text-xs">良好</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Organization Tree - mobile optimized */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-2 sm:pb-3 border-b">
                <CardTitle className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base md:text-lg">
                  <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                  組織構成図
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 sm:p-3 md:p-6 overflow-x-auto">
                <div className="min-w-max md:min-w-full pb-2 sm:pb-3 md:pb-4">
                  {/* CEO */}
                  <OrgTreeNode employee={ceo} level={0} hasChildren={organizationData.length > 0}>
                    {/* Departments */}
                    <div className="mt-2 sm:mt-3 md:mt-6 space-y-2 sm:space-y-3 md:space-y-6">
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

            {/* Legend - mobile optimized */}
            <Card>
              <CardHeader className="pb-2 sm:pb-3 border-b">
                <CardTitle className="text-xs sm:text-sm md:text-base">スコア凡例</CardTitle>
              </CardHeader>
              <CardContent className="pt-2 sm:pt-3 md:pt-4">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-[oklch(0.45_0.18_145)] shrink-0" />
                    <span className="text-xs sm:text-sm text-muted-foreground">85点以上</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-[oklch(0.55_0.15_160)] shrink-0" />
                    <span className="text-xs sm:text-sm text-muted-foreground">70-84点</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-[oklch(0.65_0.12_264)] shrink-0" />
                    <span className="text-xs sm:text-sm text-muted-foreground">55-69点</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-[oklch(0.75_0.15_65)] shrink-0" />
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
