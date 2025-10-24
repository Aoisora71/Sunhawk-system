"use client"

import { useState } from "react"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, CheckCircle2, AlertCircle, Clock } from "lucide-react"
import { surveyQuestions, categories } from "@/lib/survey-questions"

export default function EmployeePortal() {
  const [surveyStatus] = useState({
    completed: 2,
    total: 4,
    lastCompleted: "2025年1月15日",
  })

  const categoryStats = categories.map((category) => {
    const categoryQuestions = surveyQuestions.filter((q) => q.category === category)
    return {
      name: category,
      total: categoryQuestions.length,
    }
  })

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="p-3 sm:p-4 md:p-8 w-full">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Page Header */}
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-foreground mb-2">従業員ポータル</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              サーベイに参加して、組織の改善に貢献してください
            </p>
          </div>

          {/* Survey Entry Card */}
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader className="pb-4 sm:pb-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-xl sm:text-2xl flex items-center gap-2 mb-2">
                    <FileText className="h-6 w-6 text-primary" />
                    サーベイに回答する
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    78個の質問に答えて、組織の改善に協力してください
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-amber-600" />
                  <span className="text-muted-foreground">回答時間の目安：約15～20分</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  6段階の評価スケール（まったくそう思わない～非常にそう思う）で、各質問にお答えください
                </p>
              </div>
              <Link href="/employee-survey" className="block">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base sm:text-lg py-6">
                  サーベイを開始する
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Survey Status */}
          <Card>
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl">サーベイ参加状況</CardTitle>
              <CardDescription className="text-xs sm:text-sm">あなたのサーベイ参加履歴</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">参加済みサーベイ</p>
                  <p className="text-3xl sm:text-4xl font-bold text-foreground">{surveyStatus.completed}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2">全{surveyStatus.total}回中</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">参加率</p>
                  <p className="text-3xl sm:text-4xl font-bold text-foreground">
                    {Math.round((surveyStatus.completed / surveyStatus.total) * 100)}%
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">最終参加日</p>
                  <p className="text-lg sm:text-xl font-medium text-foreground">{surveyStatus.lastCompleted}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Survey Structure */}
          <Card>
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl">サーベイ構成</CardTitle>
              <CardDescription className="text-xs sm:text-sm">8つのカテゴリで構成されています</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {categoryStats.map((category) => (
                  <div
                    key={category.name}
                    className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="font-medium text-sm sm:text-base text-foreground">{category.name}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">{category.total}問</p>
                      </div>
                      <CheckCircle2 className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Information */}
          <Card className="bg-muted/30">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                ご注意
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="text-muted-foreground">• このサーベイは組織の改善を目的としています</p>
              <p className="text-muted-foreground">• あなたの回答は匿名で処理されます</p>
              <p className="text-muted-foreground">• 一度送信した回答は変更できません</p>
              <p className="text-muted-foreground">• ご不明な点は管理者にお問い合わせください</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
