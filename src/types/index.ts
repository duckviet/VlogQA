export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channelName: string;
  views: number;
  uploadDate: string;
  description: string;
  videoUrl: string;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: number;
}

export interface SuggestedQuestion {
  id: string;
  text: string;
}

export interface ChatHistory {
  id: string;
  videoId: string;
  videoTitle: string;
  timestamp: number;
  lastMessage: string;
}