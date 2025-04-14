"use client"

import Image from "next/image"
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card"
import { Button } from "@/components/ui/button"

export default function ThreeDCardDemo() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-background relative group/card dark:hover:shadow-2xl dark:hover:shadow-primary/[0.1] border-border w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
        <CardItem translateZ="50" className="text-xl font-bold text-foreground">
          探索 3D 交互效果
        </CardItem>
        <CardItem as="p" translateZ="60" className="text-muted-foreground text-sm max-w-sm mt-2">
          将鼠标悬停在此卡片上，体验 CSS 透视效果的魅力
        </CardItem>
        <CardItem translateZ="100" rotateX={20} rotateZ={-10} className="w-full mt-4">
          <Image
            src="/placeholder.svg?height=400&width=600"
            height={400}
            width={600}
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="示例图片"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem translateZ={20} translateX={-40} as={Button} variant="ghost">
            立即体验 →
          </CardItem>
          <CardItem translateZ={20} translateX={40} as={Button}>
            了解更多
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  )
}
