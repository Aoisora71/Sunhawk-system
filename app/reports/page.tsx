import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, TrendingUp, Users, Target } from "lucide-react"

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardNav />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Page Header */}
            <div>
              <h1 className="text-3xl font-medium text-foreground mb-2">分析レポート</h1>
              <p className="text-muted-foreground">詳細な分析結果とインサイト</p>
            </div>

            {/* Report Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                    <Button variant="ghost" size="sm">
                      表示
                    </Button>
                  </div>
                  <CardTitle>トレンド分析</CardTitle>
                  <CardDescription>過去6ヶ月間のスコア推移と傾向分析</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    組織全体のスコアは継続的に改善傾向にあります。特にチームワークとコミュニケーションの分野で顕著な向上が見られます。
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <Button variant="ghost" size="sm">
                      表示
                    </Button>
                  </div>
                  <CardTitle>部門別比較</CardTitle>
                  <CardDescription>各部門のパフォーマンス比較分析</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    管理課が最高スコアを記録。輸送第三課も高いパフォーマンスを維持しています。輸送第二課は改善の余地があります。
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <Button variant="ghost" size="sm">
                      表示
                    </Button>
                  </div>
                  <CardTitle>改善提案</CardTitle>
                  <CardDescription>データに基づく具体的な改善施策</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    イノベーション分野のスコア向上のため、定期的な改善提案会議の実施と、新技術導入の検討を推奨します。
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <Button variant="ghost" size="sm">
                      表示
                    </Button>
                  </div>
                  <CardTitle>詳細レポート</CardTitle>
                  <CardDescription>全カテゴリの詳細分析レポート</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    78問すべての質問項目について、詳細な分析結果と統計データを確認できます。
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
