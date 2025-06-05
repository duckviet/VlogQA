import { VIDEO_IDS } from '../data/videos';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = import.meta.env.VITE_YOUTUBE_LEAP_BASE_URL;

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  viewCount: string;
  publishedAt: string;
  description: string;
}

export const fetchVideoDetails = async (videoId: string): Promise<YouTubeVideo> => {
  const response = await fetch(
    `${BASE_URL}/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`
  );
  const data = await response.json();
  
  if (!data.items?.[0]) {
    throw new Error('Video not found');
  }

  const video = data.items[0];
  return {
    id: video.id,
    title: video.snippet.title,
    thumbnail: video.snippet.thumbnails.high.url,
    channelTitle: video.snippet.channelTitle,
    viewCount: video.statistics.viewCount,
    publishedAt: video.snippet.publishedAt,
    description: video.snippet.description
  };
};

export const fetchVideosBatch = async (startIndex: number, batchSize: number): Promise<YouTubeVideo[]> => {
  const endIndex = Math.min(startIndex + batchSize, VIDEO_IDS.length);
  const batchIds = VIDEO_IDS.slice(startIndex, endIndex);
  
  const response = await fetch(
    `${BASE_URL}/videos?part=snippet,statistics&id=${batchIds.join(',')}&key=${API_KEY}`
  );
  const data = await response.json();
  
  return data.items.map((video: any) => ({
    id: video.id,
    title: video.snippet.title,
    thumbnail: video.snippet.thumbnails.high.url,
    channelTitle: video.snippet.channelTitle,
    viewCount: video.statistics.viewCount,
    publishedAt: video.snippet.publishedAt,
    description: video.snippet.description
  }));
}; 