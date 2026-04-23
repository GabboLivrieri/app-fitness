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

  ingredients = new FormArray<FormGroup>([]);

  form: FormGroup;

  constructor(
    private mealService: MealService,
    private dialogRef: MatDialogRef<EditMeal>,
    @Inject(MAT_DIALOG_DATA) public data: Meal
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      ingredients: this.ingredients // 🔥 collegamento diretto
    });
  }

  ngOnInit(): void {
    if (!this.data) return;

    // 🔥 patch base form
    this.form.patchValue({
      name: this.data.name,
      description: this.data.description
    });

    // 🔥 reset array per evitare duplicati
    this.ingredients.clear();

    // 🔥 carico ingredienti esistenti
    (this.data.ingredients || []).forEach((ing: Ingredient) => {
      this.ingredients.push(
        new FormGroup({
          name: new FormControl(ing.name, Validators.required),
          calories: new FormControl(ing.calories, Validators.required)
        })
      );
    });
  }

  // ➕ aggiungi ingrediente
  addIngredient() {
    this.ingredients.push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        calories: new FormControl(0, Validators.required)
      })
    );
  }

  // ❌ rimuovi ingrediente
  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  // 💾 validazione
  canSave(): boolean {
    return this.form.valid && this.ingredients.length > 0;
  }

  // 🚀 submit finale
  onSubmit() {
    if (!this.canSave()) return;

    const updatedMeal: Meal = {
      id: this.data.id,
      name: this.form.value.name ?? '',
      description: this.form.value.description ?? '',
      userId: this.data.userId,
      ingredients: this.ingredients.getRawValue() as Ingredient[],
      totalCalories: this.data.totalCalories,
      createdAt: this.data.createdAt
    };

    const meal$ = this.mealService.update(updatedMeal);

    meal$.subscribe({
      next: (meal) => this.dialogRef.close(meal),
      error: (err) => console.error('Meal update error:', err)
    });
  }
}