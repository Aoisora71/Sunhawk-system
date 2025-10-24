import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const userRole = request.cookies.get("userRole")?.value

    if (userRole !== "admin") {
      return NextResponse.json({ error: "管理者のみがユーザー一覧を表示できます" }, { status: 403 })
    }

    const mockUsers = [
      {
        id: 1,
        email: "admin@sanhawk.co.jp",
        name: "佐藤 恭太郎",
        role: "admin",
        department: "経営",
        createdAt: "2025-01-01",
      },
      {
        id: 2,
        email: "employee@sanhawk.co.jp",
        name: "山﨑 清志",
        role: "employee",
        department: "輸送第一課",
        createdAt: "2025-01-05",
      },
    ]

    return NextResponse.json({
      success: true,
      users: mockUsers,
    })
  } catch (error) {
    console.error("[v0] List users error:", error)
    return NextResponse.json({ error: "ユーザー一覧の取得に失敗しました" }, { status: 500 })
  }
}
