export interface Ticket {
  id: string;
  userId: string;
  userEmail: string;
  title: string;
  message: string;
  category: 'BUG' | 'RICHIESTA' | 'ALTRO';
  status: 'APERTO' | 'CHIUSO';
  createdAt: number;
  adminReply?: string;
}