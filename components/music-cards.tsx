"use client";

import { useId, useRef, useState, useEffect } from 'react';
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { HiPlay, HiHeart, HiOutlineHeart } from 'react-icons/hi';
import Image from 'next/image';

// 周杰伦歌曲数据
const jayAlbums = [
  {
    id: "1",
    title: "七里香",
    cover: "https://p2.music.126.net/GG5bXP8Xh2uUGyjrEtaMXw==/109951168153502233.jpg",
    year: "2004",
    description: "《七里香》是周杰伦发行的第五张专辑，收录了《七里香》、《借口》、《园游会》等歌曲，被誉为周杰伦最具代表性的专辑之一。",
    songs: [
      { id: "101", title: "七里香", duration: "4:59", externalUrl: "https://music.163.com/#/song?id=186016" },
      { id: "102", title: "借口", duration: "4:20", externalUrl: "https://music.163.com/#/song?id=186003" },
      { id: "103", title: "园游会", duration: "4:14", externalUrl: "https://music.163.com/#/song?id=186001" },
      { id: "104", title: "外婆", duration: "3:43", externalUrl: "https://music.163.com/#/song?id=186002" },
      { id: "105", title: "将军", duration: "3:58", externalUrl: "https://music.163.com/#/song?id=186004" }
    ]
  },
  {
    id: "2",
    title: "范特西",
    cover: "https://p1.music.126.net/v22kd3XTcLY17MtAXdPE9g==/17762610683301149.jpg",
    year: "2001",
    description: "《范特西》是周杰伦发行的第二张专辑，包含了《爱在西元前》、《简单爱》等经典歌曲，展现了周杰伦在音乐创作上的独特才华。",
    songs: [
      { id: "201", title: "爱在西元前", duration: "3:54", externalUrl: "https://music.163.com/#/song?id=185868" },
      { id: "202", title: "简单爱", duration: "4:31", externalUrl: "https://music.163.com/#/song?id=185813" },
      { id: "203", title: "开不了口", duration: "4:16", externalUrl: "https://music.163.com/#/song?id=185809" },
      { id: "204", title: "上海一九四三", duration: "4:32", externalUrl: "https://music.163.com/#/song?id=185841" },
      { id: "205", title: "双截棍", duration: "3:48", externalUrl: "https://music.163.com/#/song?id=185811" }
    ]
  },
  {
    id: "3",
    title: "十一月的萧邦",
    cover: "https://p1.music.126.net/N2HO5xfYEpWRFy6V7tpF0A==/18788454697732991.jpg",
    year: "2005",
    description: "《十一月的萧邦》是周杰伦的第六张专辑，以古典音乐大师肖邦命名，融合了多种音乐元素，收录了《发如雪》、《黑色毛衣》等经典作品。",
    songs: [
      { id: "301", title: "发如雪", duration: "4:59", externalUrl: "https://music.163.com/#/song?id=185784" },
      { id: "302", title: "黑色毛衣", duration: "4:12", externalUrl: "https://music.163.com/#/song?id=185785" },
      { id: "303", title: "四面楚歌", duration: "4:30", externalUrl: "https://music.163.com/#/song?id=186017" },
      { id: "304", title: "夜曲", duration: "3:46", externalUrl: "https://music.163.com/#/song?id=185815" },
      { id: "305", title: "蓝色风暴", duration: "4:14", externalUrl: "https://music.163.com/#/song?id=185780" }
    ]
  },
  {
    id: "4",
    title: "叶惠美",
    cover: "https://p1.music.126.net/cYXWGbY_qvBQDSCyIL0Nnw==/34084860763758747.jpg",
    year: "2003",
    description: "《叶惠美》是周杰伦的第四张专辑，以其母亲名字命名，收录了《以父之名》、《晴天》等脍炙人口的作品，展现了周杰伦多元化的音乐风格。",
    songs: [
      { id: "401", title: "以父之名", duration: "5:41", externalUrl: "https://music.163.com/#/song?id=185867" },
      { id: "402", title: "晴天", duration: "4:29", externalUrl: "https://music.163.com/#/song?id=186016" },
      { id: "403", title: "东风破", duration: "5:15", externalUrl: "https://music.163.com/#/song?id=185811" },
      { id: "404", title: "你听得到", duration: "4:15", externalUrl: "https://music.163.com/#/song?id=185822" },
      { id: "405", title: "同一种调调", duration: "3:24", externalUrl: "https://music.163.com/#/song?id=185840" }
    ]
  },
  {
    id: "5",
    title: "魔杰座",
    cover: "https://p1.music.126.net/TWC3S35Q19WnFY1d9DTLMQ==/18874216602674278.jpg",
    year: "2008",
    description: "《魔杰座》是周杰伦的第九张专辑，以其天蝎座星座命名，集合了多种音乐风格和元素，包含《给我一首歌的时间》、《说好的幸福呢》等佳作。",
    songs: [
      { id: "501", title: "给我一首歌的时间", duration: "4:14", externalUrl: "https://music.163.com/#/song?id=185879" },
      { id: "502", title: "说好的幸福呢", duration: "4:16", externalUrl: "https://music.163.com/#/song?id=185859" },
      { id: "503", title: "兰亭序", duration: "4:09", externalUrl: "https://music.163.com/#/song?id=185846" },
      { id: "504", title: "花海", duration: "4:24", externalUrl: "https://music.163.com/#/song?id=185856" },
      { id: "505", title: "魔术先生", duration: "4:10", externalUrl: "https://music.163.com/#/song?id=185842" }
    ]
  },
  {
    id: "6",
    title: "我很忙",
    cover: "https://p1.music.126.net/Eyp6O3ej67y6L1CDjV2rzg==/19069929673003344.jpg",
    year: "2007",
    description: "《我很忙》是周杰伦的第八张专辑，是他音乐生涯中极为重要的一张作品，收录了《青花瓷》、《阳光宅男》等传唱度极高的歌曲。",
    songs: [
      { id: "601", title: "青花瓷", duration: "3:59", externalUrl: "https://music.163.com/#/song?id=185872" },
      { id: "602", title: "阳光宅男", duration: "4:09", externalUrl: "https://music.163.com/#/song?id=185855" },
      { id: "603", title: "蒲公英的约定", duration: "4:39", externalUrl: "https://music.163.com/#/song?id=185841" },
      { id: "604", title: "无双", duration: "4:01", externalUrl: "https://music.163.com/#/song?id=185853" },
      { id: "605", title: "我不配", duration: "4:26", externalUrl: "https://music.163.com/#/song?id=185850" }
    ]
  }
];

