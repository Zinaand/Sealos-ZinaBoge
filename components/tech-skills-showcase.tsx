"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

// 定义技术类型
interface Technology {
  id: string
  name: string
  icon: string
  color: string
  description: string
  experience: string
  relatedSkills: string[]
}

// 定义技能类型
interface Skill {
  id: string
  name: string
  proficiency: number // 0-100
  color?: string
}

interface TechSkillsShowcaseProps {
  className?: string
}

export function TechSkillsShowcase({ className }: TechSkillsShowcaseProps) {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [connections, setConnections] = useState<{ from: DOMRect; to: DOMRect; techId: string; skillId: string }[]>([])

  // 技术数据
  const technologies: Technology[] = [
    {
      id: "microsoft",
      name: "Microsoft",
      icon: "/placeholder.svg?height=50&width=50",
      color: "#f25022",
      description: "我在Microsoft工作了4年，开发了多个产品。",
      experience: "参与了多个大型项目的开发，包括Office和Azure相关产品。",
      relatedSkills: ["csharp", "typescript", "react", "azure"],
    },
    {
      id: "chromium",
      name: "Chromium",
      icon: "/placeholder.svg?height=50&width=50",
      color: "#4285f4",
      description: "我对开源和Web充满热情，喜欢在这方面工作。",
      experience: "参与了Chromium项目的开发，贡献了多个功能和修复。",
      relatedSkills: ["javascript", "cpp", "webdev"],
    },
    {
      id: "frontend",
      name: "前端开发",
      icon: "/placeholder.svg?height=50&width=50",
      color: "#61dafb",
      description: "专注于创建现代化、响应式的用户界面。",
      experience: "精通React、Vue和Angular等前端框架，构建了多个大型应用。",
      relatedSkills: ["javascript", "typescript", "react", "svelte"],
    },
  ]

  // 技能数据
  const skills: Skill[] = [
    { id: "javascript", name: "JavaScript / TypeScript", proficiency: 90, color: "#f7df1e" },
    { id: "react", name: "React / NextJS", proficiency: 85, color: "#61dafb" },
    { id: "csharp", name: "C# / .NET", proficiency: 75, color: "#512bd4" },
    { id: "svelte", name: "Svelte", proficiency: 60, color: "#ff3e00" },
    { id: "cpp", name: "C++", proficiency: 65, color: "#00599c" },
    { id: "webdev", name: "Web开发", proficiency: 88, color: "#e34c26" },
    { id: "azure", name: "Azure", proficiency: 70, color: "#0078d4" },
    { id: "python", name: "Python", proficiency: 80, color: "#3776ab" },
  ]

  // 使用useCallback稳定函数引用
  const handleMouseEnter = useCallback((techId: string) => {
    setHoveredTech(techId)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHoveredTech(null)
  }, [])

  // 计算连接线
  useEffect(() => {
    if (!hoveredTech || !containerRef.current) {
      // 如果没有悬停的技术，清空连接
      if (connections.length > 0) {
        setConnections([])
      }
      return
    }

    // 使用requestAnimationFrame来避免在渲染周期内更新状态
    const animationFrameId = requestAnimationFrame(() => {
      const tech = technologies.find((t) => t.id === hoveredTech)
      if (!tech || !containerRef.current) return // 修复: 添加额外的null检查

      const techElement = containerRef.current.querySelector(`[data-tech-id="${hoveredTech}"]`)
      if (!techElement) return

      const techRect = techElement.getBoundingClientRect()
      const containerRect = containerRef.current.getBoundingClientRect()

      // 调整为相对于容器的位置
      const techRelativeRect = {
        left: techRect.left - containerRect.left,
        top: techRect.top - containerRect.top,
        width: techRect.width,
        height: techRect.height,
        right: techRect.right - containerRect.left,
        bottom: techRect.bottom - containerRect.top,
        x: techRect.x - containerRect.x,
        y: techRect.y - containerRect.y,
      }

      const newConnections: typeof connections = []

      tech.relatedSkills.forEach((skillId) => {
        const skillElement = containerRef.current?.querySelector(`[data-skill-id="${skillId}"]`)
        if (!skillElement) return

        const skillRect = skillElement.getBoundingClientRect()

        // 调整为相对于容器的位置
        const skillRelativeRect = {
          left: skillRect.left - containerRect.left,
          top: skillRect.top - containerRect.top,
          width: skillRect.width,
          height: skillRect.height,
          right: skillRect.right - containerRect.left,
          bottom: skillRect.bottom - containerRect.top,
          x: skillRect.x - containerRect.x,
          y: skillRect.y - containerRect.y,
        }

        newConnections.push({
          from: techRelativeRect as DOMRect,
          to: skillRelativeRect as DOMRect,
          techId: hoveredTech,
          skillId,
        })
      })

      setConnections(newConnections)
    })

    // 清理函数
    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [hoveredTech]) // 移除technologies和connections依赖项

  return (
    <div ref={containerRef} className={cn("relative py-12", className)}>
      {/* 技术卡片区域 - 使用相对定位 */}
      <div className="relative" style={{ height: "250px" }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 absolute w-full">
          {technologies.map((tech) => (
            <div
              key={tech.id}
              className="relative"
              onMouseEnter={() => handleMouseEnter(tech.id)}
              onMouseLeave={handleMouseLeave}
            >
              <div data-tech-id={tech.id} className="absolute inset-0 z-10 pointer-events-none" />

              {/* 新的展开卡片动画效果 */}
              <motion.div
                className="relative w-full overflow-hidden rounded-xl border border-border"
                style={{
                  backgroundColor: `${tech.color}10`,
                  minHeight: "180px",
                }}
                initial={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }}
                animate={{
                  boxShadow:
                    hoveredTech === tech.id
                      ? `0 20px 25px -5px ${tech.color}15, 0 10px 10px -5px ${tech.color}10`
                      : "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                  y: hoveredTech === tech.id ? -5 : 0,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                {/* 卡片内容容器 */}
                <div className="relative z-10 p-6">
                  {/* 顶部图标和标题 */}
                  <div className="flex items-start gap-4 mb-4">
                    <motion.div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${tech.color}30` }}
                      animate={{
                        scale: hoveredTech === tech.id ? 1.1 : 1,
                        rotate: hoveredTech === tech.id ? 5 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image src={tech.icon || "/placeholder.svg"} alt={tech.name} width={30} height={30} />
                    </motion.div>
                    <div>
                      <motion.h3
                        className="text-xl font-bold"
                        style={{ color: tech.color }}
                        animate={{
                          y: hoveredTech === tech.id ? -5 : 0,
                          scale: hoveredTech === tech.id ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {tech.name}
                      </motion.h3>
                    </div>
                  </div>

                  {/* 描述内容 - 默认显示 */}
                  <motion.div
                    className="text-muted-foreground"
                    animate={{
                      opacity: hoveredTech === tech.id ? 0 : 1,
                      height: hoveredTech === tech.id ? 0 : "auto",
                      marginBottom: hoveredTech === tech.id ? 0 : 16,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <p>{tech.description}</p>
                  </motion.div>

                  {/* 详细内容 - 悬停时显示 */}
                  <AnimatePresence>
                    {hoveredTech === tech.id && (
                      <motion.div
                        className="text-foreground"
                        initial={{ opacity: 0, y: 20, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: 20, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        <p className="mb-4">{tech.experience}</p>
                        <div>
                          <h4 className="font-medium mb-2">相关技能:</h4>
                          <div className="flex flex-wrap gap-2">
                            {tech.relatedSkills.map((skillId, index) => {
                              const skill = skills.find((s) => s.id === skillId)
                              return skill ? (
                                <motion.span
                                  key={skillId}
                                  className="px-2 py-1 text-xs rounded-full"
                                  style={{
                                    backgroundColor: `${skill.color || tech.color}20`,
                                    color: skill.color || tech.color,
                                  }}
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ delay: 0.1 + index * 0.05, duration: 0.2 }}
                                >
                                  {skill.name}
                                </motion.span>
                              ) : null
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 装饰性背景元素 */}
                <motion.div
                  className="absolute inset-0 z-0 opacity-30"
                  style={{
                    background: `radial-gradient(circle at 70% 30%, ${tech.color}30 0%, transparent 70%)`,
                  }}
                  animate={{
                    scale: hoveredTech === tech.id ? 1.5 : 1,
                    opacity: hoveredTech === tech.id ? 0.4 : 0.2,
                  }}
                  transition={{ duration: 0.5 }}
                />

                {/* 底部装饰线 */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1"
                  style={{ backgroundColor: tech.color }}
                  initial={{ width: "30%" }}
                  animate={{
                    width: hoveredTech === tech.id ? "100%" : "30%",
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* 连接线 SVG */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#ff8a00" />
          </marker>
        </defs>
        {connections.map((connection, i) => {
          const tech = technologies.find((t) => t.id === connection.techId)
          const startX = connection.from.left + connection.from.width / 2
          const startY = connection.from.bottom
          const endX = connection.to.left + connection.to.width / 2
          const endY = connection.to.top

          // 控制点，使线条有弧度
          const controlX = (startX + endX) / 2
          const controlY1 = startY + (endY - startY) * 0.3
          const controlY2 = endY - (endY - startY) * 0.3

          return (
            <motion.path
              key={`connection-${i}`}
              d={`M ${startX} ${startY} C ${controlX} ${controlY1}, ${controlX} ${controlY2}, ${endX} ${endY}`}
              fill="none"
              stroke={tech?.color || "#ff8a00"}
              strokeWidth="2"
              strokeDasharray="5,5"
              markerEnd="url(#arrowhead)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          )
        })}
      </svg>

      {/* 技能网格 - 添加顶部外边距 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-32">
        {skills.map((skill) => {
          // 确定是否高亮显示此技能
          const isHighlighted =
            hoveredTech && technologies.find((t) => t.id === hoveredTech)?.relatedSkills.includes(skill.id)

          return (
            <motion.div
              key={skill.id}
              data-skill-id={skill.id}
              className={cn(
                "rounded-xl p-4 border border-border transition-all duration-300",
                isHighlighted ? "ring-2 ring-offset-2 shadow-lg" : "",
                hoveredTech && !isHighlighted ? "opacity-50" : "",
              )}
              style={
                {
                  "--ring-color": skill.color,
                } as React.CSSProperties
              }
              animate={{
                boxShadow: isHighlighted ? `0 10px 25px -5px ${skill.color}30` : "0 0 0 0 transparent",
                scale: isHighlighted ? 1.03 : 1,
                transition: { duration: 0.3 },
              }}
            >
              <h3 className="font-medium mb-2">{skill.name}</h3>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: skill.color,
                  }}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${skill.proficiency}%`,
                    transition: { duration: 1, ease: "easeOut" },
                  }}
                />
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
