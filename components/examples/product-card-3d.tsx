"use client"

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export function ProductCard3D() {
  return (
    <CardContainer>
      <CardBody className="relative h-auto w-80 rounded-xl border border-border bg-background p-6">
        <CardItem translateZ="50" className="text-xl font-bold text-foreground">
          高级耳机
        </CardItem>

        <CardItem translateZ="60" className="mt-2">
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none">新品</Badge>
        </CardItem>

        <CardItem translateZ="100" className="mt-4 w-full">
          <Image
            src="/placeholder.svg?height=300&width=300"
            height={300}
            width={300}
            alt="产品图片"
            className="h-52 w-full object-contain"
          />
        </CardItem>

        <CardItem as="p" translateZ="60" className="mt-4 text-sm text-muted-foreground">
          高品质无线耳机，提供卓越的音质和舒适的佩戴体验。
        </CardItem>

        <div className="mt-6 flex items-center justify-between">
          <CardItem translateZ="40" className="text-lg font-bold text-foreground">
            ¥1,299
          </CardItem>

          <CardItem translateZ="40">
            <Button size="sm">加入购物车</Button>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  )
}
