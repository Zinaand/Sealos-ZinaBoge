"use client"

import ThreeDCardDemo from "@/components/ui/3d-card-demo"

export function CardShowcase() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">3D 卡片展示</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            体验我们的 3D 交互卡片组件，为您的应用增添独特的视觉效果。
          </p>
        </div>

        <div className="flex justify-center">
          <ThreeDCardDemo />
        </div>
      </div>
    </section>
  )
}
