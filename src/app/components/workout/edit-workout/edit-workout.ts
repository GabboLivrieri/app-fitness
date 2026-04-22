import { Component, Inject, inject } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { WorkoutService } from '../../../services/workout-service';
import { Exercise } from '../../../models/exercise-model';
import { Workout } from '../../../models/workout-model';

import { MaterialModule } from '../../../modules/material-module';

@Component({
  selector: 'app-edit-workout',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './edit-workout.html',
  styleUrl: './edit-workout.css',
})
export class EditWorkout {

  form: FormGroup;
  exercises: Exercise[] = [];
  selectedExercises: any[] = [];
  groupedExercises: { muscle: string; exercises: Exercise[] }[] = [];

  readonly dialog = inject(MatDialog);

  constructor(
    private workoutService: WorkoutService,
    private dialogRef: MatDialogRef<EditWorkout>,
    @Inject(MAT_DIALOG_DATA) public data: Workout
  ) {
    this.form = new FormGroup({
      name: new FormControl(data.name, [Validators.required]),
      exerciseSelect: new FormControl(null)
    });

    // preload esercizi già presenti
    this.selectedExercises = data.exercises ? [...data.exercises] : [];
  }

  ngOnInit(): void {
    this.workoutService.getExercises().subscribe(exs => {
      this.exercises = exs;
      this.groupedExercises = this.groupByMuscle(exs);
    });
  }

  groupByMuscle(exercises: Exercise[]) {
    const map = new Map<string, Exercise[]>();

    exercises.forEach(ex => {
      const key = ex.muscleGroup;

      if (!map.has(key)) {
        map.set(key, []);
      }

      map.get(key)!.push(ex);
    });

    return Array.from(map.entries()).map(([muscle, exercises]) => ({
      muscle,
      exercises
    }));
  }

  addExercise(exercise: Exercise) {
    if (!exercise) return;

    const exists = this.selectedExercises.some(ex => ex.id === exercise.id);

    if (!exists) {
      this.selectedExercises.push({
        ...exercise,
        sets: 3,
        reps: 10,
        restTime: 60
      });
    }

    this.form.get('exerciseSelect')?.setValue(null);
  }

  removeExercise(exercise: Exercise) {
    this.selectedExercises =
      this.selectedExercises.filter(ex => ex.id !== exercise.id);
  }

  canSave(): boolean {
    return this.form.valid && this.selectedExercises.length > 0;
  }

  onSubmit() {
    if (!this.canSave()) return;

    const workout$ = this.workoutService.update({
      id: this.data.id,
      name: this.form.value.name,
      userId: this.data.userId,
      exercises: this.selectedExercises,
      createdAt: this.data.createdAt,
      totalCaloriesBurned: this.data.totalCaloriesBurned
    });

    workout$.subscribe(workout => {
      this.dialogRef.close(workout);
    });
  }
}