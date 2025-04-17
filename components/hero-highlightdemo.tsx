"use client" // 标记为客户端组件，允许使用客户端交互和动画
import { motion } from "motion/react" // 导入动画库
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight" // 导入自定义高亮组件

/**
 * 英雄区块高亮演示组件
 * 展示带有动画效果的标题文本，并包含高亮部分
 */
export default function HeroHighlightDemo() {
  return (
    <HeroHighlight>
      <motion.h1
        // 定义初始状态：不可见且向下偏移20像素
        initial={{
          opacity: 0,
          y: 20,
        }}
        // 定义动画目标状态：完全可见，并且有一个轻微的上下弹跳效果
        animate={{
          opacity: 1,
          y: [20, -5, 0], // 从20像素下方，向上移动超过目标位置5像素，然后回到正确位置
        }}
        // 动画时间和缓动函数配置
        transition={{
          duration: 0.5, // 动画持续0.5秒
          ease: [0.4, 0.0, 0.2, 1], // 自定义贝塞尔曲线缓动函数
        }}
        className="text-lg px-4 md:text-xl lg:text-2xl font-bold text-neutral-700 dark:text-white max-w-3xl leading-normal text-center mx-auto"
      >
        我正在与来自不同领域的个人合作，这正是我创建这个网站的原因{" "}
        {/* 特别高亮的文本部分 */}
        <Highlight className="text-black dark:text-white px-0.5 pb-0.5">请与我们联系</Highlight>
      </motion.h1>
    </HeroHighlight>
  )
}
