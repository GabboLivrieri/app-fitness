import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TicketService } from '../../services/ticket-service';
import { Ticket } from '../../models/ticket-model';
import { Auth } from '../../auth/auth';
import { MaterialModule } from '../../modules/material-module';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-support',
  templateUrl: './support.html',
  styleUrls: ['./support.css'],
  imports: [MaterialModule, FormsModule]
})
export class Support implements OnInit {
  tickets: Ticket[] = [];
  loading = true;
  isAdmin = false;

  
  newTitle = '';
  newMessage = '';
  newCategory: 'BUG' | 'RICHIESTA' | 'ALTRO' = 'ALTRO';
  sending = false;

  
  replyingTicketId: string | null = null;
  replyText = '';

  constructor(
    private ticketService: TicketService,
    private auth: Auth,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.auth.isAdmin();
    this.loadTickets();
  }

  loadTickets(): void {
    const userId = this.auth.getUserId()!;

    const source$ = this.isAdmin
      ? this.ticketService.getAll()
      : this.ticketService.getByUserId(userId);

    source$.subscribe({
      next: (tickets) => {
        this.tickets = tickets.sort((a, b) => b.createdAt - a.createdAt);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  submitTicket(): void {
    if (!this.newTitle.trim() || !this.newMessage.trim()) return;

    const userId = this.auth.getUserId()!;
    this.sending = true;

    
    this.userService.getById(userId).subscribe(user => {
      const ticket: Omit<Ticket, 'id'> = {
        userId,
        userEmail: user.email,
        title: this.newTitle,
        message: this.newMessage,
        category: this.newCategory,
        status: 'APERTO',
        createdAt: Date.now()
      };

      this.ticketService.create(ticket).subscribe({
        next: () => {
          this.newTitle = '';
          this.newMessage = '';
          this.newCategory = 'ALTRO';
          this.sending = false;
          this.loadTickets();
        },
        error: () => {
          this.sending = false;
          this.cdr.detectChanges();
        }
      });
    });
  }

  startReply(ticketId: string, currentReply: string = '') {
    this.replyingTicketId = ticketId;
    this.replyText = currentReply;
  }

  cancelReply() {
    this.replyingTicketId = null;
    this.replyText = '';
  }

  submitReply(ticketId: string): void {
    if (!this.replyText.trim()) return;

    this.ticketService.reply(ticketId, this.replyText).subscribe({
      next: () => {
        this.replyingTicketId = null;
        this.replyText = '';
        this.loadTickets();
      }
    });
  }

  deleteTicket(ticketId: string): void {
    this.ticketService.delete(ticketId).subscribe({
      next: () => {
        this.tickets = this.tickets.filter(t => t.id !== ticketId);
        this.cdr.detectChanges();
      }
    });
  }
}