"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { 
  HiPlay, 
  HiPause, 
  HiVolumeUp, 
  HiVolumeOff,
  HiHeart, 
  HiOutlineHeart,
  HiDotsVertical,
  HiTrash,
} from 'react-icons/hi';
import { 
  HiBackward, 
  HiForward, 
  HiMiniQueueList 
} from 'react-icons/hi2';

interface Song {
  id: string;
  title: string;
  duration: string;
  album?: string;
  cover?: string;
  externalUrl?: string;
}

interface MusicPlayerProps {
  currentSong: Song | null;
  playlist: Song[];
  setPlaylist: React.Dispatch<React.SetStateAction<Song[]>>;
  favorites: Song[];
  onPlay: (song: Song) => void;
  onAddToFavorites: (song: Song) => void;
  onRemoveFromFavorites: (songId: string) => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  currentSong,
  playlist,
  setPlaylist,
  favorites,
  onPlay,
  onAddToFavorites,
  onRemoveFromFavorites
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [activeTab, setActiveTab] = useState<'playlist' | 'favorites'>('playlist');
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  
  // 模拟从外部音乐库获取URL
  const getExternalAudioUrl = (song: Song | null) => {
    // 实际项目中，这里应该是从API获取真实的音频URL
    // 这里用一个示例音频作为替代
    return song?.externalUrl ? 
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20(1)-WBaaqUWM8OrFK7H8xr5UBLzBHG7ibZ.mp3" : 
      "";
  };
  
