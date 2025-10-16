"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { ScoreBadge } from "@/components/score-badge"
import { ScoreDescription } from "@/components/score-description"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Minus, Calendar } from "lucide-react"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data for radar chart
const radarData = [
  { category: "リーダーシップ", score: 78, fullMark: 100 },
  { category: "チームワーク", score: 82, fullMark: 100 },
  { category: "コミュニケーション", score: 71, fullMark: 100 },
  { category: "業務効率", score: 85, fullMark: 100 },
  { category: "イノベーション", score: 68, fullMark: 100 },
  { category: "顧客志向", score: 79, fullMark: 100 },
]

// Sample data for bar chart (department comparison)
const departmentData = [
  { name: "輸送第一課", score: 78 },
  { name: "輸送第二課", score: 72 },
  { name: "輸送第三課", score: 81 },
  { name: "管理課", score: 85 },
  { name: "実FARM事業", score: 76 },
]

// Sample historical data
const historicalData = [
  { month: "1月", score: 68 },
  { month: "2月", score: 71 },
  { month: "3月", score: 73 },
  { month: "4月", score: 75 },
  { month: "5月", score: 76 },
  { month: "6月", score: 78 },
]

export default function DashboardPage() {
  const currentScore = 78
  const previousScore = 76
  const scoreDiff = currentScore - previousScore

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex flex-col md:flex-row">
        <DashboardNav />
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-medium text-foreground mb-2">ダッシュボード</h1>
                <p className="text-sm md:text-base text-muted-foreground">組織の健全性を一目で確認できます</p>
              </div>
              <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                <Calendar className="mr-2 h-4 w-4" />
                期間を選択
              </Button>
            </div>

            {/* Overall Score Card */}
            <Card>
              <CardHeader>
                <CardTitle>総合スコア</CardTitle>
                <CardDescription>最新のサーベイ結果（2025年1月実施）</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-start md:items-start justify-between gap-6">
                  <div className="space-y-4">
                    <ScoreBadge score={currentScore} />
                    <ScoreDescription score={currentScore} />
                    <div className="flex items-center gap-2 text-sm">
                      {scoreDiff > 0 ? (
                        <>
                          <TrendingUp className="h-4 w-4 text-[oklch(0.55_0.15_160)]" />
                          <span className="text-[oklch(0.55_0.15_160)] font-medium">+{scoreDiff}点</span>
                        </>
                      ) : scoreDiff < 0 ? (
                        <>
                          <TrendingDown className="h-4 w-4 text-[oklch(0.55_0.22_25)]" />
                          <span className="text-[oklch(0.55_0.22_25)] font-medium">{scoreDiff}点</span>
                        </>
                      ) : (
                        <>
                          <Minus className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground font-medium">変化なし</span>
                        </>
                      )}
                      <span className="text-muted-foreground">前回比</span>
                    </div>
                  </div>
                  <div className="text-left md:text-right w-full md:w-auto">
                    <div className="text-sm text-muted-foreground mb-1">回答率</div>
                    <div className="text-2xl font-medium text-foreground">94%</div>
                    <div className="text-sm text-muted-foreground">78名中73名が回答</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Charts Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Radar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>カテゴリ別評価</CardTitle>
                  <CardDescription>6つの主要カテゴリのバランス</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      score: {
                        label: "スコア",
                        color: "oklch(0.45 0.15 264)",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="oklch(0.92 0.005 264)" />
                        <PolarAngleAxis dataKey="category" tick={{ fill: "oklch(0.55 0.01 264)", fontSize: 12 }} />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "oklch(0.55 0.01 264)" }} />
                        <Radar
                          name="スコア"
                          dataKey="score"
                          stroke="oklch(0.45 0.15 264)"
                          fill="oklch(0.45 0.15 264)"
                          fillOpacity={0.3}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Department Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle>部門別スコア</CardTitle>
                  <CardDescription>各部門の総合スコア比較</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      score: {
                        label: "スコア",
                        color: "oklch(0.45 0.15 264)",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={departmentData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.005 264)" />
                        <XAxis dataKey="name" tick={{ fill: "oklch(0.55 0.01 264)", fontSize: 11 }} />
                        <YAxis domain={[0, 100]} tick={{ fill: "oklch(0.55 0.01 264)" }} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="score" fill="oklch(0.45 0.15 264)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Historical Trend */}
            <Card>
              <CardHeader>
                <CardTitle>スコア推移</CardTitle>
                <CardDescription>過去6ヶ月間の総合スコアの変化</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    score: {
                      label: "スコア",
                      color: "oklch(0.45 0.15 264)",
                    },
                  }}
                  className="h-[250px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={historicalData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.005 264)" />
                      <XAxis dataKey="month" tick={{ fill: "oklch(0.55 0.01 264)" }} />
                      <YAxis domain={[0, 100]} tick={{ fill: "oklch(0.55 0.01 264)" }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="score" fill="oklch(0.45 0.15 264)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>最高スコア部門</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-medium text-foreground">管理課</div>
                  <p className="text-sm text-muted-foreground mt-1">85点</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>改善が必要な領域</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-medium text-foreground">イノベーション</div>
                  <p className="text-sm text-muted-foreground mt-1">68点</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>次回サーベイ</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-medium text-foreground">2025年4月</div>
                  <p className="text-sm text-muted-foreground mt-1">3ヶ月後</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
