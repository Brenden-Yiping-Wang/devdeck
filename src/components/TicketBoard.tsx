import React from 'react';
import { 
  DndContext, 
  DragEndEvent, 
  DragOverlay,
  DragStartEvent,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { Ticket } from '../types';
import DroppableColumn from './DroppableColumn';
import DraggableTicketCard from './DraggableTicketCard';
import { ListTodo, PlayCircle, CheckCircle, Sparkles } from 'lucide-react';

interface TicketBoardProps {
  tickets: Ticket[];
  onStatusChange: (ticketId: string, status: Ticket['status']) => void;
  onGenerateClick: () => void;
}

export default function TicketBoard({ tickets, onStatusChange, onGenerateClick }: TicketBoardProps) {
  const [activeTicket, setActiveTicket] = React.useState<Ticket | null>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const columns = [
    { id: 'todo', status: 'todo' as const, title: 'To Do', icon: ListTodo, color: 'text-gray-600' },
    { id: 'in-progress', status: 'in-progress' as const, title: 'In Progress', icon: PlayCircle, color: 'text-blue-600' },
    { id: 'done', status: 'done' as const, title: 'Done', icon: CheckCircle, color: 'text-green-600' },
  ];

  const handleDragStart = (event: DragStartEvent) => {
    const ticket = tickets.find(t => t.id === event.active.id);
    setActiveTicket(ticket || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTicket(null);
    const { active, over } = event;
    
    if (!over) return;
    
    const ticketId = active.id as string;
    const ticket = tickets.find(t => t.id === ticketId);
    if (!ticket) return;
    
    let newStatus: Ticket['status'];
    
    // Check if dropped directly on a column
    if (over.id === 'todo' || over.id === 'in-progress' || over.id === 'done') {
      newStatus = over.id as Ticket['status'];
    } else {
      // If dropped on a ticket, move to that ticket's column
      const targetTicket = tickets.find(t => t.id === over.id);
      if (targetTicket) {
        newStatus = targetTicket.status;
      } else {
        return;
      }
    }
    
    // Update status if it changed
    if (ticket.status !== newStatus) {
      onStatusChange(ticketId, newStatus);
    }
  };

  if (tickets.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="text-gray-400 mb-6">
            <ListTodo className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No tickets yet</h3>
          <p className="text-gray-500 mb-6">Get started by generating tickets with AI. Describe your project idea and let our AI break it down into manageable tasks.</p>
          <button
            onClick={onGenerateClick}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 mx-auto"
          >
            <Sparkles className="h-4 w-4" />
            <span>Generate Your First Tickets</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter} 
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {columns.map((column) => {
            const columnTickets = tickets.filter(ticket => ticket.status === column.status);
            
            return (
              <DroppableColumn
                key={column.id}
                id={column.id}
                title={column.title}
                icon={column.icon}
                color={column.color}
                tickets={columnTickets}
                onStatusChange={onStatusChange}
              />
            );
          })}
        </div>
      </div>
      <DragOverlay>
        {activeTicket ? (
          <div className="transform rotate-6 scale-105">
            <DraggableTicketCard
              ticket={activeTicket}
              onStatusChange={onStatusChange}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}