import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import mysql from 'mysql2/promise';

// 数据库连接配置
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'music_db',
};

// 创建数据库连接池
const pool = mysql.createPool(dbConfig);

// 初始化数据库表
async function initDatabase() {
  try {
    const connection = await pool.getConnection();
    
    // 创建favorites表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS favorites (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(255),
        song_id VARCHAR(255) NOT NULL,
        song_title VARCHAR(255) NOT NULL,
        song_album VARCHAR(255),
        song_duration VARCHAR(255),
        song_cover TEXT,
        external_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX (user_id, song_id)
      )
    `);
    
    // 创建playlists表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS playlists (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(255),
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX (user_id)
      )
    `);
    
    // 创建playlist_songs表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS playlist_songs (
        id VARCHAR(36) PRIMARY KEY,
        playlist_id VARCHAR(36) NOT NULL,
        song_id VARCHAR(255) NOT NULL,
        song_title VARCHAR(255) NOT NULL,
        song_album VARCHAR(255),
        song_duration VARCHAR(255),
        song_cover TEXT,
        external_url TEXT,
        position INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX (playlist_id),
        FOREIGN KEY (playlist_id) REFERENCES playlists(id) ON DELETE CASCADE
      )
    `);
    
    connection.release();
  } catch (error) {
    console.error('数据库初始化失败:', error);
  }
}

// 在生产环境中启动时初始化数据库
if (process.env.NODE_ENV === 'production') {
  initDatabase().catch(console.error);
}

// GET /api/favorites - 获取收藏的歌曲
export async function GET(request: NextRequest) {
  try {
    // 这里应该有用户认证逻辑，获取用户ID
    const userId = 'default-user'; // 示例用户ID
    
    const [rows] = await pool.execute(
      'SELECT * FROM favorites WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    
    return NextResponse.json(rows);
  } catch (error) {
    console.error('获取收藏歌曲失败:', error);
    return NextResponse.json({ error: '获取收藏失败' }, { status: 500 });
  }
}

// POST /api/favorites - 添加歌曲到收藏
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 这里应该有用户认证逻辑，获取用户ID
    const userId = 'default-user'; // 示例用户ID
    
    const { id, title, album, duration, cover, externalUrl } = body;
    
    // 检查歌曲是否已收藏
    const [existing] = await pool.execute(
      'SELECT * FROM favorites WHERE user_id = ? AND song_id = ?',
      [userId, id]
    );
    
    if ((existing as any[]).length > 0) {
      return NextResponse.json({ message: '歌曲已收藏' });
    }
    
    // 插入新收藏
    await pool.execute(
      `INSERT INTO favorites 
        (id, user_id, song_id, song_title, song_album, song_duration, song_cover, external_url) 
       VALUES 
        (UUID(), ?, ?, ?, ?, ?, ?, ?)`,
      [userId, id, title, album || '', duration || '', cover || '', externalUrl || '']
    );
    
    return NextResponse.json({ message: '添加到收藏成功' });
  } catch (error) {
    console.error('添加收藏失败:', error);
    return NextResponse.json({ error: '添加收藏失败' }, { status: 500 });
  }
}

// DELETE /api/favorites/:id - 从收藏中删除歌曲
export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const songId = url.pathname.split('/').pop();
    
    if (!songId) {
      return NextResponse.json({ error: '歌曲ID不能为空' }, { status: 400 });
    }
    
    // 这里应该有用户认证逻辑，获取用户ID
    const userId = 'default-user'; // 示例用户ID
    
    await pool.execute(
      'DELETE FROM favorites WHERE user_id = ? AND song_id = ?',
      [userId, songId]
    );
    
    return NextResponse.json({ message: '从收藏中移除成功' });
  } catch (error) {
    console.error('移除收藏失败:', error);
    return NextResponse.json({ error: '移除收藏失败' }, { status: 500 });
  }
} 