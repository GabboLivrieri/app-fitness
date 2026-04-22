import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Workout } from '../../../models/workout-model';
import { CreateWorkout } from "../../../components/workout/create-workout/create-workout";
import { WorkoutService } from '../../../services/workout-service';


import { MaterialModule } from '../../../modules/material-module';
import { WorkoutCard } from '../../../components/workout/workout-card/workout-card';
import { EditWorkout } from '../../../components/workout/edit-workout/edit-workout';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-workout-page',
  imports: [MaterialModule, WorkoutCard, AsyncPipe],
  templateUrl: './workout-page.html',
  styleUrl: './workout-page.css',
})
export class WorkoutPage implements OnInit {

    workouts$!: Observable<Workout[]>;

    sortField: 'calories' | 'exercises' = 'calories';
    sortDirection: 'asc' | 'desc' = 'desc';

    constructor (
      private workoutservice: WorkoutService,
      private dialog: MatDialog,
      private router: Router
    ) {}

  ngOnInit(): void {
    this.loadWorkouts();
  }
   
  loadWorkouts() {
    this.workouts$ = this.workoutservice.getAll()
  };
  

  openCreateWorkouts() {
    const dialogRef = this.dialog.open(CreateWorkout, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadWorkouts();
      }
    });
  }

  onEditWorkout(workout: Workout) {
    const dialogRef = this.dialog.open(EditWorkout, {
      width: '600px',
      data: workout
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadWorkouts();
      }
    });
  }

  onDetailWorkout(workout: Workout) {
    this.router.navigate(['/workouts', workout.id])
  }

  deleteWorkout(id: string) {
    this.workoutservice.delete(id).subscribe(() => {
      this.loadWorkouts();
    });
  }
  setSortField(field: 'calories' | 'exercises') {
  this.sortField = field;
  }

  setSortDirection(direction: 'asc' | 'desc') {
    this.sortDirection = direction;
  }

  sortWorkouts(workouts: Workout[]): Workout[] {
    return [...workouts].sort((a, b) => {

      const aValue =
        this.sortField === 'calories'
          ? a.totalCaloriesBurned
          : (a.exercises?.length ?? 0);

      const bValue =
        this.sortField === 'calories'
          ? b.totalCaloriesBurned
          : (b.exercises?.length ?? 0);

      return this.sortDirection === 'asc'
        ? aValue - bValue
        : bValue - aValue;
    });
  }
}
