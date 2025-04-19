"use client"

import { cn } from "@/lib/utils"
import { Marquee } from "@/components/ui/marquee"
import { useSocialStats } from "@/hooks/use-social-stats"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import { Iconfont } from '@/components/ui/Iconfont';
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
type SocialPlatform = {
  name: string;
  username: string;
  stats: string;
  description: string;
  iconName: string;
  bgColor: string;
  link: string;
}

export default function MarqueeDemo() {
  const { stats, loading, error, refreshStats } = useSocialStats();
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([]);

  useEffect(() => {
    if (stats) {
      // 当API数据加载完成后，更新社交媒体平台数据
      const updatedPlatforms: SocialPlatform[] = [
        {
          name: "哔哩哔哩",
          username: "@姿纳",
          stats: `${stats.bilibili.followers.toLocaleString()} 粉丝 · ${stats.bilibili.views.toLocaleString()} 播放 · ${stats.bilibili.videos} 视频`,
          description: "我不仅仅是玩游戏，我将游戏视为一种实验。通过游戏，我研究行为心理学、产品设计、决策制定和美学。",
          iconName: "icon-bilibili-fill",
          bgColor: "#FB7299",
          link: "https://space.bilibili.com/357723429",
        },
        {
          name: "抖音",
          username: "@姿纳",
          stats: `${stats.douyin.followers.toLocaleString()} 粉丝 · ${stats.douyin.likes.toLocaleString()} 点赞`,
          description: "分享游戏心得、产品分析和设计思考，探索游戏与心理学的交叉领域。",
          iconName: "icon-douyin",
          bgColor: "#000000",
          link: "https://www.douyin.com/",
        },
        {
          name: "小红书",
          username: "@姿纳",
          stats: `${stats.xiaohongshu.followers.toLocaleString()} 粉丝 · ${stats.xiaohongshu.notes.toLocaleString()} 笔记`,
          description: "记录游戏评测、设计分析和美学探索，分享独特视角下的游戏体验。",
          iconName: "icon-xiaohongshu",
          bgColor: "#FE2C55",
          link: "https://www.xiaohongshu.com/",
        },
        {
          name: "知乎",
          username: "@姿纳",
          stats: `${stats.zhihu.followers.toLocaleString()} 关注者 · ${stats.zhihu.answers.toLocaleString()} 回答`,
          description: "深度解析游戏机制、产品心理学和用户体验设计，探讨游戏与现实的连接。",
          iconName: "icon-zhihu",
          bgColor: "#0084FF",
          link: "https://www.zhihu.com/",
        },
        {
          name: "微博",
          username: "@姿纳",
          stats: `${stats.weibo.followers.toLocaleString()} 粉丝 · ${stats.weibo.posts.toLocaleString()} 微博`,
          description: "分享游戏行业见解、设计理念和心理学研究，连接游戏与现实世界。",
          iconName: "icon-weibo",
          bgColor: "#FB6622",
          link: "https://weibo.com/",
        },
        {
          name: "Twitter",
          username: "@Zina",
          stats: `${stats.twitter.followers.toLocaleString()} 粉丝 · ${stats.twitter.tweets.toLocaleString()} 推文`,
          description: "Sharing insights on game design, behavioral psychology and product development. Connecting games with real-world applications.",
          iconName: "icon-twitter",
          bgColor: "#1DA1F2",
          link: "https://twitter.com/",
        },
      ];
      
      setPlatforms(updatedPlatforms);
    }
  }, [stats]);

  // 添加定时刷新效果 - 每5分钟刷新一次数据
  useEffect(() => {
    const interval = setInterval(() => {
      refreshStats();
    }, 5 * 60 * 1000); // 5分钟
    
    return () => clearInterval(interval); // 组件卸载时清除定时器
  }, [refreshStats]);

  const firstRow = platforms.slice(0, platforms.length / 2);
  const secondRow = platforms.slice(platforms.length / 2);

  // 如果正在加载，显示骨架屏
  if (loading || platforms.length === 0) {
    return (
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <div className="w-full max-w-4xl mx-auto text-center mb-8">
       
          <TextGenerateEffect words="I share stories about #programming, #gaming, #content-creation and #life on the Internet." />
        </div>
        
        <div className="flex gap-4 mb-6 overflow-hidden">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="w-72 h-48 rounded-xl border p-4">
              <div className="flex items-center gap-3 mb-4">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <Skeleton className="h-4 w-full mb-3" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
                <Skeleton className="h-3 w-4/6" />
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex gap-4 overflow-hidden">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="w-72 h-48 rounded-xl border p-4">
              <div className="flex items-center gap-3 mb-4">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <Skeleton className="h-4 w-full mb-3" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
                <Skeleton className="h-3 w-4/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 如果出错
  if (error) {
    return (
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-12">
        <div className="text-center">
        
          <p className="text-red-500 mb-4">加载数据出错: {error}</p>
          <p className="text-muted-foreground">请刷新页面重试</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* 导入iconfont图标 */}
      <link rel="stylesheet" href="//at.alicdn.com/t/c/font_4263036_wg9ld41hgh.css" />
      
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <div className="w-full max-w-4xl mx-auto text-center mb-8">
       
          <TextGenerateEffect words="I share stories about #programming, #gaming, #content-creation and #life on the Internet." />
        </div>
        
        <Marquee pauseOnHover className="[--duration:40s]">
          {firstRow.map((platform) => (
            <SocialMediaCard key={platform.name} {...platform} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:40s] mt-6">
          {secondRow.map((platform) => (
            <SocialMediaCard key={platform.name} {...platform} />
          ))}
        </Marquee>
        
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        
        <div className="mt-10 max-w-3xl mx-auto text-center">
        
          <TextGenerateEffect words="Storytelling is my passion because I've been profoundly shaped by the stories of others." />
        </div>
      </div>
    </>
  )
}

const SocialMediaCard = ({
  iconName,
  name,
  username,
  stats,
  description,
  bgColor,
  link,
}: {
  iconName: string
  name: string
  username: string
  stats: string
  description: string
  bgColor: string
  link: string
}) => {
  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="mx-4 no-underline"
    >
    <figure
      className={cn(
          "relative h-full w-72 cursor-pointer overflow-hidden rounded-xl border p-4",
          "transition-transform duration-300 hover:scale-105",
          "border-gray-950/[.1] bg-white dark:border-gray-50/[.1] dark:bg-gray-900",
        )}
      >
        <div className="flex items-center gap-3 mb-2">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: bgColor }}
          >
            <i className={`iconfont ${iconName} text-white text-xl`}></i>
          </div>
        <div className="flex flex-col">
            <figcaption className="text-base font-bold dark:text-white">{name}</figcaption>
            <p className="text-xs text-gray-500 dark:text-gray-400">{username}</p>
          </div>
        </div>
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{stats}</div>
        <blockquote className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{description}</blockquote>
    </figure>
    </a>
  )
}
