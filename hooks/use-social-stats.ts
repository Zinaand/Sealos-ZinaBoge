import { useState, useEffect } from 'react';

type SocialMediaStats = {
  bilibili: {
    followers: number;
    views: number;
    videos: number;
    error?: string;
  };
  douyin: {
    followers: number;
    likes: number;
    error?: string;
  };
  xiaohongshu: {
    followers: number;
    notes: number;
    error?: string;
  };
  zhihu: {
    followers: number;
    answers: number;
  };
  weibo: {
    followers: number;
    posts: number;
  };
  twitter: {
    followers: number;
    tweets: number;
  };
};

export function useSocialStats() {
  const [stats, setStats] = useState<SocialMediaStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSocialStats() {
      try {
        setLoading(true);
        const response = await fetch('/api/social-stats');
        
        if (!response.ok) {
          throw new Error(`API返回错误: ${response.status}`);
        }
        
        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error('获取社交媒体数据失败:', err);
        setError(err instanceof Error ? err.message : '获取数据失败');
      } finally {
        setLoading(false);
      }
    }

    fetchSocialStats();
  }, []);

  // 手动刷新数据的函数
  const refreshStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/social-stats');
      
      if (!response.ok) {
        throw new Error(`API返回错误: ${response.status}`);
      }
      
      const data = await response.json();
      setStats(data);
      setError(null);
    } catch (err) {
      console.error('刷新社交媒体数据失败:', err);
      setError(err instanceof Error ? err.message : '刷新数据失败');
    } finally {
      setLoading(false);
    }
  };

  return { stats, loading, error, refreshStats };
} 