interface MusicCardsProps {
  onPlaySong: (song: any) => void;
  onAddToFavorites: (song: any) => void;
}

const MusicCards: React.FC<MusicCardsProps> = ({ onPlaySong, onAddToFavorites }) => {
  const [active, setActive] = useState<(typeof jayAlbums)[number] | boolean | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const toggleFavorite = (songId: string, song: any, event: React.MouseEvent) => {
    event.stopPropagation();
    if (favorites.includes(songId)) {
      setFavorites(favorites.filter(id => id !== songId));
    } else {
      setFavorites([...favorites, songId]);
      onAddToFavorites(song);
    }
  };

  const handlePlaySong = (song: any, event: React.MouseEvent) => {
    event.stopPropagation();
    onPlaySong(song);
  };

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
          <div className="fixed inset-0 grid place-items-center z-[100]">
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
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  width={500}
                  height={300}
                  src={active.cover}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-xl"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`year-${active.year}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-sm"
                    >
                      {active.year}
                    </motion.p>
                  </div>

                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={`https://music.163.com/#/search/m/?s=${active.title} 周杰伦`}
                    target="_blank"
                    className="px-4 py-2 text-sm rounded-full font-bold bg-red-500 text-white"
                    rel="noreferrer"
                  >
                    在网易云中查看
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-sm md:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    <p className="mb-4">{active.description}</p>
                    <div className="w-full">
                      <h4 className="font-semibold text-lg mb-2">热门歌曲</h4>
                      <ul className="space-y-3 w-full">
                        {active.songs.map((song) => (
                          <li key={song.id} className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg w-full">
                            <div className="flex items-center">
                              <button 
                                onClick={(e) => handlePlaySong({...song, album: active.title, cover: active.cover}, e)}
                                className="p-2 mr-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                aria-label={`播放 ${song.title}`}
                              >
                                <HiPlay className="h-5 w-5" />
                              </button>
                              <div>
                                <p className="font-medium">{song.title}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{song.duration}</p>
                              </div>
                            </div>
                            <button 
                              onClick={(e) => toggleFavorite(song.id, {...song, album: active.title, cover: active.cover}, e)}
                              className={`p-2 ${
                                favorites.includes(song.id) 
                                  ? 'text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400' 
                                  : 'text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-500'
                              }`}
                              aria-label={favorites.includes(song.id) ? `从收藏中移除 ${song.title}` : `收藏 ${song.title}`}
                            >
                              {favorites.includes(song.id) ? (
                                <HiHeart className="h-5 w-5" />
                              ) : (
                                <HiOutlineHeart className="h-5 w-5" />
                              )}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jayAlbums.map((album) => (
          <motion.div
            layoutId={`card-${album.title}-${id}`}
            key={album.title}
            onClick={() => setActive(album)}
            className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer bg-white dark:bg-gray-800"
          >
            <motion.div layoutId={`image-${album.title}-${id}`} className="relative h-56 overflow-hidden">
              <Image
                src={album.cover}
                alt={album.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 text-white">
                <motion.h3
                  layoutId={`title-${album.title}-${id}`}
                  className="text-xl font-bold"
                >
                  {album.title}
                </motion.h3>
                <motion.p
                  layoutId={`year-${album.year}-${id}`}
                  className="text-sm opacity-90"
                >
                  {album.year}
                </motion.p>
              </div>
            </motion.div>
            <div className="p-4">
              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{album.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs text-gray-500 dark:text-gray-400">{album.songs.length} 首歌曲</span>
                <button
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  查看详情
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

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

export default MusicCards; 