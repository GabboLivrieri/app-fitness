  import { Component, inject } from '@angular/core';

  import { MatDialog, MatDialogRef } from '@angular/material/dialog';
  import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
  import { WorkoutService } from '../../../services/workout-service';
  import { Exercise } from '../../../models/exercise-model';

  import { MaterialModule } from '../../../modules/material-module';

  @Component({
    selector: 'app-create-workout',
    imports: [MaterialModule, ReactiveFormsModule],
    templateUrl: './create-workout.html',
    styleUrl: './create-workout.css',
  })
  export class CreateWorkout {

      form: FormGroup;
      exercises: Exercise[] = [];
      selectedExercises: any[] = []; 
      groupedExercises: { muscle: string; exercises: Exercise[] }[] = [];

      readonly dialog = inject(MatDialog)

      constructor(
        private workoutService: WorkoutService,
        private dialogRef: MatDialogRef<CreateWorkout>
      ) {
        this.form = new FormGroup({
          name: new FormControl('', [Validators.required]),
          exerciseSelect: new FormControl(null)
        });
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
            sets: 3,       // 🔥 default
            reps: 10,      // 🔥 default
            restTime: 60   // 🔥 default (secondi)
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

        const workout$ = this.workoutService.create({
          name: this.form.value.name,
          userId: 'currentUserId',
          exercises: this.selectedExercises,
        });

        workout$.subscribe(workout => {
          this.dialogRef.close(workout);
        });
      }
  }