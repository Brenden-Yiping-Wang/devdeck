import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutGrid, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Sidebar() {
  const { logout, user } = useAuth();

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
            <p className="text-sm text-gray-500">AI Product copilot</p>
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

      <div className="p-4 border-t border-gray-200">
        {user && (
          <div className="mb-3 px-3">
            <p className="text-sm font-medium text-gray-900">{user.name || user.email}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        )}
        <button
          onClick={logout}
          className="w-full px-3 py-2 rounded-lg flex items-center space-x-3 font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}