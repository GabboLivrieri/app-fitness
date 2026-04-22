import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service';
import { User } from '../../models/user-model';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../auth/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
  imports: [FormsModule]
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
    private auth: Auth
  ) {}

  ngOnInit(): void {

    const userId = this.auth.getUserId();

    if (!userId) {
      console.error('User not logged');
      return;
    }

    this.userService.getById(userId).subscribe(user => {
      this.user = user;
      this.loading = false;
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