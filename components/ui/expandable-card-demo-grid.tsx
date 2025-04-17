"use client"
import { useEffect, useId, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { useOutsideClick } from "@/hooks/use-outside-click"
export default function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(null)
  const id = useId()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false)
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [active])

  useOutsideClick(ref, () => setActive(null))

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-base"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                    rel="noreferrer"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function" ? active.content() : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-6xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-start gap-4">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col w-full">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <img
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-48 w-full rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="flex justify-center items-center flex-col">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  )
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  )
}

const cards = [
  {
    description: "Riot Game",
    title: "英雄联盟",
    src: "https://www.leagueoflegends.com/static/open-graph-2e582ae9fae8b0b396ca46ff21fd47a8.jpg",
    ctaText: "官网",
    ctaLink: "https://www.leagueoflegends.com/",
    content: () => {
      return (
        <p>
          《英雄联盟》是由Riot Games开发的一款多人在线战术竞技游戏。自2009年推出以来，它已经成为全球最受欢迎的电子竞技游戏之一。
          <br /> <br />
          游戏中，玩家扮演"召唤师"控制独特的"英雄"，与队友合作击败敌方团队。每个英雄都有独特的能力和游戏风格，游戏注重团队合作、策略和个人技巧。
          《英雄联盟》拥有庞大的全球玩家社区，每年举办的世界锦标赛是电竞界最受瞩目的赛事之一。
        </p>
      )
    },
  },
  {
    description: "Valve",
    title: "CS2",
    src: "https://cdn.akamai.steamstatic.com/steam/apps/730/capsule_616x353.jpg",
    ctaText: "官网",
    ctaLink: "https://www.counter-strike.net/",
    content: () => {
      return (
        <p>
          《CS2》(Counter-Strike 2)是由Valve开发的第一人称射击游戏，是经典CS:GO的全新升级版本。作为一款战术射击游戏，它继承了Counter-Strike系列的核心玩法。
          <br /> <br />
          游戏主要围绕两支队伍（恐怖分子和反恐精英）的对抗，在不同的地图和模式中进行比赛。CS2带来了全新的Source 2引擎、改进的物理系统、更精确的击中反馈以及
          视觉效果的全面升级。这款游戏强调团队合作、战术部署和精准的射击技巧，是电子竞技领域最具影响力的游戏之一。
        </p>
      )
    },
  },
  {
    description: "Riot Games",
    title: "瓦洛兰特",
    src: "https://www.riotgames.com/darkroom/1440/d0807e131a84f2e42c7a303bda672789:3d02afa7e0bfb75f645d97467765b24c/valorant-offwhitelaunch-keyart.jpg",
    ctaText: "官网",
    ctaLink: "https://playvalorant.com/",
    content: () => {
      return (
        <p>
          《瓦洛兰特》是由Riot Games开发的一款5v5角色战术射击游戏。游戏于2020年正式发布，迅速在全球范围内获得了广泛关注。
          <br /> <br />
          游戏结合了《CS:GO》的精准射击机制和《守望先锋》的特工能力系统，每个特工都拥有独特的技能和战术价值。玩家需要在回合制的比赛中，通过安装或拆除"尖峰"（游戏中的炸弹）来取得胜利。
          《瓦洛兰特》注重团队配合、策略执行和精确的枪法，已成为电竞领域的重要比赛项目。
        </p>
      )
    },
  },
  {
    description: "Firaxis Games",
    title: "文明VI",
    src: "https://cdn.cloudflare.steamstatic.com/steam/apps/289070/capsule_616x353.jpg",
    ctaText: "官网",
    ctaLink: "https://civilization.com/",
    content: () => {
      return (
        <p>
          《文明VI》是由Firaxis Games开发的回合制策略游戏，是著名《文明》系列的第六部作品。自2016年发布以来，游戏通过多次扩展包不断丰富其内容。
          <br /> <br />
          在游戏中，玩家扮演历史上著名文明的领袖，带领自己的文明从石器时代发展到信息时代。游戏融合了城市建设、科技研究、文化发展、外交谈判和军事征服等多种元素。
          《文明VI》引入了"城市规划"系统，使城市建设更具策略性。这款游戏以其深度的策略性和高度的可重玩性赢得了众多策略游戏爱好者的喜爱。
        </p>
      )
    },
  },
  {
    description: "Raw Fury",
    title: "王国：两位君主",
    src: "https://cdn.cloudflare.steamstatic.com/steam/apps/1367550/capsule_616x353.jpg",
    ctaText: "官网",
    ctaLink: "https://www.kingdomthegame.com/",
    content: () => {
      return (
        <p>
          《王国：两位君主》是由noio和Licorice开发，Raw Fury发行的一款微型策略游戏。这是《王国》系列的最新作品，结合了前作的精华并添加了全新内容。
          <br /> <br />
          游戏采用了极简的侧滚视角和像素风格，玩家扮演国王或王后，骑着坐骑在王国中游历，收集金币，招募臣民，建造防御工事，抵抗每晚来袭的怪物。
          《两位君主》引入了合作模式，允许两位玩家一起统治王国，带来了全新的游戏体验。这款游戏以其独特的艺术风格、简洁而深刻的游戏机制赢得了广泛赞誉。
        </p>
      )
    },
  },
  {
    description: "Blizzard Entertainment",
    title: "炉石传说",
    src: "https://bnetcmsus-a.akamaihd.net/cms/blog_header/2g/2G4AKOKEAXRF1562147206908.jpg",
    ctaText: "官网",
    ctaLink: "https://playhearthstone.com/",
    content: () => {
      return (
        <p>
          《炉石传说》是由暴雪娱乐开发的一款免费数字集换式卡牌游戏，设定在魔兽世界的宏大背景中。自2014年正式发布以来，游戏定期更新新的卡牌扩展包和游戏模式。
          <br /> <br />
          游戏采用回合制对战模式，玩家通过构建自己的卡牌牌组，利用英雄能力和各种卡牌的组合来击败对手。《炉石传说》以其易于上手但难以精通的特点，吸引了从休闲玩家到专业电竞选手的广泛玩家群体。
          游戏的成功也推动了数字卡牌游戏市场的快速发展，成为现代游戏设计的一个重要里程碑。
        </p>
      )
    },
  },
]
