import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MaterialModule } from '../../../modules/material-module';
import { Workout } from '../../../models/workout-model';

import { CaloriesPipe } from '../../../pipes/calories-pipe';
import { CreatedAtFormatPipe } from '../../../pipes/created-at-format-pipe';
import { CapitalizePipe } from '../../../pipes/capitalize-pipe';

@Component({
  selector: 'app-workout-card',
  imports: [MaterialModule, CaloriesPipe, CreatedAtFormatPipe, CapitalizePipe],
  templateUrl: './workout-card.html',
  styleUrl: './workout-card.css',
})
export class WorkoutCard {

  @Input() workout!: Workout;
  @Input() workoutColor!: string;

  @Output() edit = new EventEmitter<Workout>();
  @Output() detail = new EventEmitter<Workout>();
  @Output() delete = new EventEmitter<Workout>();

 

  onEdit() {
    this.edit.emit(this.workout);
  }

  onDetail() {
    this.detail.emit(this.workout);
  }

  onDelete() {
    this.delete.emit(this.workout);
  }
}