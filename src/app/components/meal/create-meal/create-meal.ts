import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MealService } from '../../../services/meal-service';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../modules/material-module';
import { Auth } from '../../../auth/auth';

@Component({
  selector: 'app-create-meal',
  imports: [ReactiveFormsModule, MaterialModule],
  templateUrl: './create-meal.html',
  styleUrl: './create-meal.css',
})
export class CreateMeal implements OnInit {

  form: FormGroup;

  constructor(
    private auth: Auth,
    private mealService: MealService,
    private dialogRef: MatDialogRef<CreateMeal>,
    private router: Router
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      ingredients: new FormArray<FormGroup>([]) 
    });
  }

  ngOnInit(): void {}

  get ingredientsArray(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  addIngredient() {
    const ingredientGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      calories: new FormControl(null, [Validators.required, Validators.min(1)]),
      quantity: new FormControl(null, [Validators.required, Validators.min(1)])
    });

    this.ingredientsArray.push(ingredientGroup);
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
        i.calories !== null && i.calories !== '' &&
        i.quantity !== null && i.quantity !== ''
      )
    );
  }

  canSave(): boolean {
    return this.form.valid && this.isIngredientsValid();
  }

  onSubmit() {
    if (!this.canSave()) return;

    const meal = {
      name: this.form.value.name!,
      description: this.form.value.description ?? '',
      userId: this.auth.getUserId()!, 
      ingredients: this.ingredientsArray.value
    };

    this.mealService.create(meal).subscribe({
      next: (meal) => {
        this.dialogRef.close(meal);
        this.router.navigate(['/meals']); 
      },
      error: (err) => {
        console.error('Errore creazione pasto:', err);
      }
    });
  }
}