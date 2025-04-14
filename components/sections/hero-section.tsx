import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          打造令人惊叹的<span className="text-primary">用户体验</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          使用我们的现代化组件库和工具，快速构建美观、响应式的 Web 应用程序。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/get-started">开始使用</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/docs">查看文档</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
