"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function CustomNavbarLogo({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center", className)} {...props}>
      <Link href="/" className="flex items-center gap-2">
        {/* 使用您自己的 logo 图片 */}
        <Image src="/your-logo.png" alt="Logo" width={32} height={32} className="rounded-lg" />
        <span className="text-lg font-semibold text-neutral-900 dark:text-white">您的网站名</span>
      </Link>
    </div>
  )
}
