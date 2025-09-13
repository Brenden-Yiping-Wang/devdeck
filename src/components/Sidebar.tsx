import React from 'react';
import { LayoutGrid } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
            <LayoutGrid className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">DevDeck</h1>
            <p className="text-xs text-gray-500">AI Project Management</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg flex items-center space-x-3 font-medium">
            <LayoutGrid className="h-4 w-4" />
            <span>Board</span>
          </div>
        </div>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-2 rounded-lg text-xs font-medium text-center">
          MVP Version
        </div>
      </div>
    </div>
  );
}