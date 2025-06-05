import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import VideoCard from '../components/VideoCard';
import { fetchVideosBatch } from '../services/youtubeService';
import type { YouTubeVideo } from '../services/youtubeService';
import { useSearch } from '../contexts/SearchContext';

const BATCH_SIZE = 12;

const HomePage: React.FC = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { searchQuery } = useSearch();

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const loadVideos = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const newVideos = await fetchVideosBatch(videos.length, BATCH_SIZE);
      
      if (newVideos.length === 0) {
        setHasMore(false);
        return;
      }

      // Filter out any videos that already exist in the state
      const existingIds = new Set(videos.map(v => v.id));
      const uniqueNewVideos = newVideos.filter(video => !existingIds.has(video.id));

      if (uniqueNewVideos.length === 0) {
        setHasMore(false);
        return;
      }

      setVideos(prev => [...prev, ...uniqueNewVideos]);
    } catch (err) {
      setError('Failed to load videos. Please try again later.');
      console.error('Error loading videos:', err);
    } finally {
      setLoading(false);
    }
  }, [videos, loading, hasMore]);

  useEffect(() => {
    if (inView) {
      loadVideos();
    }
  }, [inView, loadVideos]);

  // Filter videos based on search query
  const filteredVideos = useMemo(() => {
    if (!searchQuery.trim()) return videos;

    const query = searchQuery.toLowerCase().trim();
    return videos.filter(video => 
      video.title.toLowerCase().includes(query) ||
      video.channelTitle.toLowerCase().includes(query)
    );
  }, [videos, searchQuery]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => setError(null)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-neutral-800 mb-6">Khám phá các Vlog</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      {/* Loading indicator */}
      <div ref={ref} className="h-20 flex items-center justify-center">
        {loading && (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        )}
      </div>

      {/* No results message */}
      {searchQuery && filteredVideos.length === 0 && (
        <p className="text-center text-neutral-600 mt-4">
          Không tìm thấy kết quả nào cho "{searchQuery}"
        </p>
      )}

      {/* No more videos message */}
      {!hasMore && videos.length > 0 && !searchQuery && (
        <p className="text-center text-neutral-600 mt-4">
          Không còn video nào để hiển thị
        </p>
      )}
    </div>
  );
};

export default HomePage;