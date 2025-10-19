"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, FileText, Users, Settings, BarChart3, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getCurrentUserRole } from "@/lib/auth-utils"

const adminNavItems = [
  {
    title: "ダッシュボード",
    href: "/admin-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "サーベイ回答",
    href: "/survey",
    icon: FileText,
  },
  {
    title: "組織図",
    href: "/organization",
    icon: Users,
  },
  {
    title: "分析レポート",
    href: "/reports",
    icon: BarChart3,
  },
  {
    title: "管理画面",
    href: "/admin",
    icon: Settings,
  },
]

const employeeNavItems = [
  {
    title: "ダッシュボード",
    href: "/employee-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "サーベイ回答",
    href: "/survey",
    icon: FileText,
  },
  {
    title: "マイスコア",
    href: "/employee-score",
    icon: BarChart3,
  },
]

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const role = getCurrentUserRole()
    setUserRole(role)
  }, [])

  const navItems = userRole === "admin" ? adminNavItems : employeeNavItems

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="メニューを開く"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsOpen(false)} />

          {/* Mobile Menu */}
          <nav className="fixed top-[73px] left-0 right-0 bg-card border-b border-border z-50 md:hidden max-h-[calc(100vh-73px)] overflow-y-auto">
            <div className="p-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.title}
                  </Link>
                )
              })}
            </div>
          </nav>
        </>
      )}
    </>
  )
}
