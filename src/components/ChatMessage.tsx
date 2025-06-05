import React from 'react';
import { Message } from '../types';
import clsx from 'clsx';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={clsx(
      'flex animate-slide-up',
      isUser ? 'justify-end' : 'justify-start'
    )}>
      <div className={clsx(
        'py-2 px-4 rounded-2xl max-w-[80%]',
        isUser ? 'bg-primary-600 text-white' : 'bg-neutral-100 text-neutral-800'
      )}>
        <p>{message.content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;