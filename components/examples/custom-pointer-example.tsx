"use client"

import { Pointer } from "@/components/ui/pointer"

export function CustomPointerExample() {
  return (
    <div className="relative h-64 w-full rounded-lg bg-primary/10 p-8 flex items-center justify-center">
      <h3 className="text-xl font-medium text-primary">自定义指针样式</h3>
      <Pointer>
        <div className="h-8 w-8 rounded-full bg-primary/50 backdrop-blur-sm border border-primary/20 flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-primary"></div>
        </div>
      </Pointer>
    </div>
  )
}
