import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, Users, FileText, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded" />
            <span className="text-lg font-medium text-foreground">サンホーク</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              ログイン
            </Link>
            <Button asChild>
              <Link href="/login">始める</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-medium text-foreground leading-tight text-balance mb-6">
            組織の状態を可視化し、
            <br />
            継続的な成長を実現
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            職員が回答する組織調査を通じて、組織の健全性をリアルタイムで把握。
            データに基づいた意思決定で、組織の課題を早期に発見し、改善につなげます。
          </p>
          <div className="flex items-center gap-4">
            <Button size="lg" asChild>
              <Link href="/login">
                システムを始める
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">詳しく見る</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-muted/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-medium text-foreground mb-12">主な機能</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">組織サーベイ</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                xxxxxxxxxxxxx
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">データ可視化</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                xxxxxxxxxxxxxx
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">組織図管理</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                xxxxxxxxxxxxxxxxxxxx
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">セキュリティ</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                xxxxxxxxxxxxxxxxxxxxx
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Score System Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-medium text-foreground mb-4">スコア評価システム</h2>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            全78問の回答から0〜100点のスコアを算出。サンホークの理念との整合性を5段階で評価します。
          </p>
          <div className="grid gap-4 max-w-3xl">
            <div className="bg-card p-6 rounded-lg border-l-4 border-l-[oklch(0.55_0.22_25)]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-foreground">0〜45点</span>
                <span className="text-sm text-muted-foreground">要改善</span>
              </div>
              <p className="text-sm text-muted-foreground">サンホークの考え方を参考にする必要があります。</p>
            </div>

            <div className="bg-card p-6 rounded-lg border-l-4 border-l-[oklch(0.75_0.15_65)]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-foreground">46〜54点</span>
                <span className="text-sm text-muted-foreground">注意</span>
              </div>
              <p className="text-sm text-muted-foreground">サンホークの考え方からやや離れています。</p>
            </div>

            <div className="bg-card p-6 rounded-lg border-l-4 border-l-[oklch(0.65_0.12_264)]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-foreground">55〜69点</span>
                <span className="text-sm text-muted-foreground">標準</span>
              </div>
              <p className="text-sm text-muted-foreground">標準的な状態です。</p>
            </div>

            <div className="bg-card p-6 rounded-lg border-l-4 border-l-[oklch(0.55_0.15_160)]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-foreground">70〜84点</span>
                <span className="text-sm text-muted-foreground">良好</span>
              </div>
              <p className="text-sm text-muted-foreground">サンホークの考え方に近い状態です。</p>
            </div>

            <div className="bg-card p-6 rounded-lg border-l-4 border-l-[oklch(0.45_0.18_145)]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-foreground">85〜100点</span>
                <span className="text-sm text-muted-foreground">優秀</span>
              </div>
              <p className="text-sm text-muted-foreground">サンホークの考え方に非常に近い状態です。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 bg-primary rounded" />
              <span className="text-sm text-muted-foreground">株式会社サンホーク</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 組織状態可視化システム</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
