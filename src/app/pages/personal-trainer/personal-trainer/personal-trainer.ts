import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiDataService } from '../../../services/api-data-service';
import { MaterialModule } from '../../../modules/material-module';
import { Observable, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CapitalizePipe } from '../../../pipes/capitalize-pipe';
import { WorkoutCard } from '../../../components/workout/workout-card/workout-card';
import { Workout } from '../../../models/workout-model';
import { Auth } from '../../../auth/auth';
import { UserService } from '../../../services/user-service';
import { MatDialog } from '@angular/material/dialog';
import { PremiumDialog } from '../../../components/dialogs/premium-dialog/premium-dialog';

@Component({
  selector: 'app-personal-trainer',
  imports: [AsyncPipe, CapitalizePipe, WorkoutCard, MaterialModule],
  templateUrl: './personal-trainer.html',
  styleUrl: './personal-trainer.css',
})
export class PersonalTrainerPage implements OnInit {

  workouts$!: Observable<Workout[]>;
  meals$!: Observable<any[]>;
  isPremium = false;

  constructor(
    private apiService: ApiDataService,
    private router: Router,
    private auth: Auth,
    private userService: UserService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const userId = this.auth.getUserId();
    if (!userId) {
      this.router.navigate(['/home']);
      return;
    }

    this.userService.getById(userId).subscribe({
      next: (user) => {
        if (user.subscription === 'PREMIUM') {
          this.isPremium = true;
          this.loadApiData();
          this.loadWorkouts();
          this.cdr.detectChanges();
        } else {
          this.openPremiumDialog();
        }
      },
      error: () => {
        this.router.navigate(['/home']);
      }
    });
  }

  openPremiumDialog() {
    const ref = this.dialog.open(PremiumDialog, {
      width: '420px',
      disableClose: true
    });

    ref.afterClosed().subscribe(result => {
      if (result === 'pay') {
        this.upgradeToPremium();
      } else {
        this.router.navigate(['/home']);
      }
    });
  }

  upgradeToPremium() {
    const userId = this.auth.getUserId()!;
    this.userService.getById(userId).subscribe(user => {
      const updated = { ...user, subscription: 'PREMIUM' as const };
      this.userService.update(updated).subscribe(() => {
        this.isPremium = true;
        this.loadApiData();
        this.loadWorkouts();
        this.cdr.detectChanges();
      });
    });
  }

  loadApiData() {
    this.meals$ = this.apiService.getRecipes().pipe(
      map((data: any) => data.meals || []),
      map((meals: any[]) =>
        meals.sort(() => Math.random() - 0.6).slice(0, 6)
      )
    );
  }

  loadWorkouts() {
    this.workouts$ = this.apiService.getWorkouts().pipe(
      map((data: any) => Object.values(data || {})),
      map((workouts: any[]) =>
        workouts.sort(() => Math.random() - 0.6).slice(0, 6)
      )
    );
  }

  onMealDetail(meal: any) {
    this.router.navigate(['/personalTrainer/meal', meal.idMeal]);
  }

  onWorkoutDetail(workout: any) {
    this.router.navigate(['/personalTrainer/workout', workout.id]);
  }
}