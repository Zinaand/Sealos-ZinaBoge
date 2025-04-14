import type React from "react"
import { notFound } from "next/navigation"
import Game237 from "@/components/237"
import TetrisGame from "@/components/tetris"
import MazeGame from "@/components/maze-game"

// This is a simple mapping of game IDs to their components
// In a real app, you might load these dynamically
const gameComponents: Record<string, React.ComponentType> = {
  "237": Game237,
  tetris: TetrisGame,
  maze: MazeGame,
  // Add other games here as you develop them
}

// Define the correct params type for Next.js dynamic routes
interface GamePageProps {
  params: {
    id: string
  }
  searchParams: Record<string, string | string[] | undefined>
}

export default function GamePage({ params, searchParams }: GamePageProps) {
  const { id } = params

  // Get the game component for this ID
  const GameComponent = gameComponents[id]

  // If no game exists for this ID, show 404
  if (!GameComponent) {
    notFound()
  }

  return <GameComponent />
}
