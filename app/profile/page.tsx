import { Profile3DCard } from "@/components/profile-3d-card"

export default function ProfilePage() {
  // 名字数组 - 可以包含中文和英文名字
  const names = ["Zina", "王世博"]

  // 职业数组 - 每个职业都有标题和链接
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      <div className="relative">
        {/* 背景装饰元素 */}
        <div className="absolute -z-10 -left-20 -bottom-20">
          <div className="w-16 h-16 rounded-full bg-blue-500/20 backdrop-blur-md"></div>
        </div>
        <div className="absolute -z-10 -right-10 -top-10">
          <div className="w-24 h-24 rounded-full bg-orange-500/30 backdrop-blur-md"></div>
        </div>
        <div className="absolute -z-10 left-40 -top-20">
          <svg width="40" height="40" viewBox="0 0 256 417" xmlns="http://www.w3.org/2000/svg" className="opacity-10">
            <path fill="#343434" d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z" />
            <path fill="#8C8C8C" d="M127.962 0L0 212.32l127.962 75.639V154.158z" />
            <path fill="#3C3C3B" d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.6L256 236.587z" />
            <path fill="#8C8C8C" d="M127.962 416.905v-104.72L0 236.585z" />
            <path fill="#141414" d="M127.961 287.958l127.96-75.637-127.96-58.162z" />
            <path fill="#393939" d="M0 212.32l127.96 75.638v-133.8z" />
          </svg>
        </div>

        {/* 3D 个人资料卡片 */}
        <Profile3DCard names={names} professions={professions} />
      </div>
    </div>
  )
}
