"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { ScoreBadge } from "@/components/score-badge"
import { ScoreDescription } from "@/components/score-description"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Minus, Calendar } from "lucide-react"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import { BarChart, Bar } from "recharts"
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
        <main className="flex-1 p-3 sm:p-4 md:p-8 w-full overflow-x-hidden">
          <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
            {/* Page Header */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-medium text-foreground mb-1 sm:mb-2">
                  ダッシュボード
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                  組織の健全性を一目で確認できます
                </p>
              </div>
              <Button variant="outline" className="w-full sm:w-auto bg-transparent text-sm sm:text-base">
                <Calendar className="mr-2 h-4 w-4" />
                期間を選択
              </Button>
            </div>

            {/* Overall Score Card */}
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-lg sm:text-xl">総合スコア</CardTitle>
                <CardDescription className="text-xs sm:text-sm">最新のサーベイ結果（2025年1月実施）</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4 sm:gap-6">
                  <div className="space-y-3 sm:space-y-4">
                    <ScoreBadge score={currentScore} />
                    <ScoreDescription score={currentScore} />
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
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
                  <div className="text-left border-t border-border pt-4">
                    <div className="text-xs sm:text-sm text-muted-foreground mb-1">回答率</div>
                    <div className="text-xl sm:text-2xl font-medium text-foreground">94%</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">78名中73名が回答</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {/* Radar Chart */}
              <Card className="overflow-hidden">
                <CardHeader className="pb-2 sm:pb-3 md:pb-4">
                  <CardTitle className="text-base sm:text-lg md:text-xl">カテゴリ別評価</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">6つの主要カテゴリのバランス</CardDescription>
                </CardHeader>
                <CardContent className="p-2 sm:p-3 md:p-6">
                  <ChartContainer
                    config={{
                      score: {
                        label: "スコア",
                        color: "oklch(0.45 0.15 264)",
                      },
                    }}
                    className="h-[200px] sm:h-[250px] md:h-[300px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                        <PolarGrid stroke="oklch(0.92 0.005 264)" />
                        <PolarAngleAxis
                          dataKey="category"
                          tick={{ fill: "oklch(0.55 0.01 264)", fontSize: window.innerWidth < 640 ? 9 : 11 }}
                        />
                        <PolarRadiusAxis
                          angle={90}
                          domain={[0, 100]}
                          tick={{ fill: "oklch(0.55 0.01 264)", fontSize: window.innerWidth < 640 ? 8 : 10 }}
                        />
                        <Radar
                          name="スコア"
                          dataKey="score"
                          stroke="oklch(0.45 0.15 264)"
                          fill="oklch(0.45 0.15 264)"
                          fillOpacity={0.3}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "oklch(0.98 0.002 264)",
                            border: "1px solid oklch(0.92 0.005 264)",
                            borderRadius: "6px",
                            fontSize: "12px",
                          }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Department Comparison */}
              <Card className="overflow-hidden">
                <CardHeader className="pb-2 sm:pb-3 md:pb-4">
                  <CardTitle className="text-base sm:text-lg md:text-xl">部門別スコア</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">各部門の総合スコア比較</CardDescription>
                </CardHeader>
                <CardContent className="p-2 sm:p-3 md:p-6">
                  <ChartContainer
                    config={{
                      score: {
                        label: "スコア",
                        color: "oklch(0.45 0.15 264)",
                      },
                    }}
                    className="h-[200px] sm:h-[250px] md:h-[300px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={departmentData} margin={{ top: 10, right: 10, bottom: 30, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.005 264)" />
                        <XAxis
                          dataKey="name"
                          tick={{ fill: "oklch(0.55 0.01 264)", fontSize: window.innerWidth < 640 ? 9 : 10 }}
                          angle={window.innerWidth < 640 ? -45 : 0}
                          textAnchor={window.innerWidth < 640 ? "end" : "middle"}
                          height={window.innerWidth < 640 ? 60 : 30}
                        />
                        <YAxis
                          domain={[0, 100]}
                          tick={{ fill: "oklch(0.55 0.01 264)", fontSize: window.innerWidth < 640 ? 8 : 10 }}
                          width={window.innerWidth < 640 ? 30 : 40}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="score" fill="oklch(0.45 0.15 264)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Historical Trend */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-2 sm:pb-3 md:pb-4">
                <CardTitle className="text-base sm:text-lg md:text-xl">スコア推移</CardTitle>
                <CardDescription className="text-xs sm:text-sm">過去6ヶ月間の総合スコアの変化</CardDescription>
              </CardHeader>
              <CardContent className="p-2 sm:p-3 md:p-6">
                <ChartContainer
                  config={{
                    score: {
                      label: "スコア",
                      color: "oklch(0.45 0.15 264)",
                    },
                  }}
                  className="h-[180px] sm:h-[220px] md:h-[280px] w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historicalData} margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.005 264)" />
                      <XAxis
                        dataKey="month"
                        tick={{ fill: "oklch(0.55 0.01 264)", fontSize: window.innerWidth < 640 ? 9 : 10 }}
                        width={window.innerWidth < 640 ? 30 : 40}
                      />
                      <YAxis
                        domain={[0, 100]}
                        tick={{ fill: "oklch(0.55 0.01 264)", fontSize: window.innerWidth < 640 ? 8 : 10 }}
                        width={window.innerWidth < 640 ? 30 : 40}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "oklch(0.98 0.002 264)",
                          border: "1px solid oklch(0.92 0.005 264)",
                          borderRadius: "6px",
                          fontSize: "12px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="oklch(0.45 0.15 264)"
                        strokeWidth={2}
                        dot={{ fill: "oklch(0.45 0.15 264)", r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              <Card>
                <CardHeader className="pb-2 sm:pb-3">
                  <CardDescription className="text-xs sm:text-sm">最高スコア部門</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-2xl font-medium text-foreground">管理課</div>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">85点</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2 sm:pb-3">
                  <CardDescription className="text-xs sm:text-sm">改善が必要な領域</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-2xl font-medium text-foreground">イノベーション</div>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">68点</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2 sm:pb-3">
                  <CardDescription className="text-xs sm:text-sm">次回サーベイ</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-2xl font-medium text-foreground">2025年4月</div>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">3ヶ月後</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
