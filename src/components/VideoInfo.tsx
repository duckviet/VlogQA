import React from 'react';
import type { YouTubeVideo } from '../services/youtubeService';

interface VideoInfoProps {
  video: YouTubeVideo;
}

const VideoInfo: React.FC<VideoInfoProps> = ({ video }) => {
  const formatViews = (views: string) => {
    const num = parseInt(views);
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="mt-4">
      <h1 className="text-2xl font-bold text-neutral-800 mb-2">{video.title}</h1>
      
      <div className="flex items-center justify-between mb-4 mt-4">
        <div className="flex items-center justify-between w-full">
          <div className='flex gap-2 items-center'>
            <div className='rounded-full bg-gray-400 h-5 w-5 '></div>
            <h3 className="font-semibold text-neutral-800 ">{video.channelTitle}</h3>
          </div>
          <div className='space-x-4'> 
            <span className="text-neutral-600">{formatViews(video.viewCount)} lượt xem</span>
            <span className="text-neutral-600">{formatDate(video.publishedAt)}</span>
          </div>
        </div>
      </div>

       
    </div>
  );
};

export default VideoInfo;