import { type NextRequest, NextResponse } from "next/server"

// Mock user storage
const mockUsers: Record<string, any> = {
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
    const { email, newPassword } = await request.json()

    // Verify admin authorization
    const adminEmail = request.headers.get("x-admin-email")
    if (!adminEmail || !mockUsers[adminEmail] || mockUsers[adminEmail].role !== "admin") {
      return NextResponse.json({ error: "管理者権限が必要です" }, { status: 403 })
    }

    if (!email || !newPassword) {
      return NextResponse.json({ error: "メールアドレスと新しいパスワードが必要です" }, { status: 400 })
    }

    if (!mockUsers[email]) {
      return NextResponse.json({ error: "ユーザーが見つかりません" }, { status: 404 })
    }

    return NextResponse.json({
      message: "パスワードを更新しました",
      email,
    })
  } catch (error) {
    console.error("[v0] Update password error:", error)
    return NextResponse.json({ error: "パスワード更新に失敗しました" }, { status: 500 })
  }
}
