"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Plus, Lock } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: string
  department: string
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "employee", department: "" })
  const [passwordUpdate, setPasswordUpdate] = useState({ email: "", newPassword: "" })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users/create")
      const data = await response.json()
      setUsers(data.users || [])
    } catch (error) {
      console.error("[v0] Fetch users error:", error)
    }
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-email": localStorage.getItem("userEmail") || "",
        },
        body: JSON.stringify(newUser),
      })

      if (response.ok) {
        setNewUser({ name: "", email: "", role: "employee", department: "" })
        fetchUsers()
        alert("ユーザーを作成しました")
      } else {
        const error = await response.json()
        alert(error.error || "ユーザー作成に失敗しました")
      }
    } catch (error) {
      console.error("[v0] Create user error:", error)
      alert("ユーザー作成に失敗しました")
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/users/update-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-email": localStorage.getItem("userEmail") || "",
        },
        body: JSON.stringify(passwordUpdate),
      })

      if (response.ok) {
        setPasswordUpdate({ email: "", newPassword: "" })
        alert("パスワードを更新しました")
      } else {
        const error = await response.json()
        alert(error.error || "パスワード更新に失敗しました")
      }
    } catch (error) {
      console.error("[v0] Update password error:", error)
      alert("パスワード更新に失敗しました")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex flex-col md:flex-row">
        <DashboardNav />
        <main className="flex-1 p-3 sm:p-4 md:p-8 w-full overflow-x-hidden">
          <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
            <div className="flex flex-col gap-3 sm:gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-medium text-foreground mb-1 sm:mb-2">
                  ユーザー管理
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground">ユーザーアカウントの作成と管理</p>
              </div>
            </div>

            <Tabs defaultValue="users" className="space-y-4 sm:space-y-6">
              <TabsList className="grid w-full grid-cols-2 text-xs sm:text-sm">
                <TabsTrigger value="users">ユーザー一覧</TabsTrigger>
                <TabsTrigger value="create">新規作成</TabsTrigger>
              </TabsList>

              <TabsContent value="users" className="space-y-4 sm:space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      登録ユーザー
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">全{users.length}名</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs sm:text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 px-2">名前</th>
                            <th className="text-left py-2 px-2">メールアドレス</th>
                            <th className="text-left py-2 px-2">役職</th>
                            <th className="text-left py-2 px-2">部門</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user) => (
                            <tr key={user.id} className="border-b hover:bg-muted/50">
                              <td className="py-2 px-2">{user.name}</td>
                              <td className="py-2 px-2">{user.email}</td>
                              <td className="py-2 px-2">
                                <span
                                  className={`px-2 py-1 rounded text-xs font-medium ${
                                    user.role === "admin" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {user.role === "admin" ? "管理者" : "従業員"}
                                </span>
                              </td>
                              <td className="py-2 px-2">{user.department}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="create" className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                        <Plus className="h-5 w-5" />
                        新規ユーザー作成
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm">新しいユーザーアカウントを作成</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleCreateUser} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-xs sm:text-sm">
                            名前
                          </Label>
                          <Input
                            id="name"
                            value={newUser.name}
                            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                            placeholder="山田 太郎"
                            required
                            className="text-xs sm:text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-xs sm:text-sm">
                            メールアドレス
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                            placeholder="user@sanhawk.co.jp"
                            required
                            className="text-xs sm:text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="department" className="text-xs sm:text-sm">
                            部門
                          </Label>
                          <Input
                            id="department"
                            value={newUser.department}
                            onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                            placeholder="営業部"
                            className="text-xs sm:text-sm"
                          />
                        </div>
                        <Button type="submit" disabled={isLoading} className="w-full text-xs sm:text-sm">
                          {isLoading ? "作成中..." : "ユーザーを作成"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                        <Lock className="h-5 w-5" />
                        パスワード変更
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm">ユーザーのパスワードを変更</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleUpdatePassword} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="update-email" className="text-xs sm:text-sm">
                            メールアドレス
                          </Label>
                          <Input
                            id="update-email"
                            type="email"
                            value={passwordUpdate.email}
                            onChange={(e) => setPasswordUpdate({ ...passwordUpdate, email: e.target.value })}
                            placeholder="user@sanhawk.co.jp"
                            required
                            className="text-xs sm:text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password" className="text-xs sm:text-sm">
                            新しいパスワード
                          </Label>
                          <Input
                            id="new-password"
                            type="password"
                            value={passwordUpdate.newPassword}
                            onChange={(e) => setPasswordUpdate({ ...passwordUpdate, newPassword: e.target.value })}
                            placeholder="新しいパスワード"
                            required
                            className="text-xs sm:text-sm"
                          />
                        </div>
                        <Button type="submit" disabled={isLoading} className="w-full text-xs sm:text-sm">
                          {isLoading ? "更新中..." : "パスワードを更新"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
