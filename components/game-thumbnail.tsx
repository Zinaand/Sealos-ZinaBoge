"use client"

import { useState } from "react"
import { motion } from "motion/react"

interface GameThumbnailProps {
  title: string
  color?: string
}

export function GameThumbnail({ title, color = "#4285f4" }: GameThumbnailProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Custom elements based on game title
  const renderGameSpecificElements = () => {
    if (title === "方块(俄罗斯方块)") {
      return (
        <>
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-cyan-500"></div>
          <div className="absolute top-1/4 left-1/4 w-4 h-4 ml-4 bg-cyan-500"></div>
          <div className="absolute top-1/4 left-1/4 w-4 h-4 ml-8 bg-cyan-500"></div>
          <div className="absolute top-1/4 left-1/4 w-4 h-4 ml-12 bg-cyan-500"></div>

          <div className="absolute top-1/3 left-1/3 w-4 h-4 bg-purple-500"></div>
          <div className="absolute top-1/3 left-1/3 w-4 h-4 ml-4 bg-purple-500"></div>
          <div className="absolute top-1/3 left-1/3 w-4 h-4 ml-8 bg-purple-500"></div>
          <div className="absolute top-1/3 left-1/3 w-4 h-4 ml-4 mt-4 bg-purple-500"></div>

          <div className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-yellow-500"></div>
          <div className="absolute bottom-1/4 right-1/4 w-4 h-4 ml-4 bg-yellow-500"></div>
          <div className="absolute bottom-1/4 right-1/4 w-4 h-4 mt-4 bg-yellow-500"></div>
          <div className="absolute bottom-1/4 right-1/4 w-4 h-4 ml-4 mt-4 bg-yellow-500"></div>
        </>
      )
    }

    if (title === "237") {
      return (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
          <div className="absolute bottom-4 left-0 right-0 text-center text-white text-6xl font-bold">237</div>
          <div className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-red-500/50 animate-pulse"></div>
        </>
      )
    }

    return null
  }

  return (
    <motion.div
      className="w-full h-full rounded-lg overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
      animate={{
        boxShadow: isHovered
          ? `0 20px 25px -5px ${color}30, 0 10px 10px -5px ${color}20`
          : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        y: isHovered ? -5 : 0,
      }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(45deg, ${color}80, ${color}20)`,
        }}
      />

      {renderGameSpecificElements()}

      <div className="absolute inset-0 flex items-center justify-center">
        <h3 className="text-white text-xl font-bold text-center px-4 drop-shadow-md">{title}</h3>
      </div>

      {/* Game-like decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-black/20" />
      <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-white/80" />
      <div className="absolute bottom-2 left-2 w-16 h-2 rounded-full bg-white/50" />
    </motion.div>
  )
}
