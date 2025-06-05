// ChatSidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ChatHistory } from '../types';
import { Clock, MessageSquare, Trash2 } from 'lucide-react';
import { formatDate } from '../utils/formatters';

interface ChatSidebarProps {
  histories: ChatHistory[];
  currentVideoId?: string | null;
  onDeleteHistory: (id: string) => void;
  isCollapsed: boolean;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  histories,
  currentVideoId,
  onDeleteHistory,
  isCollapsed
}) => {
  if (isCollapsed) {
    return (
      <div className="w-12 h-full flex flex-col items-center py-4">
        <div className='p-4 bg-white  border-neutral-200'>
        {/* <Clock className="w-5 h-5 text-primary-600" /> */}
        </div>
      </div>
    );
  }

  return (
    <div className="w-80  h-full flex flex-col p-4">
      <div className='bg-white border-neutral-200 h-full'>
      <div className="p-4 border-b border-neutral-200">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary-600" />
          <h2 className="font-semibold text-neutral-800">Lịch sử hỏi đáp</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {histories.length === 0 ? (
          <div className="p-4 text-center text-neutral-500">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Chưa có lịch sử hỏi đáp</p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {histories.map((history) => (
              <div
                key={history.id}
                className={`p-3 hover:bg-neutral-50 transition-colors relative group ${
                  history.videoId === currentVideoId ? 'bg-neutral-50' : ''
                }`}
              >
                <Link to={`/video/${history.videoId}`} className="block">
                  <h3 className="font-medium text-sm text-neutral-800 mb-1 line-clamp-2">
                    {history.videoTitle}
                  </h3>
                  <p className="text-xs text-neutral-500 mb-2">
                    {formatDate(new Date(history.timestamp).toISOString())}
                  </p>
                  <p className="text-xs text-neutral-600 line-clamp-2">
                    {history.lastMessage.slice(0,40)}...
                  </p>
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onDeleteHistory(history.id);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1 hover:bg-neutral-100 rounded-full transition-all"
                  title="Xóa lịch sử"
                >
                  <Trash2 className="w-4 h-4 text-neutral-400 hover:text-red-500" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default ChatSidebar;