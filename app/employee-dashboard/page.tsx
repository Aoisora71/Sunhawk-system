"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, CheckCircle2, FileText, AlertCircle } from "lucide-react"
import Link from "next/link"
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
import { ChartContainer } from "@/components/ui/chart"

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

export default function EmployeeDashboardPage() {
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
                  従業員ダッシュボード
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                  サーベイに回答して、あなたのスコアを確認しましょう
                </p>
              </div>
              <Link href="/survey" className="block">
                <Button variant="outline" className="w-full sm:w-auto bg-transparent text-sm sm:text-base">
                  <Calendar className="mr-2 h-4 w-4" />
                  期間を選択
                </Button>
              </Link>
            </div>

            {/* Survey Entry Card */}
            <Card className="border-2 border-primary/20">
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      サーベイに回答する
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm mt-1">
                      78個の質問に答えて、あなたの評価スコアを取得します
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      <span className="text-muted-foreground">回答時間の目安：約15～20分</span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      6段階の評価スケールで、各質問に対してあなたの意見をお聞きします
                    </p>
                  </div>
                  <Link href="/survey" className="block">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      サーベイを開始する
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Overall Score Card */}
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-lg sm:text-xl">あなたのスコア</CardTitle>
                <CardDescription className="text-xs sm:text-sm">最新のサーベイ結果</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">総合スコア</p>
                      <p className="text-3xl sm:text-4xl font-bold text-foreground">78</p>
                    </div>
                    <div className="text-right">
                      <CheckCircle2 className="h-8 w-8 text-green-600 mb-2" />
                      <p className="text-xs sm:text-sm text-green-600 font-medium">回答済み</p>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    <p>最終更新：2025年1月15日</p>
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

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              <Card>
                <CardHeader className="pb-2 sm:pb-3">
                  <CardDescription className="text-xs sm:text-sm">強み</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-2xl font-medium text-foreground">結果明確</div>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">85点</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2 sm:pb-3">
                  <CardDescription className="text-xs sm:text-sm">改善が必要な領域</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-2xl font-medium text-foreground">自己評価意識</div>
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
