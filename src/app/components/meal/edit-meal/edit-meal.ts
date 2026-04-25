import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MealService } from '../../../services/meal-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../../../modules/material-module';
import { Meal } from '../../../models/meal-model';
import { Ingredient } from '../../../models/ingredient-model';

@Component({
  selector: 'app-edit-meal',
  imports: [ReactiveFormsModule, MaterialModule],
  templateUrl: './edit-meal.html',
  styleUrl: './edit-meal.css',
})
export class EditMeal implements OnInit {

  form: FormGroup;

  constructor(
    private mealService: MealService,
    private dialogRef: MatDialogRef<EditMeal>,
    @Inject(MAT_DIALOG_DATA) public data: Meal
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      ingredients: new FormArray<FormGroup>([])
    });
  }

  ngOnInit(): void {
    if (!this.data) return;

    this.form.patchValue({
      name: this.data.name,
      description: this.data.description
    });

    this.ingredientsArray.clear();

    (this.data.ingredients || []).forEach((ing: Ingredient) => {
      this.ingredientsArray.push(
        new FormGroup({
          name: new FormControl(ing.name, Validators.required),
          calories: new FormControl(ing.calories, [Validators.required, Validators.min(1)]),
          quantity: new FormControl(ing.quantity, [Validators.required, Validators.min(1)])
        })
      );
    });
  }

  get ingredientsArray(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  addIngredient() {
    this.ingredientsArray.push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        calories: new FormControl(null, [Validators.required, Validators.min(1)]),
        quantity: new FormControl(null, [Validators.required, Validators.min(1)])
      })
    );
  }

  removeIngredient(index: number) {
    this.ingredientsArray.removeAt(index);
  }

  isIngredientsValid(): boolean {
    const ingredients = this.ingredientsArray.value;

    return (
      ingredients.length >= 3 &&
      ingredients.every((i: any) =>
        i.name?.trim().length > 0 &&
        i.calories != null &&
        i.quantity != null
      )
    );
  }

  canSave(): boolean {
    return this.form.valid && this.isIngredientsValid();
  }

  onSubmit() {
    if (!this.canSave()) return;

    const updatedMeal: Meal = {
      id: this.data.id,
      name: this.form.value.name ?? '',
      description: this.form.value.description ?? '',
      userId: this.data.userId,
      ingredients: this.ingredientsArray.getRawValue() as Ingredient[],
      totalCalories: this.data.totalCalories,
      createdAt: this.data.createdAt
    };

    const meal$ = this.mealService.update(updatedMeal);

    meal$.subscribe({
      next: (meal) => this.dialogRef.close(meal),
      error: (err) => console.error('Errore creazione pasto:', err)
    });
  }
}