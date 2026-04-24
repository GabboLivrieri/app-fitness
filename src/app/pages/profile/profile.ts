import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MaterialModule } from '../../modules/material-module';
import { UserService } from '../../services/user-service';
import { User } from '../../models/user-model';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../auth/auth';
import { GoalService } from '../../services/goal-service';
import { Goal } from '../../models/goal-model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../../components/dialogs/confirm-dialog/confirm-dialog';
import { Meal } from '../../models/meal-model';
import { MealService } from '../../services/meal-service';
import { Workout } from '../../models/workout-model';
import { WorkoutService } from '../../services/workout-service';

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

  meals: Meal[] = [];
  workouts: Workout[] = [];

  constructor(
    private userService: UserService,
    private auth: Auth,
    private cdr: ChangeDetectorRef,
    private goalService: GoalService,
    private dialog: MatDialog,
    private mealService: MealService,
    private workoutService: WorkoutService
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

     this.mealService.getByUserId(userId).subscribe(res => {
        this.meals = res;
        this.cdr.detectChanges();
      });

      this.workoutService.getByUserId(userId).subscribe(res => {
        this.workouts = res;
        this.cdr.detectChanges();
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

  deleteSubscription() {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Disdici abbonamento',
        message: `Sei sicuro di voler disdire l'abbonamento? Tornerai al piano Free`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.cancelSubscription(this.user.id)
          .subscribe(updatedUser => {
            this.user.subscription = updatedUser.subscription;

            this.cdr.detectChanges();
          });
      }
    });
  }

  get monthlyCaloriesStats() {
    if (!this.user) {
      return { caloriesIn: 0, caloriesOut: 0, hIn: 0, hOut: 0 };
    }

    const today = new Date();
    const m = today.getMonth();
    const y = today.getFullYear();

    // MEALS del mese per user
    const mealsMonth = this.meals.filter(m => {
      const d = new Date(m.createdAt);
      return m.userId === this.user.id &&
            d.getMonth() === today.getMonth() &&
            d.getFullYear() === today.getFullYear();
    });

    // WORKOUT del mese per user
    const workoutsMonth = this.workouts.filter(w => {
      const d = new Date(w.createdAt);
      return w.userId === this.user.id &&
            d.getMonth() === today.getMonth() &&
            d.getFullYear() === today.getFullYear();
    });

    const caloriesIn = mealsMonth
      .reduce((sum, m) => sum + (m.totalCalories || 0), 0);

    const caloriesOut = workoutsMonth
      .reduce((sum, w) => sum + (w.totalCaloriesBurned || 0), 0);

    const max = Math.max(caloriesIn, caloriesOut, 1);

    return {
      caloriesIn,
      caloriesOut,
      hIn: (caloriesIn / max) * 100,
      hOut: (caloriesOut / max) * 100
    };
  }
}