import Link from "next/link"
import { GameThumbnail } from "@/components/game-thumbnail"

// Game data structure
interface Game {
  id: string
  title: string
  color: string
  description: string
  views: number
  likes: number
  date: string
}

// Sample game data
const games: Game[] = [
  {
    id: "237",
    title: "237",
    color: "#f25022",
    description: "恐怖迷宫逃生游戏",
    views: 1086,
    likes: 0,
    date: "2023-04-07",
  },
  {
    id: "tetris",
    title: "方块(俄罗斯方块)",
    color: "#4285f4",
    description: "经典俄罗斯方块游戏",
    views: 1072,
    likes: 0,
    date: "2023-04-05",
  },
  {
    id: "maze",
    title: "迷宫",
    color: "#34a853",
    description: "3D迷宫探险游戏",
    views: 1102,
    likes: 0,
    date: "2023-04-03",
  },
  {
    id: "platformer",
    title: "冒险岛",
    color: "#fbbc05",
    description: "横版冒险游戏",
    views: 1117,
    likes: 1,
    date: "2023-04-01",
  },
  {
    id: "rpg",
    title: "克隆大师完全汉化版",
    color: "#ea4335",
    description: "角色扮演游戏",
    views: 1115,
    likes: 0,
    date: "2023-03-28",
  },
  {
    id: "adventure",
    title: "高桥名人的冒险岛",
    color: "#00a1f1",
    description: "经典冒险游戏",
    views: 1088,
    likes: 0,
    date: "2023-03-25",
  },
  {
    id: "mario",
    title: "超级马里奥",
    color: "#7cbb00",
    description: "经典平台游戏",
    views: 1187,
    likes: 1,
    date: "2023-03-22",
  },
  {
    id: "zelda",
    title: "塞尔达传说",
    color: "#ffb900",
    description: "动作冒险游戏",
    views: 1120,
    likes: 0,
    date: "2023-03-20",
  },
]

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">游戏中心</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">探索各种有趣的游戏，点击任意游戏开始体验</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <Link key={game.id} href={`/games/${game.id}`} className="group block">
              <div className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <GameThumbnail title={game.title} color={game.color} />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{game.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{game.description}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>👁️ {game.views}</span>
                    <span className="mx-2">•</span>
                    <span>❤️ {game.likes}</span>
                    <span className="mx-2">•</span>
                    <span>{game.date}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
