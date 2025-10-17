"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EmployeeCard } from "@/components/employee-card"
import { organizationData, ceo } from "@/lib/organization-data"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight, Users, Building2 } from "lucide-react"
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
  }, 1) // +1 for CEO

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardNav />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Page Header */}
            <div>
              <h1 className="text-3xl font-medium text-foreground mb-2">組織図</h1>
              <p className="text-muted-foreground">株式会社サンホークの組織構成とスコア</p>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>総従業員数</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <span className="text-2xl font-medium text-foreground">{totalEmployees}名</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>部門数</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-muted-foreground" />
                    <span className="text-2xl font-medium text-foreground">{organizationData.length}部門</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>組織平均スコア</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-medium text-foreground">78点</div>
                  <Badge className="mt-2 bg-[oklch(0.55_0.15_160)] text-white">良好</Badge>
                </CardContent>
              </Card>
            </div>

            {/* CEO */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  経営層
                </CardTitle>
              </CardHeader>
              <CardContent>
                <EmployeeCard employee={ceo} />
              </CardContent>
            </Card>

            {/* Departments */}
            <div className="space-y-4">
              {organizationData.map((department) => {
                const isExpanded = expandedDepartments.has(department.id)

                return (
                  <Card key={department.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleDepartment(department.id)}
                            className="h-8 w-8 p-0"
                          >
                            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                          </Button>
                          <div>
                            <CardTitle className="text-xl">{department.name}</CardTitle>
                            <CardDescription className="mt-1">平均スコア: {department.averageScore}点</CardDescription>
                          </div>
                        </div>
                        <Badge variant="outline">
                          {department.teams.reduce((acc, team) => acc + team.members.length + 1, 1)}名
                        </Badge>
                      </div>
                    </CardHeader>

                    {isExpanded && (
                      <CardContent className="space-y-6">
                        {/* Department Manager */}
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-3">部門長</h4>
                          <EmployeeCard employee={department.manager} />
                        </div>

                        {/* Teams */}
                        {department.teams.length > 0 && (
                          <div className="space-y-4">
                            <h4 className="text-sm font-medium text-muted-foreground">チーム</h4>
                            {department.teams.map((team) => {
                              const isTeamExpanded = expandedTeams.has(team.id)

                              return (
                                <Card key={team.id} className="bg-muted/30">
                                  <CardHeader className="pb-4">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-3">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => toggleTeam(team.id)}
                                          className="h-8 w-8 p-0"
                                        >
                                          {isTeamExpanded ? (
                                            <ChevronDown className="h-4 w-4" />
                                          ) : (
                                            <ChevronRight className="h-4 w-4" />
                                          )}
                                        </Button>
                                        <div>
                                          <CardTitle className="text-base">{team.name}</CardTitle>
                                          <CardDescription className="text-xs mt-1">
                                            平均スコア: {team.averageScore}点
                                          </CardDescription>
                                        </div>
                                      </div>
                                      <Badge variant="secondary" className="text-xs">
                                        {team.members.length + 1}名
                                      </Badge>
                                    </div>
                                  </CardHeader>

                                  {isTeamExpanded && (
                                    <CardContent className="space-y-4">
                                      {/* Team Manager */}
                                      <div>
                                        <h5 className="text-xs font-medium text-muted-foreground mb-2">責任者</h5>
                                        <EmployeeCard employee={team.manager} size="sm" />
                                      </div>

                                      {/* Team Members */}
                                      {team.members.length > 0 && (
                                        <div>
                                          <h5 className="text-xs font-medium text-muted-foreground mb-2">メンバー</h5>
                                          <div className="grid md:grid-cols-2 gap-3">
                                            {team.members.map((member) => (
                                              <EmployeeCard key={member.id} employee={member} size="sm" />
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </CardContent>
                                  )}
                                </Card>
                              )
                            })}
                          </div>
                        )}
                      </CardContent>
                    )}
                  </Card>
                )
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
