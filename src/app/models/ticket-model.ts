export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';

export interface TicketMessage {
  senderId: string;
  message: string;
  createdAt: Date;
}

export interface Ticket {
  id: string;
  userId: string;
  subject: string;
  status: TicketStatus;
  messages: TicketMessage[];
  createdAt: Date;
  updatedAt: Date;
}