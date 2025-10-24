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
  dateOfBirth?: string
  position?: string
  yearsOfService?: number
  address?: string
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "employee",
    department: "",
    dateOfBirth: "",
    position: "",
    yearsOfService: "",
    address: "",
    password: "",
  })
  const [passwordUpdate, setPasswordUpdate] = useState({ email: "", newPassword: "" })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users/list")
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
        body: JSON.stringify({
          ...newUser,
          yearsOfService: newUser.yearsOfService ? Number.parseInt(newUser.yearsOfService) : null,
        }),
      })

      if (response.ok) {
        setNewUser({
          name: "",
          email: "",
          role: "employee",
          department: "",
          dateOfBirth: "",
          position: "",
          yearsOfService: "",
          address: "",
          password: "",
        })
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

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingUser) return
    setIsLoading(true)

    try {
      const response = await fetch("/api/users/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-email": localStorage.getItem("userEmail") || "",
        },
        body: JSON.stringify(editingUser),
      })

      if (response.ok) {
        setEditingUser(null)
        fetchUsers()
        alert("ユーザー情報を更新しました")
      } else {
        const error = await response.json()
        alert(error.error || "ユーザー更新に失敗しました")
      }
    } catch (error) {
      console.error("[v0] Update user error:", error)
      alert("ユーザー更新に失敗しました")
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
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                  ユーザーアカウントの作成、編集、管理
                </p>
              </div>
            </div>

            <Tabs defaultValue="users" className="space-y-4 sm:space-y-6">
              <TabsList className="grid w-full grid-cols-3 text-xs sm:text-sm">
                <TabsTrigger value="users">ユーザー一覧</TabsTrigger>
                <TabsTrigger value="create">新規作成</TabsTrigger>
                <TabsTrigger value="password">パスワード変更</TabsTrigger>
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
                    <div className="space-y-4">
                      {users.map((user) => (
                        <div key={user.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-foreground">{user.name}</p>
                              <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-xs">
                                <p className="text-muted-foreground">部門: {user.department}</p>
                                <p className="text-muted-foreground">職位: {user.position || "-"}</p>
                              </div>
                              <span
                                className={`px-2 py-1 rounded text-xs font-medium ${
                                  user.role === "admin" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {user.role === "admin" ? "管理者" : "従業員"}
                              </span>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingUser(user)}
                            className="mt-3 text-xs"
                          >
                            編集
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {editingUser && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base sm:text-lg">ユーザー情報編集</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleUpdateUser} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="edit-name" className="text-xs sm:text-sm">
                              名前
                            </Label>
                            <Input
                              id="edit-name"
                              value={editingUser.name}
                              onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                              className="text-xs sm:text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-email" className="text-xs sm:text-sm">
                              メールアドレス
                            </Label>
                            <Input
                              id="edit-email"
                              type="email"
                              value={editingUser.email}
                              disabled
                              className="text-xs sm:text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-dob" className="text-xs sm:text-sm">
                              生年月日
                            </Label>
                            <Input
                              id="edit-dob"
                              type="date"
                              value={editingUser.dateOfBirth || ""}
                              onChange={(e) => setEditingUser({ ...editingUser, dateOfBirth: e.target.value })}
                              className="text-xs sm:text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-department" className="text-xs sm:text-sm">
                              部門
                            </Label>
                            <Input
                              id="edit-department"
                              value={editingUser.department}
                              onChange={(e) => setEditingUser({ ...editingUser, department: e.target.value })}
                              className="text-xs sm:text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-position" className="text-xs sm:text-sm">
                              職位
                            </Label>
                            <Input
                              id="edit-position"
                              value={editingUser.position || ""}
                              onChange={(e) => setEditingUser({ ...editingUser, position: e.target.value })}
                              className="text-xs sm:text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-years" className="text-xs sm:text-sm">
                              勤続年数
                            </Label>
                            <Input
                              id="edit-years"
                              type="number"
                              value={editingUser.yearsOfService || ""}
                              onChange={(e) =>
                                setEditingUser({ ...editingUser, yearsOfService: Number.parseInt(e.target.value) || 0 })
                              }
                              className="text-xs sm:text-sm"
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="edit-address" className="text-xs sm:text-sm">
                              住所
                            </Label>
                            <Input
                              id="edit-address"
                              value={editingUser.address || ""}
                              onChange={(e) => setEditingUser({ ...editingUser, address: e.target.value })}
                              className="text-xs sm:text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-role" className="text-xs sm:text-sm">
                              役職
                            </Label>
                            <select
                              id="edit-role"
                              value={editingUser.role}
                              onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                              className="w-full px-3 py-2 border rounded-md text-xs sm:text-sm"
                            >
                              <option value="employee">従業員</option>
                              <option value="admin">管理者</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button type="submit" disabled={isLoading} className="text-xs sm:text-sm">
                            {isLoading ? "更新中..." : "更新"}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setEditingUser(null)}
                            className="text-xs sm:text-sm"
                          >
                            キャンセル
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="create" className="space-y-4 sm:space-y-6">
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-xs sm:text-sm">
                            名前 *
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
                            メールアドレス *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                            placeholder="user@sunhawk.com"
                            required
                            className="text-xs sm:text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password" className="text-xs sm:text-sm">
                            パスワード *
                          </Label>
                          <Input
                            id="password"
                            type="password"
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                            placeholder="パスワード"
                            required
                            className="text-xs sm:text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dob" className="text-xs sm:text-sm">
                            生年月日
                          </Label>
                          <Input
                            id="dob"
                            type="date"
                            value={newUser.dateOfBirth}
                            onChange={(e) => setNewUser({ ...newUser, dateOfBirth: e.target.value })}
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
                        <div className="space-y-2">
                          <Label htmlFor="position" className="text-xs sm:text-sm">
                            職位
                          </Label>
                          <Input
                            id="position"
                            value={newUser.position}
                            onChange={(e) => setNewUser({ ...newUser, position: e.target.value })}
                            placeholder="課長"
                            className="text-xs sm:text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="years" className="text-xs sm:text-sm">
                            勤続年数
                          </Label>
                          <Input
                            id="years"
                            type="number"
                            value={newUser.yearsOfService}
                            onChange={(e) => setNewUser({ ...newUser, yearsOfService: e.target.value })}
                            placeholder="5"
                            className="text-xs sm:text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role" className="text-xs sm:text-sm">
                            役職
                          </Label>
                          <select
                            id="role"
                            value={newUser.role}
                            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                            className="w-full px-3 py-2 border rounded-md text-xs sm:text-sm"
                          >
                            <option value="employee">従業員</option>
                            <option value="admin">管理者</option>
                          </select>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="address" className="text-xs sm:text-sm">
                            住所
                          </Label>
                          <Input
                            id="address"
                            value={newUser.address}
                            onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                            placeholder="東京都渋谷区..."
                            className="text-xs sm:text-sm"
                          />
                        </div>
                      </div>
                      <Button type="submit" disabled={isLoading} className="w-full text-xs sm:text-sm">
                        {isLoading ? "作成中..." : "ユーザーを作成"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="password" className="space-y-4 sm:space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                      <Lock className="h-5 w-5" />
                      パスワード変更
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">ユーザーのパスワードを変更</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-md">
                      <div className="space-y-2">
                        <Label htmlFor="update-email" className="text-xs sm:text-sm">
                          メールアドレス
                        </Label>
                        <Input
                          id="update-email"
                          type="email"
                          value={passwordUpdate.email}
                          onChange={(e) => setPasswordUpdate({ ...passwordUpdate, email: e.target.value })}
                          placeholder="user@sunhawk.com"
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
                      <Button type="submit" disabled={isLoading} className="text-xs sm:text-sm">
                        {isLoading ? "更新中..." : "パスワードを更新"}
                      </Button>
                    </form>
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
