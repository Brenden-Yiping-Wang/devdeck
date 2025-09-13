import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import BoardHeader from './components/BoardHeader';
import AIGenerateModal from './components/AIGenerateModal';
import TicketBoard from './components/TicketBoard';
import { Ticket, ProjectRequest } from './types';
import { generateTicketsFromRequest } from './utils/aiTicketGenerator';

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 'ticket-1',
      title: 'Set up project authentication system',
      description: 'Implement user login, registration, and JWT token management for secure access control.',
      status: 'todo',
      priority: 'high',
      estimatedHours: 8,
      createdAt: new Date('2024-01-15'),
    },
    {
      id: 'ticket-2',
      title: 'Design responsive dashboard layout',
      description: 'Create a modern, mobile-first dashboard with sidebar navigation and main content area.',
      status: 'in-progress',
      priority: 'high',
      estimatedHours: 6,
      createdAt: new Date('2024-01-14'),
    },
    {
      id: 'ticket-3',
      title: 'Implement user profile management',
      description: 'Allow users to update their profile information, change passwords, and manage account settings.',
      status: 'todo',
      priority: 'medium',
      estimatedHours: 4,
      createdAt: new Date('2024-01-13'),
    },
    {
      id: 'ticket-4',
      title: 'Add data export functionality',
      description: 'Enable users to export their data in CSV and PDF formats with filtering options.',
      status: 'done',
      priority: 'low',
      estimatedHours: 3,
      createdAt: new Date('2024-01-12'),
    },
    {
      id: 'ticket-5',
      title: 'Optimize database queries',
      description: 'Review and optimize slow database queries to improve application performance.',
      status: 'in-progress',
      priority: 'medium',
      estimatedHours: 5,
      createdAt: new Date('2024-01-11'),
    },
    {
      id: 'ticket-6',
      title: 'Write comprehensive unit tests',
      description: 'Create unit tests for all core components and utilities to ensure code reliability.',
      status: 'todo',
      priority: 'medium',
      estimatedHours: 12,
      createdAt: new Date('2024-01-10'),
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<ProjectRequest | null>({
    id: 'demo-project',
    title: 'SaaS Dashboard Application',
    description: 'A modern web application with user management and analytics',
    createdAt: new Date('2024-01-15'),
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRequestSubmit = async (title: string, description: string) => {
    setIsProcessing(true);
    setIsModalOpen(false);
    
    const request: ProjectRequest = {
      id: `request-${Date.now()}`,
      title,
      description,
      createdAt: new Date(),
    };
    
    setCurrentRequest(request);

    try {
      const generatedTickets = await generateTicketsFromRequest(title, description);
      setTickets(prevTickets => [...prevTickets, ...generatedTickets]);
    } catch (error) {
      console.error('Error generating tickets:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStatusChange = (ticketId: string, status: Ticket['status']) => {
    setTickets(prevTickets => 
      prevTickets.map(ticket => 
        ticket.id === ticketId ? { ...ticket, status } : ticket
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <BoardHeader 
          onGenerateClick={() => setIsModalOpen(true)}
          currentProject={currentRequest?.title || null}
        />
        
        <TicketBoard 
          tickets={tickets} 
          onStatusChange={handleStatusChange}
          onGenerateClick={() => setIsModalOpen(true)}
        />
      </div>
      
      <AIGenerateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleRequestSubmit}
        isProcessing={isProcessing}
      />
    </div>
  );
}

export default App;