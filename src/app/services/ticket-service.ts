import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase-service';
import { Observable, map } from 'rxjs';
import { Ticket } from '../models/ticket-model';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private dbUrl = 'https://angular-project-1b5ba-default-rtdb.europe-west1.firebasedatabase.app/tickets';

  constructor(private firebaseService: FirebaseService) {}

  create(ticket: Omit<Ticket, 'id'>): Observable<any> {
    return this.firebaseService.create(`${this.dbUrl}.json`, ticket);
  }

  getAll(): Observable<Ticket[]> {
    return this.firebaseService.get<any>(`${this.dbUrl}.json`).pipe(
      map(data => data
        ? Object.keys(data).map(key => ({ id: key, ...data[key] }))
        : []
      )
    );
  }

  getByUserId(userId: string): Observable<Ticket[]> {
    return this.getAll().pipe(
      map(tickets => tickets.filter(t => t.userId === userId))
    );
  }

  reply(ticketId: string, adminReply: string): Observable<any> {
    return this.firebaseService.update(`${this.dbUrl}/${ticketId}.json`, {
      adminReply,
      status: 'CHIUSO'
    });
  }

  delete(ticketId: string): Observable<any> {
    return this.firebaseService.delete(`${this.dbUrl}/${ticketId}.json`);
  }
}