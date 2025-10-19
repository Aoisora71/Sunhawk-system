"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, FileText, BarChart3, Settings } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminDashboardPage() {
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
                  管理者ダッシュボード
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground">システム全体の管理と監視</p>
              </div>
            </div>

            {/* Admin Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              <Card>
                <CardHeader className="pb-2 sm:pb-3">
                  <CardDescription className="text-xs sm:text-sm">登録ユーザー数</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-lg sm:text-xl md:text-2xl font-medium text-foreground">78名</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2 sm:pb-3">
                  <CardDescription className="text-xs sm:text-sm">実施中のサーベイ</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-lg sm:text-xl md:text-2xl font-medium text-foreground">1件</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2 sm:pb-3">
                  <CardDescription className="text-xs sm:text-sm">現在の回答率</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-xl md:text-2xl font-medium text-foreground">94%</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2 sm:pb-3">
                  <CardDescription className="text-xs sm:text-sm">システム設定</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" className="w-full text-xs sm:text-sm bg-transparent">
                    <Settings className="mr-2 h-4 w-4" />
                    設定へ
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Admin Tabs */}
            <Tabs defaultValue="overview" className="space-y-4 sm:space-y-6">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 text-xs sm:text-sm">
                <TabsTrigger value="overview">概要</TabsTrigger>
                <TabsTrigger value="management">管理</TabsTrigger>
                <TabsTrigger value="analytics" className="hidden sm:block">
                  分析
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 sm:space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg">システム概要</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">全体的なシステムの状態と統計情報</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 border border-border rounded-lg">
                        <h3 className="font-medium text-sm mb-2">最新のサーベイ</h3>
                        <p className="text-xs text-muted-foreground">2025年1月実施</p>
                        <p className="text-lg font-medium mt-2">総合スコア: 78点</p>
                      </div>
                      <div className="p-4 border border-border rounded-lg">
                        <h3 className="font-medium text-sm mb-2">回答状況</h3>
                        <p className="text-xs text-muted-foreground">73名 / 78名</p>
                        <p className="text-lg font-medium mt-2">回答率: 94%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="management" className="space-y-4 sm:space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg">ユーザー・サーベイ管理</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">ユーザーとサーベイの管理機能</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start text-xs sm:text-sm">
                      <Users className="mr-2 h-4 w-4" />
                      ユーザー管理へ
                    </Button>
                    <Button className="w-full justify-start text-xs sm:text-sm bg-transparent" variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      サーベイ管理へ
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4 sm:space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg">分析レポート</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">詳細な分析とレポート生成</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start text-xs sm:text-sm bg-transparent" variant="outline">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      レポート生成
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
