import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutGrid } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col flex-shrink-0">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <img 
              src="/logo.png" 
              alt="DevDeck Logo" 
              className="h-16 w-16 rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">DevDeck</h1>
            <p className="text-xs text-gray-500">AI Project Management</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          <NavLink
            to="/board"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg flex items-center space-x-3 font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            <LayoutGrid className="h-4 w-4" />
            <span>Board</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}