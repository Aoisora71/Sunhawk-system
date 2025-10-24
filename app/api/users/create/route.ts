import { type NextRequest, NextResponse } from "next/server"

// Mock user storage - in production, use actual database
const users: Record<string, any> = {
  "admin@sanhawk.co.jp": {
    id: "1",
    name: "佐藤 恭太郎",
    email: "admin@sanhawk.co.jp",
    role: "admin",
    department: "経営",
  },
  "employee@sanhawk.co.jp": {
    id: "2",
    name: "山﨑 清志",
    email: "employee@sanhawk.co.jp",
    role: "employee",
    department: "輸送第一課",
  },
}

export async function POST(request: NextRequest) {
  try {
    const { email, name, role, department, password } = await request.json()

    // Verify admin authorization
    const adminEmail = request.headers.get("x-admin-email")
    if (!adminEmail || !users[adminEmail] || users[adminEmail].role !== "admin") {
      return NextResponse.json({ error: "管理者権限が必要です" }, { status: 403 })
    }

    if (!email || !name || !password) {
      return NextResponse.json({ error: "必須項目が不足しています" }, { status: 400 })
    }

    if (users[email]) {
      return NextResponse.json({ error: "このメールアドレスは既に登録されています" }, { status: 409 })
    }

    const newUser = {
      id: String(Object.keys(users).length + 1),
      email,
      name,
      role: role || "employee",
      department: department || "",
    }

    users[email] = newUser

    return NextResponse.json({
      user: newUser,
      message: "ユーザーを作成しました",
    })
  } catch (error) {
    console.error("[v0] Create user error:", error)
    return NextResponse.json({ error: "ユーザー作成に失敗しました" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const userList = Object.values(users)
    return NextResponse.json({ users: userList })
  } catch (error) {
    console.error("[v0] Get users error:", error)
    return NextResponse.json({ error: "ユーザー取得に失敗しました" }, { status: 500 })
  }
}
