import React from 'react';
import { Sparkles, Plus } from 'lucide-react';

interface BoardHeaderProps {
  onGenerateClick: () => void;
  currentProject: string | null;
  showGenerateButton?: boolean;
}

export default function BoardHeader({ onGenerateClick, currentProject, showGenerateButton = true }: BoardHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Board</h1>
          {currentProject && (
            <p className="text-sm text-gray-600 mt-1">Project: {currentProject}</p>
          )}
        </div>

        {showGenerateButton && (
          <button
            onClick={onGenerateClick}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-sm"
          >
            <Sparkles className="h-4 w-4" />
            <span>AI Generate</span>
          </button>
        )}
      </div>
    </div>
  );
}