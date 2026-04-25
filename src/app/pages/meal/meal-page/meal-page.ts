import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { Auth } from '../../../auth/auth';

import { Meal } from '../../../models/meal-model';
import { MealService } from '../../../services/meal-service';

import { CreateMeal } from '../../../components/meal/create-meal/create-meal';
import { EditMeal } from '../../../components/meal/edit-meal/edit-meal';
import { MealCard } from '../../../components/meal/meal-card/meal-card';

import { MaterialModule } from '../../../modules/material-module';
import { AsyncPipe } from '@angular/common';

import { ConfirmDialog } from '../../../components/dialogs/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-meal-page',
  imports: [MaterialModule, MealCard, AsyncPipe],
  templateUrl: './meal-page.html',
  styleUrl: './meal-page.css',
})
export class MealPage implements OnInit {

  meals$!: Observable<Meal[]>;

  sortField: 'calories' | 'ingredients' = 'calories';
  sortDirection: 'asc' | 'desc' = 'desc';

  constructor(
    private mealService: MealService,
    private dialog: MatDialog,
    private router: Router,
    private auth: Auth,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadMeals();
  }


  loadMeals() {
    const userId = this.auth.getUserId()!;
    this.meals$ = this.mealService.getByUserId(userId);  
  }

  openCreateMeal() {
    const dialogRef = this.dialog.open(CreateMeal, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadMeals();
      }
    });
  }

  onEditMeal(meal: Meal) {
    const dialogRef = this.dialog.open(EditMeal, {
      width: '600px',
      data: meal
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadMeals();
      }
    });
  }

  onDetailMeal(meal: Meal) {
    this.router.navigate(['/meals', meal.id]);
  }

  deleteMeal(meal: Meal) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: { 
        title: 'Conferma eliminazione',
        message: `Sei sicuro di voler eliminare ${meal.name}?`}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.mealService.delete(meal.id).subscribe(() => {
          this.loadMeals();
          this.cdr.detectChanges();
        });
      }
    });
  }


  setSortField(field: 'calories' | 'ingredients') {
    this.sortField = field;
  }

  setSortDirection(direction: 'asc' | 'desc') {
    this.sortDirection = direction;
  }

  sortMeals(meals: Meal[]): Meal[] {
    return [...meals].sort((a, b) => {

      const aValue =
        this.sortField === 'calories'
          ? (a.totalCalories ?? 0)
          : (a.ingredients?.length ?? 0);

      const bValue =
        this.sortField === 'calories'
          ? (b.totalCalories ?? 0)
          : (b.ingredients?.length ?? 0);

      return this.sortDirection === 'asc'
        ? aValue - bValue
        : bValue - aValue;
    });
  }
}