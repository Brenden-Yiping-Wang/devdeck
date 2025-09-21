import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDroppable } from '@dnd-kit/core';
import { Clock, AlertCircle, CheckCircle2, Circle } from 'lucide-react';
import { Ticket } from '../types';

interface DraggableTicketCardProps {
  ticket: Ticket;
  onStatusChange: (ticketId: string, status: Ticket['status']) => void;
}

export default function DraggableTicketCard({ ticket, onStatusChange }: DraggableTicketCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: ticket.id });

  // Make the card itself a drop zone that forwards to its column
  const { setNodeRef: setDropRef, isOver: isDropOver } = useDroppable({
    id: `${ticket.status}-drop-zone-${ticket.id}`,
    data: {
      type: 'ticket-drop-zone',
      status: ticket.status,
    },
  });

  // Combine refs
  const combinedRef = (node: HTMLElement | null) => {
    setNodeRef(node);
    setDropRef(node);
  };
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? 'none' : transition || 'transform 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  };

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
    <div
      ref={combinedRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white rounded-lg border border-gray-200 p-4 transition-all duration-200 cursor-grab active:cursor-grabbing ${
        isDragging 
          ? 'opacity-90 shadow-2xl scale-105 rotate-2 z-50 border-blue-300' 
          : `hover:shadow-md hover:scale-[1.02] hover:-translate-y-1 ${
              isDropOver ? 'ring-2 ring-blue-300 bg-blue-50' : ''
            }`
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              const statuses: Ticket['status'][] = ['todo', 'in-progress', 'done'];
              const currentIndex = statuses.indexOf(ticket.status);
              const nextStatus = statuses[(currentIndex + 1) % statuses.length];
              onStatusChange(ticket.id, nextStatus);
            }}
            className={`p-1 rounded-full ${statusColors[ticket.status]} hover:opacity-80 transition-all duration-150 hover:scale-110`}
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