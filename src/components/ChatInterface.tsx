import React, { useState, useEffect, useRef } from 'react';
import { Send, Loader2 } from 'lucide-react'; // Import Loader2 for a spinning loader
import { ChatMessage, addChatMessage, getChatHistoryForVideo } from '../services/chatHistoryService';

interface ChatInterfaceProps {
  videoId: string;
  videoTitle: string;
}

const getBaseUrl = () => {
  return localStorage.getItem('BASE_URL') || import.meta.env.VITE_BACKEND_BASE_URL;
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({ videoId, videoTitle }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load existing chat history for this video
    const history = getChatHistoryForVideo(videoId);
    if (history) {
      setMessages(history.messages);
    }
  }, [videoId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      timestamp: Date.now(),
      isUser: true
    };

    // Add user message
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsLoading(true); 

    // Save to localStorage
    addChatMessage(videoId, videoTitle, newMessage);

    try {
      const response = await fetch(
        `${getBaseUrl()}/query`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: videoId,
            question: newMessage.content
          })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to get response from server');
      }

      const data = await response.json();
      console.log(data);

      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: data?.answer || 'Không có thông tin. Vui lòng đặt câu hỏi khác',
        timestamp: Date.now(),
        isUser: false
      };

      setMessages(prev => [...prev, aiResponse]);
      addChatMessage(videoId, videoTitle, aiResponse);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "Đã xảy ra lỗi khi tải phản hồi. Vui lòng thử lại.",
        timestamp: Date.now(),
        isUser: false
      };
      setMessages(prev => [...prev, errorMessage]);
      addChatMessage(videoId, videoTitle, errorMessage);
    } finally {
      setIsLoading(false); // Set loading to false after response (or error)
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[700px] bg-white border rounded-lg border-neutral-200">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 && !isLoading ? (
          <div className="h-full flex items-center justify-center text-neutral-500">
            <p>Bắt đầu cuộc trò chuyện về video này</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.isUser
                      ? 'bg-primary-600 text-white'
                      : 'bg-neutral-100 text-neutral-800'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-neutral-100 text-neutral-800 flex items-center space-x-2">
                  <Loader2 size={20} className="animate-spin" />
                  <p className="text-sm">Đang nhập...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t border-neutral-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Nhập câu hỏi của bạn..."
            className="flex-1 px-4 py-2 rounded-full border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            disabled={isLoading} // Disable input while loading
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading} // Disable button while loading or no input
            className="p-2 rounded-full bg-primary-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-700 transition-colors"
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;