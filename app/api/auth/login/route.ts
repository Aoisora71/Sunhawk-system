import { type NextRequest, NextResponse } from "next/server"

// Mock authentication - in production, use actual database
const mockUsers = {
  "admin@sunhawk.com": {
    id: "1",
    name: "管理者",
    email: "admin@sunhawk.com",
    role: "admin",
    department: "経営",
    password: "admin1234!@#$",
  },
  "employee@sunhawk.com": {
    id: "2",
    name: "従業員",
    email: "employee@sunhawk.com",
    role: "employee",
    department: "輸送第一課",
    password: "employee1234!@#$",
  },
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "メールアドレスとパスワードが必要です" }, { status: 400 })
    }

    const user = mockUsers[email as keyof typeof mockUsers]

    if (!user || user.password !== password) {
      return NextResponse.json({ error: "メールアドレスまたはパスワードが正しくありません" }, { status: 401 })
    }

    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      user: userWithoutPassword,
      message: "ログインに成功しました",
    })
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ error: "ログイン処理に失敗しました" }, { status: 500 })
  }
}
