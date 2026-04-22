import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiDataService } from '../../../services/api-data-service';
import { MaterialModule } from '../../../modules/material-module';
import { Observable, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CapitalizePipe } from '../../../pipes/capitalize-pipe';
import { WorkoutCard } from '../../../components/workout/workout-card/workout-card';
import { Workout } from '../../../models/workout-model';

@Component({
  selector: 'app-personal-trainer',
  imports: [AsyncPipe, CapitalizePipe, WorkoutCard, MaterialModule],
  templateUrl: './personal-trainer.html',
  styleUrl: './personal-trainer.css',
})
export class PersonalTrainerPage implements OnInit {

  workouts$!: Observable<Workout[]>;
  meals$!: Observable<any[]>;

  constructor(
    private apiService: ApiDataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadApiData();
    this.loadWorkouts();
  }

  loadApiData() {
    this.meals$ = this.apiService.getRecipes().pipe(
      map((data: any) => data.meals || []),
      map((meals: any[]) =>
        meals.sort(() => Math.random() - 0.5).slice(0, 5)
      )
    );
  }

  loadWorkouts() {
    this.workouts$ = this.apiService.getWorkouts().pipe(
      map((data: any) => Object.values(data || {})),
      map((workouts: any[]) =>
        workouts.sort(() => Math.random() - 0.5).slice(0, 5)
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
