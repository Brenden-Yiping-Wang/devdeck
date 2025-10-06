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
    } else if (over.data?.current?.type === 'ticket-drop-zone') {
      // Dropped on a ticket's drop zone
      newStatus = over.data.current.status as Ticket['status'];
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

  const emptyState = tickets.length === 0;

  if (emptyState) {
    return (
      <div className="h-full relative">
        <div className="absolute inset-0 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full blur-sm opacity-30 pointer-events-none">
            {columns.map((column) => (
              <div
                key={column.id}
                className="bg-gray-50 rounded-xl p-4 flex flex-col h-full"
              >
                <div className="flex items-center space-x-2 mb-4 pb-3 border-b border-gray-200">
                  <column.icon className={`h-5 w-5 ${column.color}`} />
                  <h2 className="font-semibold text-gray-900">{column.title}</h2>
                  <span className="ml-auto bg-gray-200 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                    0
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-100 rounded w-full"></div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                    <div className="h-3 bg-gray-100 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="text-center max-w-lg relative z-10">
            <div className="relative mb-8">
              <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-blue-400/20 to-emerald-400/20 rounded-full"></div>
              <div className="relative bg-gradient-to-br from-blue-50 to-emerald-50 rounded-3xl p-12 border-2 border-blue-100">
                <Sparkles className="h-20 w-20 mx-auto text-blue-600 mb-4" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">Start Your First Project</h3>
            <p className="text-lg text-gray-600 mb-8">
              Describe your project idea and our AI will instantly break it down into actionable development tickets.
            </p>
            <button
              onClick={onGenerateClick}
              className="relative group bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-3 hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 mx-auto shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <Sparkles className="h-6 w-6 relative animate-pulse" />
              <span className="relative">Generate Tickets with AI</span>
            </button>
            <p className="text-sm text-gray-500 mt-6">
              Powered by advanced AI to help you plan better
            </p>
          </div>
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
      <div className="h-full p-6 overflow-y-auto">
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