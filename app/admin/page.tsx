"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Users, FileText, Download, Plus, Edit, Trash2, Mail, CheckCircle2, XCircle, Clock } from "lucide-react"

// Sample data
const surveyPeriods = [
  {
    id: "2025-01",
    name: "2025年1月",
    status: "active",
    startDate: "2025-01-01",
    endDate: "2025-01-31",
    responseRate: 94,
  },
  {
    id: "2024-10",
    name: "2024年10月",
    status: "completed",
    startDate: "2024-10-01",
    endDate: "2024-10-31",
    responseRate: 91,
  },
  {
    id: "2024-07",
    name: "2024年7月",
    status: "completed",
    startDate: "2024-07-01",
    endDate: "2024-07-31",
    responseRate: 88,
  },
]

const users = [
  { id: "1", name: "佐藤 恭太郎", email: "sato.k@sanhawk.co.jp", role: "admin", department: "経営", status: "active" },
  {
    id: "2",
    name: "池田 直輝",
    email: "ikeda@sanhawk.co.jp",
    role: "manager",
    department: "輸送事業部",
    status: "active",
  },
  {
    id: "3",
    name: "山﨑 清志",
    email: "yamazaki@sanhawk.co.jp",
    role: "user",
    department: "輸送第一課",
    status: "active",
  },
  {
    id: "4",
    name: "北山 尚哉",
    email: "kitayama@sanhawk.co.jp",
    role: "user",
    department: "輸送第二課",
    status: "active",
  },
  { id: "5", name: "佐藤 栞", email: "sato.s@sanhawk.co.jp", role: "user", department: "管理課", status: "active" },
]

const responseStatus = [
  { name: "佐藤 恭太郎", department: "経営", status: "completed", completedAt: "2025-01-05" },
  { name: "池田 直輝", department: "輸送事業部", status: "completed", completedAt: "2025-01-08" },
  { name: "山﨑 清志", department: "輸送第一課", status: "completed", completedAt: "2025-01-12" },
  { name: "北山 尚哉", department: "輸送第二課", status: "pending", completedAt: null },
  { name: "佐藤 栞", department: "管理課", status: "completed", completedAt: "2025-01-10" },
]

