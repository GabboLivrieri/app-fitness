import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MaterialModule } from '../../../modules/material-module';
import { Meal } from '../../../models/meal-model';

import { CaloriesPipe } from '../../../pipes/calories-pipe';
import { CreatedAtFormatPipe } from '../../../pipes/created-at-format-pipe';
import { CapitalizePipe } from '../../../pipes/capitalize-pipe';

@Component({
  selector: 'app-meal-card',
  imports: [MaterialModule, CaloriesPipe, CreatedAtFormatPipe, CapitalizePipe],
  templateUrl: './meal-card.html',
  styleUrl: './meal-card.css',
})
export class MealCard {

  @Input() meal!: Meal;
  @Input() mealColor!: string; 

  @Output() edit = new EventEmitter<Meal>();
  @Output() detail = new EventEmitter<Meal>();
  @Output() delete = new EventEmitter<Meal>();

  onEdit() {
    this.edit.emit(this.meal);
  }

  onDetail() {
    this.detail.emit(this.meal);
  }

  onDelete() {
    this.delete.emit(this.meal);
  }
}