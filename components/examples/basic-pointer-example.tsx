"use client"

import { Pointer } from "@/components/ui/pointer"

export function BasicPointerExample() {
  return (
    <div className="relative h-64 w-full rounded-lg bg-muted p-8 flex items-center justify-center">
      <h3 className="text-xl font-medium">将鼠标悬停在此区域查看自定义指针</h3>
      <Pointer />
    </div>
  )
}
