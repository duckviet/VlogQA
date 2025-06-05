import React from 'react';
import { Link } from 'react-router-dom';
import type { YouTubeVideo } from '../services/youtubeService';

interface VideoCardProps {
  video: YouTubeVideo;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
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
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hôm nay';
    if (diffDays === 1) return 'Hôm qua';
    if (diffDays < 7) return `${diffDays} ngày trước`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} tuần trước`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} tháng trước`;
    return `${Math.floor(diffDays / 365)} năm trước`;
  };

  return (
    <Link to={`/video/${video.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative pb-[56.25%]">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-neutral-800 line-clamp-2 mb-2">
            {video.title}
          </h3>
          <p className="text-sm text-neutral-600 mb-1">{video.channelTitle}</p>
          <div className="flex text-sm text-neutral-500">
            <span>{formatViews(video.viewCount)} lượt xem</span>
            <span className="mx-2">•</span>
            <span>{formatDate(video.publishedAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;