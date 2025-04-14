import type { ReactNode } from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { NavbarDemo } from "@/components/navbar-demo" // 导入新的导航栏
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ZinaのBlogger",
  description: "使用 Next.js 和 Tailwind CSS 构建的现代化博客",
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NavbarDemo /> {/* 使用新的导航栏 */}
          <div className="pt-16">
            {" "}
            {/* 添加顶部内边距，为固定导航栏留出空间 */}
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
