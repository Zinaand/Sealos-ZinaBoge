"use client"
import { useEffect, useId, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { useOutsideClick } from "@/hooks/use-outside-click"

export default function MusicExpandableCard() {
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

  // 选择前6个卡片作为展示
  const displayCards = cards.slice(0, 6);

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
                    className="px-4 py-3 text-sm rounded-full font-bold bg-red-500 text-white"
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

      {/* 三行两列布局 */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* 第一行 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {displayCards.slice(0, 2).map((card, index) => (
            <motion.div
              layoutId={`card-${card.title}-${id}`}
              key={card.title}
              onClick={() => setActive(card)}
              className="p-4 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
            >
              <div className="flex gap-4 flex-col w-full">
                <motion.div layoutId={`image-${card.title}-${id}`} className="relative h-48 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <img
                    width={100}
                    height={100}
                    src={card.src}
                    alt={card.title}
                    className="h-full w-full object-contain hover:scale-105 transition-transform duration-500"
                    loading="eager"
                    onError={(e) => {
                      // 图片加载失败时显示默认图片
                      e.currentTarget.src = "https://via.placeholder.com/150?text=周杰伦";
                    }}
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
        </div>

        {/* 第二行 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {displayCards.slice(2, 4).map((card, index) => (
            <motion.div
              layoutId={`card-${card.title}-${id}`}
              key={card.title}
              onClick={() => setActive(card)}
              className="p-4 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
            >
              <div className="flex gap-4 flex-col w-full">
                <motion.div layoutId={`image-${card.title}-${id}`} className="relative h-48 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <img
                    width={100}
                    height={100}
                    src={card.src}
                    alt={card.title}
                    className="h-full w-full object-contain hover:scale-105 transition-transform duration-500"
                    loading="eager"
                    onError={(e) => {
                      // 图片加载失败时显示默认图片
                      e.currentTarget.src = "https://via.placeholder.com/150?text=周杰伦";
                    }}
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
        </div>

        {/* 第三行 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {displayCards.slice(4, 6).map((card, index) => (
            <motion.div
              layoutId={`card-${card.title}-${id}`}
              key={card.title}
              onClick={() => setActive(card)}
              className="p-4 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
            >
              <div className="flex gap-4 flex-col w-full">
                <motion.div layoutId={`image-${card.title}-${id}`} className="relative h-48 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <img
                    width={100}
                    height={100}
                    src={card.src}
                    alt={card.title}
                    className="h-full w-full object-contain hover:scale-105 transition-transform duration-500"
                    loading="eager"
                    onError={(e) => {
                      // 图片加载失败时显示默认图片
                      e.currentTarget.src = "https://via.placeholder.com/150?text=周杰伦";
                    }}
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
        </div>
      </div>
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
    description: "2000年",
    title: "范特西",
    src: "https://i.ibb.co/N6P30Mz/jay-fantasy.jpg",
    ctaText: "试听",
    ctaLink: "https://music.163.com/#/album?id=18918",
    content: () => {
      return (
        <p>
          《范特西》是周杰伦的第二张专辑，于2001年9月20日发行。这张专辑奠定了周杰伦在华语乐坛的地位，展现了他独特的音乐风格和创作才华。
          <br /> <br />
          专辑中的经典曲目包括《爱在西元前》、《简单爱》、《开不了口》、《上海一九四三》等。《范特西》融合了R&B、摇滚、爵士和中国传统音乐元素，创造出独树一帜的"周氏风格"。
          这张专辑不仅在音乐上取得了巨大成功，也对华语流行音乐产生了深远影响，被誉为华语流行乐史上的里程碑之作。
        </p>
      )
    },
  },
  {
    description: "2003年",
    title: "叶惠美",
    src: "https://i.ibb.co/CVJfBbR/jay-yehuimei.jpg",
    ctaText: "试听",
    ctaLink: "https://music.163.com/#/album?id=18913",
    content: () => {
      return (
        <p>
          《叶惠美》是周杰伦发行的第四张专辑，于2003年7月31日推出。这张专辑是周杰伦音乐生涯中的重要代表作，也是他最畅销的专辑之一。
          <br /> <br />
          专辑中《以父之名》展现了宏大的音乐构思，《晴天》则成为了周杰伦的代表作之一，《东风破》融合中国传统音乐元素，《她的睫毛》和《爱情悬崖》则展现了周杰伦在抒情歌曲上的才华。
          《叶惠美》专辑不仅在商业上取得了巨大成功，还获得了第15届金曲奖最佳流行音乐专辑奖，进一步确立了周杰伦在华语乐坛的领军地位。
        </p>
      )
    },
  },
  {
    description: "2006年",
    title: "依然范特西",
    src: "https://i.ibb.co/1nmFvbr/jay-stillfantasy.jpg",
    ctaText: "试听",
    ctaLink: "https://music.163.com/#/album?id=18894",
    content: () => {
      return (
        <p>
          《依然范特西》是周杰伦的第七张专辑，于2006年9月5日发行。这张专辑是《范特西》的概念延续，展现了周杰伦音乐风格的成熟与演变。
          <br /> <br />
          专辑中收录了《千里之外》（与费玉清合唱）、《红模仿》、《心雨》、《白色风车》等经典曲目。《依然范特西》继续展现了周杰伦融合多种音乐元素的独特才华，
          同时在词曲创作上更加成熟。这张专辑不仅在华语地区取得了商业上的成功，也进一步巩固了周杰伦在华语乐坛的地位，被誉为他创作生涯中的又一座里程碑。
        </p>
      )
    },
  },
  {
    description: "2016年",
    title: "周杰伦的床边故事",
    src: "https://i.ibb.co/KxgW3DG/jay-bedtimestory.jpg",
    ctaText: "试听",
    ctaLink: "https://music.163.com/#/album?id=34720827",
    content: () => {
      return (
        <p>
          《周杰伦的床边故事》是周杰伦的第14张录音室专辑，于2016年6月24日发行。这张专辑展现了周杰伦更为成熟和多元化的音乐风格。
          <br /> <br />
          专辑中的《告白气球》成为了广受欢迎的情歌，《前世情人》融合了电子音乐元素，《床边故事》则展现了周杰伦叙事性创作的特点。
          尽管发行时间距离他的出道已经很远，《周杰伦的床边故事》依然展示了他在音乐创作上的持续创新能力和影响力，证明了他作为华语乐坛标志性人物的地位。
        </p>
      )
    },
  },
  {
    description: "2004年",
    title: "七里香",
    src: "https://i.ibb.co/hcNXgpQ/qilixiang.jpg",
    ctaText: "试听",
    ctaLink: "https://music.163.com/#/album?id=18896",
    content: () => {
      return (
        <p>
          《七里香》是周杰伦2004年发行的第五张专辑，以浪漫清新的风格而闻名。
          <br /> <br />
          专辑中同名歌曲《七里香》以其优美的旋律和诗意的歌词成为经典，《园游会》、《借口》、《外婆》等曲目也广为传唱。专辑整体展现了周杰伦对青春、爱情和回忆的独特诠释。
          《七里香》专辑不仅在商业上取得了巨大成功，也因其独特的音乐风格和创新性在华语乐坛留下了深刻印记。
        </p>
      )
    },
  },
  {
    description: "2005年",
    title: "十一月的萧邦",
    src: "https://i.ibb.co/0stnqH9/november.jpg",
    ctaText: "试听",
    ctaLink: "https://music.163.com/#/album?id=18915",
    content: () => {
      return (
        <p>
          《十一月的萧邦》是周杰伦于2005年发行的第六张专辑，以古典音乐家萧邦命名，展现了他对古典音乐的敬意与融合。
          <br /> <br />
          专辑中包括《夜曲》、《发如雪》、《黑色毛衣》等经典歌曲。《夜曲》以其悠扬的钢琴旋律和忧伤的氛围成为周杰伦最具代表性的作品之一。
          这张专辑完美展现了周杰伦将流行音乐与古典元素相结合的才华，被认为是他音乐事业的一个重要里程碑。
        </p>
      )
    },
  },
] 