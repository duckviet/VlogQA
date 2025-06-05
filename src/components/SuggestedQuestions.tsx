import React from 'react';
import { SuggestedQuestion } from '../types';
import { HelpCircle } from 'lucide-react';

interface SuggestedQuestionsProps {
  questions: SuggestedQuestion[];
  onQuestionClick: (question: SuggestedQuestion) => void;
}

const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({ 
  questions, 
  onQuestionClick 
}) => {
  if (questions.length === 0) return null;

  return (
    <div className="mb-3">
      <div className="flex items-center mb-2">
        <HelpCircle className="w-4 h-4 text-primary-600 mr-1" />
        <span className="text-sm text-neutral-600 font-medium">Câu hỏi gợi ý:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {questions.map((question) => (
          <button
            key={question.id}
            onClick={() => onQuestionClick(question)}
            className="text-sm bg-neutral-100 hover:bg-neutral-200 text-neutral-700 py-1.5 px-3 rounded-full transition-colors flex items-center"
          >
            {question.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions;