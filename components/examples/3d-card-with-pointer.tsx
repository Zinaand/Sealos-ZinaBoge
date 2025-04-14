"use client"

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card"
import { Pointer } from "@/components/ui/pointer"
import Image from "next/image"

export function ThreeDCardWithPointer() {
  return (
    <div className="relative">
      <CardContainer>
        <CardBody className="bg-background relative group/card dark:hover:shadow-2xl dark:hover:shadow-primary/[0.1] border-border w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
          <CardItem translateZ="50" className="text-xl font-bold text-foreground">
            3D 卡片与自定义指针
          </CardItem>
          <CardItem as="p" translateZ="60" className="text-muted-foreground text-sm max-w-sm mt-2">
            将鼠标悬停在此卡片上，体验 3D 效果和自定义指针
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
        </CardBody>
      </CardContainer>

      <Pointer>
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/20 backdrop-blur-md">
          <div className="h-3 w-3 rounded-full bg-primary"></div>
        </div>
      </Pointer>
    </div>
  )
}
