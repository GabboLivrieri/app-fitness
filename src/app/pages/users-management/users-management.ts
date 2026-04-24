import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../services/user-service';
import { User } from '../../models/user-model';
import { MaterialModule } from '../../modules/material-module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-management.html',
  styleUrls: ['./users-management.css'],
  imports: [MaterialModule, FormsModule]
})
export class UsersManagement implements OnInit {
  users: User[] = [];
  loading = true;
  editingUser: User | null = null;

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  edit(user: User) {
    this.editingUser = { ...user };
  }

  cancelEdit() {
    this.editingUser = null;
  }

  save() {
    if (!this.editingUser) return;
    this.userService.update(this.editingUser).subscribe({
      next: () => {
        const index = this.users.findIndex(u => u.id === this.editingUser!.id);
        if (index !== -1) this.users[index] = { ...this.editingUser! };
        this.editingUser = null;
        this.cdr.detectChanges();
      }
    });
  }

  delete(id: string) {
    this.userService.delete(id).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.id !== id);
        this.cdr.detectChanges();
      }
    });
  }
}