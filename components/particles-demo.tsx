"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { Particles } from "@/components/ui/particles"

// 修改为背景粒子组件，可以包裹整个网站内容
export default function ParticlesBackground({ children }: { children?: React.ReactNode }) {
  const { resolvedTheme } = useTheme()
  const [color, setColor] = useState("#ffffff")

  useEffect(() => {
    // 粒子颜色更淡，减少视觉干扰
    setColor(resolvedTheme === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.2)")
  }, [resolvedTheme])

  return (
    <div className="relative min-h-screen w-full">
      {children}
      <Particles 
        className="fixed inset-0 -z-10" 
        quantity={50}  // 减少粒子数量
        ease={100}     // 增加粒子移动的平滑度
        color={color} 
        refresh 
      />
    </div>
  )
}
