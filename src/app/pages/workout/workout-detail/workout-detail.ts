import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Workout } from '../../../models/workout-model';
import { WorkoutService } from '../../../services/workout-service';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../../modules/material-module';
import { WorkoutCard } from '../../../components/workout/workout-card/workout-card';
import { EditWorkout } from '../../../components/workout/edit-workout/edit-workout';
import { DialogRef } from '@angular/cdk/dialog';

import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-workout-detail',
  imports: [MaterialModule, DatePipe],
  templateUrl: './workout-detail.html',
  styleUrl: './workout-detail.css',
})
export class WorkoutDetail implements OnInit {

  workout?: Workout;

  constructor(
    private workoutService: WorkoutService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadWorkout();
  }

  loadWorkout() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/workouts']);
      return;
    }

    this.workoutService.getById(id).subscribe(workout => {
      this.workout = workout;
    });
  }

  onEditWorkout(workout: Workout) {
        const dialogRef = this.dialog.open(EditWorkout, {
      width: '600px',
      data: workout
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.workout = result
      }
    });
  }

  deleteWorkout(id: string) {
    this.workoutService.delete(id).subscribe(() => {
      this.router.navigate(['/workouts']);
    });
  }
  onBack(){
    this.router.navigate(['/workouts']);
  }
}