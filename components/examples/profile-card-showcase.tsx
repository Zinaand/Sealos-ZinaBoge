"use client"

import { Profile3DCard } from "@/components/profile-3d-card"

export function ProfileCardShowcase() {
  // 名字数组
  const names = ["数字游牧人", "Digital Nomad", "John Doe", "张三"]

  // 职业数组
  const professions = [
    { title: "Influencer (>408K followers)", link: "/influencer" },
    { title: "Chromium Developer", link: "/chromium" },
    { title: "Web Developer", link: "/web" },
    { title: "Game Developer", link: "/game-dev" },
    { title: "Game Critic", link: "/game-critic" },
    { title: "Digital Nomad", link: "/digital-nomad" },
    { title: "Trader", link: "/trader" },
  ]

  return (
    <div className="flex justify-center items-center py-12">
      <Profile3DCard names={names} professions={professions} />
    </div>
  )
}
