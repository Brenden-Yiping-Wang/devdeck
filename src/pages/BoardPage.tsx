import React, { useState } from 'react';
import BoardHeader from '../components/BoardHeader';
import TicketBoard from '../components/TicketBoard';
import AIGenerateModal from '../components/AIGenerateModal';
import { useTickets } from '../hooks/useTickets';

export default function BoardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    tickets,
    currentProject,
    isProcessing,
    handleRequestSubmit,
    handleStatusChange,
  } = useTickets();

  const onRequestSubmit = async (title: string, description: string) => {
    setIsModalOpen(false);
    await handleRequestSubmit(title, description);
  };

  return (
    <div className="flex flex-col h-full">
      <BoardHeader 
        onGenerateClick={() => setIsModalOpen(true)}
        currentProject={currentProject?.title || null}
      />
      
      <div className="flex-1 overflow-hidden">
        <TicketBoard 
          tickets={tickets} 
          onStatusChange={handleStatusChange}
          onGenerateClick={() => setIsModalOpen(true)}
        />
      </div>
      
      <AIGenerateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onRequestSubmit}
        isProcessing={isProcessing}
      />
    </div>
  );
}