"use client"

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export function BlogCard3D() {
  return (
    <CardContainer>
      <CardBody className="group relative h-auto w-96 overflow-hidden rounded-xl border border-border bg-background">
        <CardItem translateZ="100" className="w-full">
          <Image
            src="/placeholder.svg?height=400&width=600"
            height={400}
            width={600}
            alt="博客封面"
            className="h-48 w-full object-cover transition-transform group-hover:scale-105"
          />
        </CardItem>

        <div className="p-6">
          <CardItem translateZ="50" className="text-sm font-medium text-primary">
            <Badge variant="secondary" className="mb-2">
              设计
            </Badge>
          </CardItem>

          <CardItem translateZ="60" className="text-xl font-bold text-foreground">
            现代 UI 设计趋势
          </CardItem>

          <CardItem as="p" translateZ="50" className="mt-2 text-sm text-muted-foreground">
            探索 2023 年最流行的 UI 设计趋势，了解如何将它们应用到您的项目中。
          </CardItem>

          <CardItem translateZ="40" className="mt-6 flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=50&width=50" alt="作者" />
              <AvatarFallback>作者</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">张三</p>
              <p className="text-xs text-muted-foreground">2023年10月15日</p>
            </div>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  )
}
