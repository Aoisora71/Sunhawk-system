"use client"

import { Button } from "@/components/ui/button"
import { Bell, LogOut, User } from "lucide-react"
import Link from "next/link"
import { MobileNav } from "@/components/mobile-nav"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DashboardHeader() {
  return (
    <header className="border-b border-border bg-card sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 md:px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary rounded" />
          <span className="text-lg font-medium text-foreground hidden sm:inline">サンホーク</span>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">佐藤 恭太郎</p>
                  <p className="text-xs text-muted-foreground">代表取締役社長</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>プロフィール設定</DropdownMenuItem>
              <DropdownMenuItem>パスワード変更</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/" className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  ログアウト
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <MobileNav />
        </div>
      </div>
    </header>
  )
}
