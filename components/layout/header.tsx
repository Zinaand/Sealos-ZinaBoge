"use client"

import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          MyApp
        </Link>

        {/* 桌面导航 */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/features" className="text-muted-foreground hover:text-foreground transition-colors">
            功能
          </Link>
          <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
            价格
          </Link>
          <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
            关于
          </Link>
          <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
            联系我们
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          <Button variant="outline" size="sm">
            登录
          </Button>
          <Button size="sm">注册</Button>
        </div>

        {/* 移动端菜单按钮 */}
        <div className="flex md:hidden items-center gap-4">
          <ModeToggle />
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* 移动端菜单 */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-4 border-t border-border">
          <nav className="flex flex-col gap-4">
            <Link href="/features" className="text-muted-foreground hover:text-foreground transition-colors">
              功能
            </Link>
            <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              价格
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              关于
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              联系我们
            </Link>
            <div className="flex gap-4 mt-4">
              <Button variant="outline" size="sm" className="flex-1">
                登录
              </Button>
              <Button size="sm" className="flex-1">
                注册
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
