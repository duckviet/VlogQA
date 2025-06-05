import { ChatHistory } from '../types';

const STORAGE_KEY = 'chat_histories';

export interface ChatMessage {
  id: string;
  content: string;
  timestamp: number;
  isUser: boolean;
}

export interface ChatSession {
  id: string;
  videoId: string;
  videoTitle: string;
  messages: ChatMessage[];
  lastUpdated: number;
}

export const getChatHistories = (): ChatSession[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading chat histories:', error);
    return [];
  }
};

export const saveChatHistories = (histories: ChatSession[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(histories));
  } catch (error) {
    console.error('Error saving chat histories:', error);
  }
};

export const addChatMessage = (videoId: string, videoTitle: string, message: ChatMessage) => {
  const histories = getChatHistories();
  const existingSession = histories.find(h => h.videoId === videoId);

  if (existingSession) {
    existingSession.messages.push(message);
    existingSession.lastUpdated = Date.now();
  } else {
    histories.push({
      id: Date.now().toString(),
      videoId,
      videoTitle,
      messages: [message],
      lastUpdated: Date.now()
    });
  }

  saveChatHistories(histories);
  return histories;
};

export const deleteChatHistory = (sessionId: string) => {
  const histories = getChatHistories();
  const updatedHistories = histories.filter(h => h.id !== sessionId);
  saveChatHistories(updatedHistories);
  return updatedHistories;
};

export const getChatHistoryForVideo = (videoId: string): ChatSession | undefined => {
  const histories = getChatHistories();
  return histories.find(h => h.videoId === videoId);
};

// Convert ChatSession to ChatHistory for the sidebar
export const convertToChatHistory = (session: ChatSession): ChatHistory => {
  const lastMessage = session.messages[session.messages.length - 1];
  return {
    id: session.id,
    videoId: session.videoId,
    videoTitle: session.videoTitle,
    timestamp: session.lastUpdated,
    lastMessage: lastMessage ? lastMessage.content : ''
  };
}; 