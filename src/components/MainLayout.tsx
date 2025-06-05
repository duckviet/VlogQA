// MainLayout.tsx
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ChatSidebar from './ChatSidebar';
import { ChatHistory } from '../types';
import { getChatHistories, deleteChatHistory, convertToChatHistory } from '../services/chatHistoryService';

const MainLayout: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([]);
  const location = useLocation();

  useEffect(() => {
    // Load chat histories from localStorage
    const sessions = getChatHistories();
    const histories = sessions.map(convertToChatHistory);
    setChatHistories(histories);
  }, []);

  const handleDeleteHistory = (historyId: string) => {
    const updatedHistories = deleteChatHistory(historyId);
    setChatHistories(updatedHistories.map(convertToChatHistory));
  };

  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev);
  };

  // Get current video ID from URL
  const currentVideoId = location.pathname.split('/').pop() || '';

  return (
    <div className="flex h-full">
      {/* Sidebar container */}
      <div 
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out z-10 ${
          isCollapsed ? 'w-12' : 'w-80'
        }`}
      >
        {/* Toggle button */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-4 bg-white rounded-full p-1 shadow-md border border-neutral-200 hover:bg-neutral-50 transition-colors z-20"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transform transition-transform duration-300 ${
              isCollapsed ? '' : 'rotate-180'
            }`}
          >
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>
        
        {/* Sidebar content */}
        <ChatSidebar
          histories={chatHistories}
          currentVideoId={currentVideoId}
          onDeleteHistory={handleDeleteHistory}
          isCollapsed={isCollapsed}
        />
      </div>

      {/* Main content */}
      <div 
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'ml-12' : 'ml-80'
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;