import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MaterialModule } from '../../modules/material-module';
import { UserService } from '../../services/user-service';
import { User } from '../../models/user-model';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../auth/auth';
import { Router } from '@angular/router';
import { GoalService } from '../../services/goal-service';
import { Goal } from '../../models/goal-model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
  imports: [FormsModule, MaterialModule]
})
export class Profile implements OnInit {

  user!: User & { age: number | null; height: number | null; weight: number | null; };
  loading = true;
  editMode = false;

 
  goals: Goal[] = [];
  completedGoals: Goal[] = [];
  showNewGoal = false;
  newGoal = { title: '', description: '', deadline: '', category: 'ALLENAMENTO' as Goal['category'] };

  constructor(
    private userService: UserService,
    private auth: Auth,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private goalService: GoalService
  ) {}

  ngOnInit(): void {
    const userId = this.auth.getUserId();
    if (!userId) return;

    this.userService.getById(userId).subscribe({
      next: (user) => {
        this.user = user;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => { this.loading = false; }
    });

    this.loadGoals();
  }

  loadGoals(): void {
    const userId = this.auth.getUserId()!;
    this.goalService.getByUserId(userId).subscribe({
      next: (goals) => {
        this.goals = goals.filter(g => !g.completed);
        this.completedGoals = goals.filter(g => g.completed);
        this.cdr.detectChanges();
      }
    });
  }

  addGoal(): void {
    if (!this.newGoal.title.trim()) return;
    const userId = this.auth.getUserId()!;

    const goal: Omit<Goal, 'id'> = {
      userId,
      title: this.newGoal.title,
      description: this.newGoal.description,
      deadline: this.newGoal.deadline,
      category: this.newGoal.category,
      completed: false,
      createdAt: Date.now()
    };

    this.goalService.create(goal).subscribe(() => {
      this.newGoal = { title: '', description: '', deadline: '', category: 'ALLENAMENTO' };
      this.showNewGoal = false;
      this.loadGoals();
    });
  }

  completeGoal(goal: Goal): void {
    this.goalService.complete(goal.id).subscribe(() => this.loadGoals());
  }

  deleteGoal(goal: Goal): void {
    this.goalService.delete(goal.id).subscribe(() => this.loadGoals());
  }

  toggleEdit() { this.editMode = !this.editMode; }

  save() {
    this.userService.update(this.user).subscribe(() => { this.editMode = false; });
  }

  getBmi(): number | null {
    if (!this.user?.weight || !this.user?.height) return null;
    const heightInMeters = this.user.height / 100;
    return +(this.user.weight / (heightInMeters * heightInMeters)).toFixed(1);
  }
}