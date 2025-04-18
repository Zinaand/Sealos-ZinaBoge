import { NextResponse } from 'next/server';

// 各平台API的访问令牌和配置
// 注意：这些敏感信息应该存储在环境变量中
// 实际部署时使用 process.env.BILIBILI_TOKEN 等方式读取
const BILIBILI_USER_ID = '357723429'; // 你的B站UID
const BILIBILI_COOKIE = 'SESSDATA=26812f57%2C1760423358%2C9064b%2A41CjD9QR-tlkTTFfp4AkHSCdVbPhEKyxVkoEs2uvlcKyTTIOREgQ9Pxo-26812f57%2C1760423358%2C9064b%2A41CjD9QR-tlkTTFfp4AkHSCdVbPhEKyxVkoEs2uvlcKyTTIOREgQ9Pxo-99IC9FsHDvSQSVm9rTkRHdkZJai1YWmMwY3d2eUJ6UHBrZ2FZTmw5WUtGQU8zTTRYOEtFeFpzNDdPeDE4NW1ubm45Yi1SSjJZb05TQmw1MWwxZlR0Z21vVU9KeU1CNjB3IIEC;bili_jct=fe73b7b40daaf36bd5a8403b4cf8f0dc'; // 你的B站Cookie

const DOUYIN_ACCESS_TOKEN = ''; // 抖音开放平台的访问令牌
const DOUYIN_OPEN_ID = ''; // 抖音开放平台的开放ID

const XIAOHONGSHU_APP_ID = ''; // 小红书开放平台的App ID
const XIAOHONGSHU_APP_SECRET = ''; // 小红书开放平台的App Secret

// 获取B站数据的函数
async function getBilibiliStats() {
  try {
    // 如果没有提供B站UID，返回默认数据
    if (!BILIBILI_USER_ID) {
      return {
        followers: 2,
        views: 0,
        videos: 0
      };
    }

    const response = await fetch(`https://api.bilibili.com/x/relation/stat?vmid=${BILIBILI_USER_ID}`, {
      headers: {
        Cookie: BILIBILI_COOKIE || '', // Cookie可能需要用于某些API访问
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    const data = await response.json();
    
    // 再获取视频数据
    const videoResponse = await fetch(`https://api.bilibili.com/x/space/arc/search?mid=${BILIBILI_USER_ID}&ps=1&pn=1`, {
      headers: {
        Cookie: BILIBILI_COOKIE || '',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    const videoData = await videoResponse.json();
    
    return {
      followers: data.data?.follower || 0,
      views: 0, // B站API获取总播放量较复杂，需要遍历所有视频
      videos: videoData.data?.page?.count || 0
    };
  } catch (error) {
    console.error('获取B站数据失败:', error);
    return {
      followers: 0,
      views: 0,
      videos: 0,
      error: '获取数据失败'
    };
  }
}

// 获取抖音数据的函数
async function getDouyinStats() {
  try {
    // 如果没有提供抖音令牌，返回默认数据
    if (!DOUYIN_ACCESS_TOKEN || !DOUYIN_OPEN_ID) {
      return {
        followers: 151,
        likes: 
        3447
      };
    }

    // 抖音开放平台API需要OAuth2.0认证
    const response = await fetch(`https://open.douyin.com/oauth/userinfo/?open_id=${DOUYIN_OPEN_ID}&access_token=${DOUYIN_ACCESS_TOKEN}`);
    const data = await response.json();
    
    return {
      followers: data.data?.follower_count || 0,
      likes: data.data?.total_favorited || 0
    };
  } catch (error) {
    console.error('获取抖音数据失败:', error);
    return {
      followers: 0,
      likes: 0,
      error: '获取数据失败'
    };
  }
}

// 获取小红书数据的函数
async function getXiaohongshuStats() {
  try {
    // 如果没有提供小红书凭证，返回默认数据
    if (!XIAOHONGSHU_APP_ID || !XIAOHONGSHU_APP_SECRET) {
      return {
        followers: 2,
        notes: 0
      };
    }

    // 小红书API调用逻辑
    // 注意：小红书目前没有公开API，这里是示例代码
    return {
      followers: 0,
      notes: 0
    };
  } catch (error) {
    console.error('获取小红书数据失败:', error);
    return {
      followers: 0,
      notes: 0,
      error: '获取数据失败'
    };
  }
}

export async function GET() {
  try {
    // 并行获取所有平台数据
    const [bilibiliData, douyinData, xiaohongshuData] = await Promise.all([
      getBilibiliStats(),
      getDouyinStats(),
      getXiaohongshuStats()
    ]);

    return NextResponse.json({
      bilibili: bilibiliData,
      douyin: douyinData,
      xiaohongshu: xiaohongshuData,
      // 可以添加其他平台数据
      zhihu: {
        followers: 10,
        answers: 0
      },
      weibo: {
        followers: 100,
        posts: 1000
      },
      twitter: {
        followers: 472,
        tweets: 1000
      }
    });
  } catch (error) {
    console.error('API错误:', error);
    return NextResponse.json(
      { error: '获取社交媒体统计数据失败' },
      { status: 500 }
    );
  }
} 