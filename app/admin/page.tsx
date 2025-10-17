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
      <div className="flex">
        <DashboardNav />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Page Header */}
            <div>
              <h1 className="text-3xl font-medium text-foreground mb-2">管理画面</h1>
              <p className="text-muted-foreground">システムの設定とユーザー管理</p>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>登録ユーザー数</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <span className="text-2xl font-medium text-foreground">78名</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>実施中のサーベイ</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <span className="text-2xl font-medium text-foreground">1件</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>現在の回答率</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-medium text-foreground">94%</div>
                  <Badge className="mt-2 bg-[oklch(0.55_0.15_160)] text-white">良好</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>未回答者</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span className="text-2xl font-medium text-foreground">5名</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="surveys" className="space-y-6">
              <TabsList>
                <TabsTrigger value="surveys">サーベイ管理</TabsTrigger>
                <TabsTrigger value="users">ユーザー管理</TabsTrigger>
                <TabsTrigger value="responses">回答状況</TabsTrigger>
                <TabsTrigger value="export">データ出力</TabsTrigger>
              </TabsList>

              {/* Survey Management */}
              <TabsContent value="surveys" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>サーベイ期間管理</CardTitle>
                        <CardDescription>サーベイの実施期間を設定・管理します</CardDescription>
                      </div>
                      <Dialog open={isAddSurveyOpen} onOpenChange={setIsAddSurveyOpen}>
                        <DialogTrigger asChild>
                          <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            新規サーベイ
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>新規サーベイの作成</DialogTitle>
                            <DialogDescription>サーベイの実施期間を設定してください</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="survey-name">サーベイ名</Label>
                              <Input id="survey-name" placeholder="例: 2025年4月" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
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
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsAddSurveyOpen(false)}>
                              キャンセル
                            </Button>
                            <Button onClick={() => setIsAddSurveyOpen(false)}>作成</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>期間名</TableHead>
                          <TableHead>開始日</TableHead>
                          <TableHead>終了日</TableHead>
                          <TableHead>ステータス</TableHead>
                          <TableHead>回答率</TableHead>
                          <TableHead className="text-right">操作</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {surveyPeriods.map((period) => (
                          <TableRow key={period.id}>
                            <TableCell className="font-medium">{period.name}</TableCell>
                            <TableCell>{period.startDate}</TableCell>
                            <TableCell>{period.endDate}</TableCell>
                            <TableCell>
                              {period.status === "active" ? (
                                <Badge className="bg-[oklch(0.55_0.15_160)] text-white">実施中</Badge>
                              ) : (
                                <Badge variant="secondary">完了</Badge>
                              )}
                            </TableCell>
                            <TableCell>{period.responseRate}%</TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
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
              <TabsContent value="users" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>ユーザー管理</CardTitle>
                        <CardDescription>システムユーザーの追加・編集・削除</CardDescription>
                      </div>
                      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                        <DialogTrigger asChild>
                          <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            ユーザー追加
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
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
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                              キャンセル
                            </Button>
                            <Button onClick={() => setIsAddUserOpen(false)}>追加</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>氏名</TableHead>
                          <TableHead>メールアドレス</TableHead>
                          <TableHead>部門</TableHead>
                          <TableHead>権限</TableHead>
                          <TableHead>ステータス</TableHead>
                          <TableHead className="text-right">操作</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.department}</TableCell>
                            <TableCell>
                              <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                                {user.role === "admin" ? "管理者" : user.role === "manager" ? "マネージャー" : "一般"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-[oklch(0.55_0.15_160)]">
                                有効
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
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
              <TabsContent value="responses" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>回答状況モニタリング</CardTitle>
                        <CardDescription>現在実施中のサーベイの回答状況</CardDescription>
                      </div>
                      <Button variant="outline">
                        <Mail className="mr-2 h-4 w-4" />
                        未回答者に通知
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>氏名</TableHead>
                          <TableHead>部門</TableHead>
                          <TableHead>ステータス</TableHead>
                          <TableHead>回答日時</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {responseStatus.map((response, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{response.name}</TableCell>
                            <TableCell>{response.department}</TableCell>
                            <TableCell>
                              {response.status === "completed" ? (
                                <div className="flex items-center gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[oklch(0.55_0.15_160)]" />
                                  <span className="text-[oklch(0.55_0.15_160)]">回答済み</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <XCircle className="h-4 w-4 text-[oklch(0.75_0.15_65)]" />
                                  <span className="text-[oklch(0.75_0.15_65)]">未回答</span>
                                </div>
                              )}
                            </TableCell>
                            <TableCell>{response.completedAt || "-"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Data Export */}
              <TabsContent value="export" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>データ出力</CardTitle>
                    <CardDescription>集計結果をCSVまたはPDF形式でダウンロード</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">CSV形式</CardTitle>
                          <CardDescription>Excelで編集可能な形式</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <Button className="w-full bg-transparent" variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            全体集計結果
                          </Button>
                          <Button className="w-full bg-transparent" variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            部門別集計結果
                          </Button>
                          <Button className="w-full bg-transparent" variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            個人別スコア
                          </Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">PDF形式</CardTitle>
                          <CardDescription>印刷・配布用レポート</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <Button className="w-full bg-transparent" variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            総合レポート
                          </Button>
                          <Button className="w-full bg-transparent" variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            部門別レポート
                          </Button>
                          <Button className="w-full bg-transparent" variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            時系列比較レポート
                          </Button>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="bg-muted/30">
                      <CardHeader>
                        <CardTitle className="text-base">カスタム出力</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>期間</Label>
                            <Select>
                              <SelectTrigger>
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
                            <Label>形式</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="形式を選択" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="csv">CSV</SelectItem>
                                <SelectItem value="pdf">PDF</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <Button className="w-full">
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
