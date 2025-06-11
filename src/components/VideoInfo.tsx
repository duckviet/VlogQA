import React, { useState, useEffect } from 'react';
import type { YouTubeVideo } from '../services/youtubeService';
import testData from '../data/test.json';

interface VideoInfoProps {
  video: YouTubeVideo;
}

interface TestContent {
  id: string;
  content: string;
}

const VideoInfo: React.FC<VideoInfoProps> = ({ video }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    const videoContent = (testData as TestContent[]).find(item => item.id === video.id);
    setContent(videoContent?.content || null);
  }, [video.id]);

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

      {content && (
        <div className="mt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="font-medium text-neutral-800">Video Context</span>
            <svg
              className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isExpanded && (
            <div className="mt-2 p-4 bg-gray-50 rounded-lg">
              <p className="text-neutral-700 whitespace-pre-wrap">{content}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoInfo;