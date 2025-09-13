import React from 'react';
import { Clock, AlertCircle, CheckCircle2, Circle } from 'lucide-react';
import { Ticket } from '../types';

interface TicketCardProps {
  ticket: Ticket;
  onStatusChange: (ticketId: string, status: Ticket['status']) => void;
}

export default function TicketCard({ ticket, onStatusChange }: TicketCardProps) {
  const statusIcons = {
    'todo': Circle,
    'in-progress': AlertCircle,
    'done': CheckCircle2,
  };

  const statusColors = {
    'todo': 'text-gray-500 bg-gray-100',
    'in-progress': 'text-blue-600 bg-blue-100',
    'done': 'text-green-600 bg-green-100',
  };

  const priorityColors = {
    'low': 'bg-green-100 text-green-800',
    'medium': 'bg-yellow-100 text-yellow-800',
    'high': 'bg-red-100 text-red-800',
  };

  const StatusIcon = statusIcons[ticket.status];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              const statuses: Ticket['status'][] = ['todo', 'in-progress', 'done'];
              const currentIndex = statuses.indexOf(ticket.status);
              const nextStatus = statuses[(currentIndex + 1) % statuses.length];
              onStatusChange(ticket.id, nextStatus);
            }}
            className={`p-1 rounded-full ${statusColors[ticket.status]} hover:opacity-80 transition-opacity`}
          >
            <StatusIcon className="h-4 w-4" />
          </button>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[ticket.priority]}`}>
            {ticket.priority}
          </span>
        </div>
      </div>
      
      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{ticket.title}</h3>
      <p className="text-gray-600 text-sm mb-3 line-clamp-3">{ticket.description}</p>
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-1">
          <Clock className="h-3 w-3" />
          <span>{ticket.estimatedHours}h</span>
        </div>
        <span className="capitalize">{ticket.status.replace('-', ' ')}</span>
      </div>
    </div>
  );
}