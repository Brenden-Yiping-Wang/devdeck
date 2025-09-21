import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Ticket } from '../types';
import DraggableTicketCard from './DraggableTicketCard';

interface DroppableColumnProps {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  tickets: Ticket[];
  onStatusChange: (ticketId: string, status: Ticket['status']) => void;
}

export default function DroppableColumn({ 
  id, 
  title, 
  icon: Icon, 
  color, 
  tickets, 
  onStatusChange 
}: DroppableColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div 
      ref={setNodeRef}
      className={`bg-gray-50 rounded-xl p-4 flex flex-col transition-all duration-300 ease-out min-h-[400px] ${
        isOver ? 'bg-gradient-to-br from-blue-50 to-indigo-50 ring-2 ring-blue-300 shadow-lg scale-[1.02]' : 'hover:bg-gray-100'
      }`}
    >
      <div className="flex items-center space-x-2 mb-4">
        <Icon className={`h-5 w-5 ${color}`} />
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full transition-colors duration-200 ${
          isOver ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 text-gray-700'
        }`}>
          {tickets.length}
        </span>
      </div>
      
      <div className={`space-y-3 flex-1 transition-all duration-300 ${
        isOver ? 'scale-[1.01]' : ''
      }`}>
        <SortableContext items={tickets.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tickets.map((ticket) => (
            <DraggableTicketCard
              key={ticket.id}
              ticket={ticket}
              onStatusChange={onStatusChange}
            />
          ))}
        </SortableContext>
        
        {tickets.length === 0 && (
          <div className={`text-center py-8 transition-all duration-300 ${
            isOver ? 'text-blue-600 scale-105' : 'text-gray-500'
          }`}>
            <p className="text-sm font-medium">
              {isOver ? 'Release to drop here' : 'Drop tickets here'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}