  useEffect(() => {
    if (!audioRef.current) return;
    
    const audio = audioRef.current;
    
    if (currentSong) {
      audio.src = getExternalAudioUrl(currentSong);
      audio.load();
      if (isPlaying) {
        audio.play().catch(err => console.error("播放失败:", err));
      }
    }
    
    // 音频事件监听
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      // 播放下一首
      const currentIndex = playlist.findIndex(song => song.id === currentSong?.id);
      if (currentIndex !== -1 && currentIndex < playlist.length - 1) {
        onPlay(playlist[currentIndex + 1]);
      } else {
        setIsPlaying(false);
      }
    };
    
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSong, isPlaying, onPlay, playlist]);
  
  useEffect(() => {
    if (!audioRef.current) return;
    
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);
  
  const togglePlay = () => {
    if (!audioRef.current || !currentSong) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.error("播放失败:", err));
    }
    
    setIsPlaying(!isPlaying);
  };
  
  const handleProgressChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !audioRef.current) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    
    if (pos >= 0 && pos <= 1) {
      const newTime = pos * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const playPrevious = () => {
    const currentIndex = playlist.findIndex(song => song.id === currentSong?.id);
    if (currentIndex > 0) {
      onPlay(playlist[currentIndex - 1]);
    }
  };
  
  const playNext = () => {
    const currentIndex = playlist.findIndex(song => song.id === currentSong?.id);
    if (currentIndex !== -1 && currentIndex < playlist.length - 1) {
      onPlay(playlist[currentIndex + 1]);
    }
  };
  
  const removeFromPlaylist = (songId: string) => {
    setPlaylist(playlist.filter(song => song.id !== songId));
  };
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  const isInFavorites = (songId: string) => {
    return favorites.some(song => song.id === songId);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
      {/* 音频元素 */}
      <audio ref={audioRef} />
      
      <div className="p-6">
        {/* 当前播放 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {currentSong ? (
              <>
                <div className="relative h-16 w-16 rounded-md overflow-hidden">
                  <Image
                    src={currentSong.cover || "https://via.placeholder.com/150"}
                    alt={currentSong.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold">{currentSong.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{currentSong.album}</p>
                </div>
              </>
            ) : (
              <div className="text-gray-500 dark:text-gray-400">未选择歌曲</div>
            )}
          </div>
          
          {currentSong && (
            <button
              onClick={() => {
                if (isInFavorites(currentSong.id)) {
                  onRemoveFromFavorites(currentSong.id);
                } else {
                  onAddToFavorites(currentSong);
                }
              }}
              className={`p-2 ${
                isInFavorites(currentSong.id) 
                  ? 'text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400' 
                  : 'text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-500'
              }`}
            >
              {isInFavorites(currentSong.id) ? (
                <HiHeart className="h-6 w-6" />
              ) : (
                <HiOutlineHeart className="h-6 w-6" />
              )}
            </button>
          )}
        </div>
        
        {/* 进度条 */}
        <div className="mt-6 mb-2">
          <div 
            ref={progressRef}
            className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden cursor-pointer"
            onClick={handleProgressChange}
          >
            <div 
              className="h-full bg-blue-600 dark:bg-blue-500"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        
        {/* 控制按钮 */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={playPrevious}
              className="p-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white disabled:opacity-50"
              disabled={!currentSong || playlist.length <= 1}
            >
              <HiBackward className="h-6 w-6" />
            </button>
            
            <button 
              onClick={togglePlay}
              className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
              disabled={!currentSong}
            >
              {isPlaying ? (
                <HiPause className="h-6 w-6" />
              ) : (
                <HiPlay className="h-6 w-6" />
              )}
            </button>
            
            <button 
              onClick={playNext}
              className="p-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white disabled:opacity-50"
              disabled={!currentSong || playlist.findIndex(song => song.id === currentSong?.id) === playlist.length - 1}
            >
              <HiForward className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleMute}
              className="p-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              {isMuted || volume === 0 ? (
                <HiVolumeOff className="h-5 w-5" />
              ) : (
                <HiVolumeUp className="h-5 w-5" />
              )}
            </button>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-2 accent-blue-600"
            />
            
            <button 
              onClick={() => setShowPlaylist(!showPlaylist)}
              className={`p-2 ${showPlaylist ? 'text-blue-600' : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'}`}
            >
              <HiMiniQueueList className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* 播放列表和收藏 */}
      {showPlaylist && (
        <div className="border-t border-gray-200 dark:border-gray-700">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              className={`px-4 py-2 text-sm font-medium ${activeTab === 'playlist' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
              onClick={() => setActiveTab('playlist')}
            >
              播放列表 ({playlist.length})
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${activeTab === 'favorites' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
              onClick={() => setActiveTab('favorites')}
            >
              我的收藏 ({favorites.length})
            </button>
          </div>
          
          <div className="max-h-64 overflow-y-auto">
            {activeTab === 'playlist' ? (
              playlist.length > 0 ? (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {playlist.map((song) => (
                    <li key={song.id} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => onPlay(song)}
                          className={`p-1 ${currentSong?.id === song.id ? 'text-blue-600' : 'text-gray-700 dark:text-gray-300'}`}
                        >
                          {currentSong?.id === song.id && isPlaying ? (
                            <HiPause className="h-5 w-5" />
                          ) : (
                            <HiPlay className="h-5 w-5" />
                          )}
                        </button>
                        <div>
                          <p className={`font-medium ${currentSong?.id === song.id ? 'text-blue-600' : ''}`}>{song.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{song.album}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 dark:text-gray-400 mr-3">{song.duration}</span>
                        <button
                          onClick={() => removeFromPlaylist(song.id)}
                          className="p-1 text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-500"
                        >
                          <HiTrash className="h-4 w-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  播放列表为空
                </div>
              )
            ) : (
              favorites.length > 0 ? (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {favorites.map((song) => (
                    <li key={song.id} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => onPlay(song)}
                          className="p-1 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500"
                        >
                          <HiPlay className="h-5 w-5" />
                        </button>
                        <div>
                          <p className="font-medium">{song.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{song.album}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 dark:text-gray-400 mr-3">{song.duration}</span>
                        <button
                          onClick={() => onRemoveFromFavorites(song.id)}
                          className="p-1 text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400"
                        >
                          <HiTrash className="h-4 w-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  还没有收藏歌曲
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer; 