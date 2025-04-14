"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Pointer } from "@/components/ui/pointer"

export function CardWithPointer() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>交互式卡片</CardTitle>
        <CardDescription>将鼠标悬停在此卡片上查看自定义指针效果</CardDescription>
      </CardHeader>
      <CardContent>
        <p>这是一个带有自定义指针效果的卡片示例。当您将鼠标悬停在卡片上时，默认光标将被自定义指针替代。</p>
      </CardContent>
      <Pointer className="text-primary" />
    </Card>
  )
}
