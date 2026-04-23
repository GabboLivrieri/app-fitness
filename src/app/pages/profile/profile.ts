import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MaterialModule } from '../../modules/material-module';
import { UserService } from '../../services/user-service';
import { User } from '../../models/user-model';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../auth/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
  imports: [FormsModule, MaterialModule]
})
export class Profile implements OnInit {

  user!: User & {
  age: number | null;
  height: number | null;
  weight: number | null;
  };
  loading = true;
  editMode = false;

  constructor(
  private userService: UserService,
  private auth: Auth,
  private router: Router,
  private cdr: ChangeDetectorRef
) {}

ngOnInit(): void {
  const userId = this.auth.getUserId();
  console.log('userId al ngOnInit:', userId);

  if (!userId) {
    console.error('User not logged');
    return;
  }

  this.userService.getById(userId).subscribe({
    next: (user) => {
      console.log('Utente ricevuto:', user);  // <-- qui
      console.log('loading impostato a false');
      this.user = user;
      this.loading = false;
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('Errore getById:', err);
      this.loading = false;
    }
  });

}

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  save() {
    this.userService.update(this.user).subscribe(() => {
      this.editMode = false;
    });
  }
  getBmi(): number | null {
  if (!this.user?.weight || !this.user?.height) return null;

  const heightInMeters = this.user.height / 100;
  return +(this.user.weight / (heightInMeters * heightInMeters)).toFixed(1);
}

}