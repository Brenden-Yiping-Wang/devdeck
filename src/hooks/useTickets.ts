import { useState } from 'react';
import { Ticket, ProjectRequest } from '../types';
import { generateTicketsFromRequest } from '../utils/aiTicketGenerator';

export function useTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const [isProcessing, setIsProcessing] = useState(false);
  const [currentProject, setCurrentProject] = useState<ProjectRequest | null>(null);

  const handleRequestSubmit = async (title: string, description: string) => {
    setIsProcessing(true);
    
    const request: ProjectRequest = {
      id: `request-${Date.now()}`,
      title,
      description,
      createdAt: new Date(),
    };
    
    setCurrentProject(request);

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

  return {
    tickets,
    currentProject,
    isProcessing,
    handleRequestSubmit,
    handleStatusChange,
  };
}