export default function AdminPage() {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isAddSurveyOpen, setIsAddSurveyOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex flex-col md:flex-row">
        <DashboardNav />
        <main className="flex-1 p-3 sm:p-4 md:p-8 w-full overflow-x-hidden">
          <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
            {/* Page Header */}
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-medium text-foreground mb-1 sm:mb-2">管理画面</h1>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground">システムの設定とユーザー管理</p>
            </div>

            {/* Quick Stats */}
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
                  <Badge className="mt-2 bg-[oklch(0.55_0.15_160)] text-white text-xs">良好</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2 sm:pb-3">
                  <CardDescription className="text-xs sm:text-sm">未回答者</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-lg sm:text-xl md:text-2xl font-medium text-foreground">5名</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="surveys" className="space-y-4 sm:space-y-6">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 text-xs sm:text-sm">
                <TabsTrigger value="surveys">サーベイ管理</TabsTrigger>
                <TabsTrigger value="users">ユーザー管理</TabsTrigger>
                <TabsTrigger value="responses" className="hidden sm:block">
                  回答状況
                </TabsTrigger>
                <TabsTrigger value="export" className="hidden sm:block">
                  データ出力
                </TabsTrigger>
              </TabsList>

              {/* Survey Management */}
              <TabsContent value="surveys" className="space-y-4 sm:space-y-6">
                <Card>
                  <CardHeader className="pb-3 sm:pb-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <CardTitle className="text-base sm:text-lg">サーベイ期間管理</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                          サーベイの実施期間を設定・管理します
                        </CardDescription>
                      </div>
                      <Dialog open={isAddSurveyOpen} onOpenChange={setIsAddSurveyOpen}>
                        <DialogTrigger asChild>
                          <Button className="w-full sm:w-auto text-xs sm:text-sm">
                            <Plus className="mr-2 h-4 w-4" />
                            新規サーベイ
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="w-[95vw] sm:w-full">
                          <DialogHeader>
                            <DialogTitle>新規サーベイの作成</DialogTitle>
                            <DialogDescription>サーベイの実施期間を設定してください</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="survey-name">サーベイ名</Label>
                              <Input id="survey-name" placeholder="例: 2025年4月" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="start-date">開始日</Label>
                                <Input id="start-date" type="date" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="end-date">終了日</Label>
                                <Input id="end-date" type="date" />
                              </div>
                            </div>
                          </div>
                          <DialogFooter className="flex gap-2">
                            <Button
                              variant="outline"
                              onClick={() => setIsAddSurveyOpen(false)}
                              className="flex-1 sm:flex-none"
                            >
                              キャンセル
                            </Button>
                            <Button onClick={() => setIsAddSurveyOpen(false)} className="flex-1 sm:flex-none">
                              作成
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent className="overflow-x-auto">
                    <Table className="text-xs sm:text-sm">
                      <TableHeader>
                        <TableRow>
                          <TableHead>期間名</TableHead>
                          <TableHead className="hidden sm:table-cell">開始日</TableHead>
                          <TableHead className="hidden sm:table-cell">終了日</TableHead>
                          <TableHead>ステータス</TableHead>
                          <TableHead className="hidden md:table-cell">回答率</TableHead>
                          <TableHead className="text-right">操作</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {surveyPeriods.map((period) => (
                          <TableRow key={period.id}>
                            <TableCell className="font-medium">{period.name}</TableCell>
                            <TableCell className="hidden sm:table-cell">{period.startDate}</TableCell>
                            <TableCell className="hidden sm:table-cell">{period.endDate}</TableCell>
                            <TableCell>
                              {period.status === "active" ? (
                                <Badge className="bg-[oklch(0.55_0.15_160)] text-white text-xs">実施中</Badge>
                              ) : (
                                <Badge variant="secondary" className="text-xs">
                                  完了
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{period.responseRate}%</TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-1">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* User Management */}
              <TabsContent value="users" className="space-y-4 sm:space-y-6">
                <Card>
                  <CardHeader className="pb-3 sm:pb-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <CardTitle className="text-base sm:text-lg">ユーザー管理</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                          システムユーザーの追加・編集・削除
                        </CardDescription>
                      </div>
                      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                        <DialogTrigger asChild>
                          <Button className="w-full sm:w-auto text-xs sm:text-sm">
                            <Plus className="mr-2 h-4 w-4" />
                            ユーザー追加
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="w-[95vw] sm:w-full">
                          <DialogHeader>
                            <DialogTitle>新規ユーザーの追加</DialogTitle>
                            <DialogDescription>ユーザー情報を入力してください</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="user-name">氏名</Label>
                              <Input id="user-name" placeholder="山田 太郎" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="user-email">メールアドレス</Label>
                              <Input id="user-email" type="email" placeholder="yamada@sanhawk.co.jp" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="user-department">部門</Label>
                              <Select>
                                <SelectTrigger id="user-department">
                                  <SelectValue placeholder="部門を選択" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="transport">輸送事業部</SelectItem>
                                  <SelectItem value="farm">実FARM事業</SelectItem>
                                  <SelectItem value="twoeight">TWO EIGHT事業</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="user-role">権限</Label>
                              <Select>
                                <SelectTrigger id="user-role">
                                  <SelectValue placeholder="権限を選択" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="admin">管理者</SelectItem>
                                  <SelectItem value="manager">マネージャー</SelectItem>
                                  <SelectItem value="user">一般ユーザー</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <DialogFooter className="flex gap-2">
                            <Button
                              variant="outline"
                              onClick={() => setIsAddUserOpen(false)}
                              className="flex-1 sm:flex-none"
                            >
                              キャンセル
                            </Button>
                            <Button onClick={() => setIsAddUserOpen(false)} className="flex-1 sm:flex-none">
                              追加
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent className="overflow-x-auto">
                    <Table className="text-xs sm:text-sm">
                      <TableHeader>
                        <TableRow>
                          <TableHead>氏名</TableHead>
                          <TableHead className="hidden md:table-cell">メールアドレス</TableHead>
                          <TableHead className="hidden sm:table-cell">部門</TableHead>
                          <TableHead>権限</TableHead>
                          <TableHead className="hidden sm:table-cell">ステータス</TableHead>
                          <TableHead className="text-right">操作</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                            <TableCell className="hidden sm:table-cell">{user.department}</TableCell>
                            <TableCell>
                              <Badge variant={user.role === "admin" ? "default" : "secondary"} className="text-xs">
                                {user.role === "admin" ? "管理者" : user.role === "manager" ? "マネージャー" : "一般"}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge variant="outline" className="text-[oklch(0.55_0.15_160)] text-xs">
                                有効
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-1">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Response Status */}
              <TabsContent value="responses" className="space-y-4 sm:space-y-6">
                <Card>
                  <CardHeader className="pb-3 sm:pb-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <CardTitle className="text-base sm:text-lg">回答状況モニタリング</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">現在実施中のサーベイの回答状況</CardDescription>
                      </div>
                      <Button variant="outline" className="w-full sm:w-auto text-xs sm:text-sm bg-transparent">
                        <Mail className="mr-2 h-4 w-4" />
                        未回答者に通知
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="overflow-x-auto">
                    <Table className="text-xs sm:text-sm">
                      <TableHeader>
                        <TableRow>
                          <TableHead>氏名</TableHead>
                          <TableHead className="hidden sm:table-cell">部門</TableHead>
                          <TableHead>ステータス</TableHead>
                          <TableHead className="hidden md:table-cell">回答日時</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {responseStatus.map((response, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{response.name}</TableCell>
                            <TableCell className="hidden sm:table-cell">{response.department}</TableCell>
                            <TableCell>
                              {response.status === "completed" ? (
                                <div className="flex items-center gap-1">
                                  <CheckCircle2 className="h-4 w-4 text-[oklch(0.55_0.15_160)]" />
                                  <span className="text-[oklch(0.55_0.15_160)] text-xs sm:text-sm">回答済み</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1">
                                  <XCircle className="h-4 w-4 text-[oklch(0.75_0.15_65)]" />
                                  <span className="text-[oklch(0.75_0.15_65)] text-xs sm:text-sm">未回答</span>
                                </div>
                              )}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{response.completedAt || "-"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Data Export */}
              <TabsContent value="export" className="space-y-4 sm:space-y-6">
                <Card>
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="text-base sm:text-lg">データ出力</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      集計結果をCSVまたはPDF形式でダウンロード
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <Card>
                        <CardHeader className="pb-2 sm:pb-3">
                          <CardTitle className="text-sm sm:text-base">CSV形式</CardTitle>
                          <CardDescription className="text-xs sm:text-sm">Excelで編集可能な形式</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 sm:space-y-3">
                          <Button className="w-full bg-transparent text-xs sm:text-sm" variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            全体集計結果
                          </Button>
                          <Button className="w-full bg-transparent text-xs sm:text-sm" variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            部門別集計結果
                          </Button>
                          <Button className="w-full bg-transparent text-xs sm:text-sm" variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            個人別スコア
                          </Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2 sm:pb-3">
                          <CardTitle className="text-sm sm:text-base">PDF形式</CardTitle>
                          <CardDescription className="text-xs sm:text-sm">印刷・配布用レポート</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 sm:space-y-3">
                          <Button className="w-full bg-transparent text-xs sm:text-sm" variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            総合レポート
                          </Button>
                          <Button className="w-full bg-transparent text-xs sm:text-sm" variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            部門別レポート
                          </Button>
                          <Button className="w-full bg-transparent text-xs sm:text-sm" variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            時系列比較レポート
                          </Button>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="bg-muted/30">
                      <CardHeader className="pb-2 sm:pb-3">
                        <CardTitle className="text-sm sm:text-base">カスタム出力</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 sm:space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div className="space-y-2">
                            <Label className="text-xs sm:text-sm">期間</Label>
                            <Select>
                              <SelectTrigger className="text-xs sm:text-sm">
                                <SelectValue placeholder="期間を選択" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="2025-01">2025年1月</SelectItem>
                                <SelectItem value="2024-10">2024年10月</SelectItem>
                                <SelectItem value="2024-07">2024年7月</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs sm:text-sm">形式</Label>
                            <Select>
                              <SelectTrigger className="text-xs sm:text-sm">
                                <SelectValue placeholder="形式を選択" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="csv">CSV</SelectItem>
                                <SelectItem value="pdf">PDF</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <Button className="w-full text-xs sm:text-sm">
                          <Download className="mr-2 h-4 w-4" />
                          カスタム出力を実行
                        </Button>
                      </CardContent>
                    </Card>
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
