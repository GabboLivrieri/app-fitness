import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Workout } from '../../../models/workout-model';
import { WorkoutService } from '../../../services/workout-service';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../../modules/material-module';
import { EditWorkout } from '../../../components/workout/edit-workout/edit-workout';

import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { CaloriesPipe } from '../../../pipes/calories-pipe';
import { CreatedAtFormatPipe } from '../../../pipes/created-at-format-pipe';
import { CapitalizePipe } from '../../../pipes/capitalize-pipe';

import { DifficultyDirective} from '../../../directives/difficulty-directive';

@Component({
  selector: 'app-workout-detail',
  imports: [MaterialModule, AsyncPipe, CaloriesPipe, CreatedAtFormatPipe, CapitalizePipe, DifficultyDirective], 
  templateUrl: './workout-detail.html',
  styleUrl: './workout-detail.css',
})
export class WorkoutDetail implements OnInit {

  workout$?: Observable<Workout | undefined>;

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

    this.workout$ = this.workoutService.getById(id);
  }

  onEditWorkout(workout: Workout) {
    const dialogRef = this.dialog.open(EditWorkout, {
      width: '600px',
      data: workout
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.workout$ = this.workoutService.getById(result.id);
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