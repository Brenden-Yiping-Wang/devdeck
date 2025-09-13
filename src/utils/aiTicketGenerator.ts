import { Ticket } from '../types';

// Simulated AI ticket generation
export function generateTicketsFromRequest(title: string, description: string): Promise<Ticket[]> {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      const baseTickets = [
        {
          title: "Set up project structure and dependencies",
          description: "Initialize the project with necessary frameworks, dependencies, and folder structure.",
          priority: "high" as const,
          estimatedHours: 4,
        },
        {
          title: "Design and implement core UI components",
          description: "Create reusable UI components including buttons, forms, and layout elements.",
          priority: "high" as const,
          estimatedHours: 8,
        },
        {
          title: "Implement main feature functionality",
          description: `Develop the core functionality for: ${title}. ${description.slice(0, 100)}...`,
          priority: "high" as const,
          estimatedHours: 12,
        },
        {
          title: "Add user authentication and authorization",
          description: "Implement secure user login, registration, and role-based access control.",
          priority: "medium" as const,
          estimatedHours: 6,
        },
        {
          title: "Create responsive design and mobile optimization",
          description: "Ensure the application works seamlessly across desktop, tablet, and mobile devices.",
          priority: "medium" as const,
          estimatedHours: 5,
        },
        {
          title: "Write unit tests and integration tests",
          description: "Implement comprehensive testing to ensure code quality and reliability.",
          priority: "medium" as const,
          estimatedHours: 8,
        },
        {
          title: "Optimize performance and add error handling",
          description: "Improve application performance, add proper error handling, and loading states.",
          priority: "low" as const,
          estimatedHours: 4,
        },
        {
          title: "Documentation and deployment setup",
          description: "Create user documentation, API docs, and set up CI/CD pipeline for deployment.",
          priority: "low" as const,
          estimatedHours: 3,
        },
      ];

      // Randomly select 4-6 tickets to simulate AI intelligence
      const numTickets = Math.floor(Math.random() * 3) + 4; // 4-6 tickets
      const selectedTickets = baseTickets
        .sort(() => Math.random() - 0.5)
        .slice(0, numTickets);

      const tickets: Ticket[] = selectedTickets.map((ticket, index) => ({
        id: `ticket-${Date.now()}-${index}`,
        ...ticket,
        status: 'todo' as const,
        createdAt: new Date(),
      }));

      resolve(tickets);
    }, 2000); // 2 second delay to simulate AI processing
  });
}