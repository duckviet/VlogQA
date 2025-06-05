import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchVideoDetails } from '../services/youtubeService';
import type { YouTubeVideo } from '../services/youtubeService';
import VideoInfo from '../components/VideoInfo';
import ChatInterface from '../components/ChatInterface';

const VideoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<YouTubeVideo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVideo = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const videoData = await fetchVideoDetails(id);
        setVideo(videoData);
      } catch (err) {
        setError('Failed to load video. Please try again later.');
        console.error('Error loading video:', err);
      } finally {
        setLoading(false);
      }
    };

    loadVideo();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-4 w-32 bg-neutral-200 rounded mb-4"></div>
          <div className="h-80 w-full max-w-4xl bg-neutral-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-neutral-800 mb-4">
          {error || 'Không tìm thấy video'}
        </h2>
        <p className="text-neutral-600">
          {error || 'Video bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.'}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3 animate-fade-in">
          <div className="relative pb-[56.25%] w-full bg-black rounded-lg overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${video.id}`}
              title={video.title}
              className="absolute top-0 left-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <VideoInfo video={video} />
        </div>
        
        <div className="lg:w-1/3 animate-fade-in">
          <ChatInterface videoId={video.id} videoTitle={video.title} />
        </div>
      </div>
    </div>
  );
};

export default VideoPage;