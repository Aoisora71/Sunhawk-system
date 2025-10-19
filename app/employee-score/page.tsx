"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Minus, Download, Share2, Award } from "lucide-react"
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
  BarChart,
  Bar,
} from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { ScoreBadge } from "@/components/score-badge"
import { ScoreDescription } from "@/components/score-description"

// Sample data for radar chart
const radarData = [
  { category: "変化意識", score: 78, fullMark: 100 },
  { category: "成果視点", score: 82, fullMark: 100 },
  { category: "行動優先意識", score: 71, fullMark: 100 },
  { category: "結果明確", score: 85, fullMark: 100 },
  { category: "自己評価意識", score: 68, fullMark: 100 },
  { category: "時感覚", score: 79, fullMark: 100 },
  { category: "組織内位置認識", score: 76, fullMark: 100 },
  { category: "免責意識", score: 81, fullMark: 100 },
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

// Category comparison with organization average
const categoryComparison = [
  { category: "変化意識", personal: 78, average: 75 },
  { category: "成果視点", personal: 82, average: 78 },
  { category: "行動優先意識", personal: 71, average: 74 },
  { category: "結果明確", personal: 85, average: 80 },
  { category: "自己評価意識", personal: 68, average: 72 },
  { category: "時感覚", personal: 79, average: 76 },
  { category: "組織内位置認識", personal: 76, average: 77 },
  { category: "免責意識", personal: 81, average: 79 },
]

export default function EmployeeScorePage() {
  const currentScore = 78
  const previousScore = 76
  const scoreDiff = currentScore - previousScore
  const organizationAverage = 76

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
                <h1 className="text-xl sm:text-2xl md:text-3xl font-medium text-foreground mb-1 sm:mb-2">マイスコア</h1>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                  あなたの評価スコアと詳細な分析結果を確認できます
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button variant="outline" className="w-full sm:w-auto bg-transparent text-sm sm:text-base">
                  <Download className="mr-2 h-4 w-4" />
                  レポートをダウンロード
                </Button>
                <Button variant="outline" className="w-full sm:w-auto bg-transparent text-sm sm:text-base">
                  <Share2 className="mr-2 h-4 w-4" />
                  共有
                </Button>
              </div>
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
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 border-t border-border pt-4">
                    <div>
                      <div className="text-xs sm:text-sm text-muted-foreground mb-1">あなたのスコア</div>
                      <div className="text-lg sm:text-2xl font-medium text-foreground">{currentScore}点</div>
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm text-muted-foreground mb-1">組織平均</div>
                      <div className="text-lg sm:text-2xl font-medium text-foreground">{organizationAverage}点</div>
                    </div>
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
                  <CardDescription className="text-xs sm:text-sm">8つの主要カテゴリのバランス</CardDescription>
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

              {/* Historical Trend */}
              <Card className="overflow-hidden">
                <CardHeader className="pb-2 sm:pb-3 md:pb-4">
                  <CardTitle className="text-base sm:text-lg md:text-xl">スコア推移</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">過去6ヶ月間のスコアの変化</CardDescription>
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
                      <LineChart data={historicalData} margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.005 264)" />
                        <XAxis
                          dataKey="month"
                          tick={{ fill: "oklch(0.55 0.01 264)", fontSize: window.innerWidth < 640 ? 9 : 10 }}
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
            </div>

            {/* Category Comparison */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-2 sm:pb-3 md:pb-4">
                <CardTitle className="text-base sm:text-lg md:text-xl">カテゴリ別比較</CardTitle>
                <CardDescription className="text-xs sm:text-sm">あなたのスコアと組織平均の比較</CardDescription>
              </CardHeader>
              <CardContent className="p-2 sm:p-3 md:p-6">
                <ChartContainer
                  config={{
                    personal: {
                      label: "あなた",
                      color: "oklch(0.45 0.15 264)",
                    },
                    average: {
                      label: "組織平均",
                      color: "oklch(0.75 0.08 264)",
                    },
                  }}
                  className="h-[250px] sm:h-[300px] md:h-[350px] w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryComparison} margin={{ top: 10, right: 10, bottom: 50, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.005 264)" />
                      <XAxis
                        dataKey="category"
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        tick={{ fill: "oklch(0.55 0.01 264)", fontSize: window.innerWidth < 640 ? 8 : 10 }}
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
                      <Bar dataKey="personal" fill="oklch(0.45 0.15 264)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="average" fill="oklch(0.75 0.08 264)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Insights and Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {/* Strengths */}
              <Card>
                <CardHeader className="pb-2 sm:pb-3">
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                    <Award className="h-5 w-5 text-[oklch(0.55_0.15_160)]" />
                    強み
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">スコアが高いカテゴリ</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium">結果明確</span>
                      <span className="text-sm font-medium text-[oklch(0.55_0.15_160)]">85点</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div className="bg-[oklch(0.55_0.15_160)] h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium">成果視点</span>
                      <span className="text-sm font-medium text-[oklch(0.55_0.15_160)]">82点</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div className="bg-[oklch(0.55_0.15_160)] h-2 rounded-full" style={{ width: "82%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium">免責意識</span>
                      <span className="text-sm font-medium text-[oklch(0.55_0.15_160)]">81点</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div className="bg-[oklch(0.55_0.15_160)] h-2 rounded-full" style={{ width: "81%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Areas for Improvement */}
              <Card>
                <CardHeader className="pb-2 sm:pb-3">
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-[oklch(0.75_0.15_65)]" />
                    改善が必要な領域
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">スコアが低いカテゴリ</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium">自己評価意識</span>
                      <span className="text-sm font-medium text-[oklch(0.75_0.15_65)]">68点</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div className="bg-[oklch(0.75_0.15_65)] h-2 rounded-full" style={{ width: "68%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium">行動優先意識</span>
                      <span className="text-sm font-medium text-[oklch(0.75_0.15_65)]">71点</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div className="bg-[oklch(0.75_0.15_65)] h-2 rounded-full" style={{ width: "71%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium">組織内位置認識</span>
                      <span className="text-sm font-medium text-[oklch(0.75_0.15_65)]">76点</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div className="bg-[oklch(0.75_0.15_65)] h-2 rounded-full" style={{ width: "76%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recommendations */}
            <Card>
              <CardHeader className="pb-2 sm:pb-3">
                <CardTitle className="text-base sm:text-lg">改善のための推奨事項</CardTitle>
                <CardDescription className="text-xs sm:text-sm">スコア向上に向けた具体的なアクション</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-muted rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[oklch(0.75_0.15_65)] text-white flex items-center justify-center text-sm font-medium">
                      1
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">自己評価意識の向上</p>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        定期的に上司とのフィードバック面談を実施し、自分の強みと改善点を明確にしましょう。
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-muted rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[oklch(0.75_0.15_65)] text-white flex items-center justify-center text-sm font-medium">
                      2
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">行動優先意識の強化</p>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        小さなアクションから始めて、実行力を高めていきましょう。失敗を恐れずチャレンジすることが大切です。
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-muted rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[oklch(0.75_0.15_65)] text-white flex items-center justify-center text-sm font-medium">
                      3
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">組織内位置認識の深化</p>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        他部門との連携を増やし、組織全体における自分の役割と貢献を理解しましょう。
                      </p>
                    </div>
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
