import React from 'react';
import { Video } from '../types';

interface VideoPlayerProps {
  video: Video;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
  return (
    <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg mb-4">
      {/* In a real implementation, this would be an actual video player */}
      {/* For now, we'll use a placeholder with the thumbnail */}
      <div className="relative w-full h-full">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <button 
            className="w-16 h-16 bg-primary-600 bg-opacity-90 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors"
            aria-label="Play video"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="white" 
              className="w-8 h-8"
              style={{ marginLeft: '2px' }}
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;