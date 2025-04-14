"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

// 定义职业类型
interface Profession {
  title: string
  link: string
}

// 定义组件属性
interface Profile3DCardProps {
  names: string[]
  professions: Profession[]
  className?: string
}

export function Profile3DCard({ names, professions, className }: Profile3DCardProps) {
  // 名字轮播状态
  const [currentNameIndex, setCurrentNameIndex] = useState(0)
  const [hoveredProfession, setHoveredProfession] = useState<string | null>(null)

  // 自动轮播名字
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNameIndex((prevIndex) => (prevIndex + 1) % names.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [names.length])

  return (
    <CardContainer className={cn("inter-var", className)}>
      <CardBody className="relative bg-white dark:bg-neutral-900 w-[350px] h-auto rounded-3xl p-8 border border-neutral-200 dark:border-neutral-800">
        {/* 名字部分 */}
        <CardItem translateZ="50" className="mb-4">
          <h2 className="text-xl font-medium text-neutral-700 dark:text-neutral-300">My name is:</h2>
          <div className="h-16 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentNameIndex}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold text-primary absolute"
              >
                {names[currentNameIndex]}
              </motion.h1>
            </AnimatePresence>
          </div>
        </CardItem>

        {/* 分隔线 */}
        <CardItem translateZ="40" className="my-6">
          <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800"></div>
        </CardItem>

        {/* 职业部分 */}
        <CardItem translateZ="30" className="mb-2">
          <h2 className="text-xl font-medium text-neutral-700 dark:text-neutral-300">I'm a:</h2>
        </CardItem>

        <div className="flex flex-col items-end space-y-2">
          {professions.map((profession, index) => (
            <CardItem
              key={profession.title}
              as={Link}
              href={profession.link}
              translateZ={hoveredProfession === profession.title ? "80" : "40"}
              rotateX={hoveredProfession === profession.title ? 5 : 0}
              rotateZ={hoveredProfession === profession.title ? -5 : 0}
              className={cn(
                "text-right transition-all duration-300 text-lg font-medium px-3 py-1 rounded-lg",
                hoveredProfession === profession.title
                  ? "text-primary bg-primary/5"
                  : hoveredProfession
                    ? "text-neutral-400 dark:text-neutral-600"
                    : "text-neutral-700 dark:text-neutral-300",
              )}
              onMouseEnter={() => setHoveredProfession(profession.title)}
              onMouseLeave={() => setHoveredProfession(null)}
            >
              {profession.title}
            </CardItem>
          ))}
        </div>
      </CardBody>
    </CardContainer>
  )
}
