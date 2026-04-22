import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiDataService } from '../../../services/api-data-service';
import { CapitalizePipe } from '../../../pipes/capitalize-pipe';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-api-meal-detail',
  imports: [CapitalizePipe, AsyncPipe],
  templateUrl: './api-meal-detail.html',
  styleUrl: './api-meal-detail.css',
})
export class ApiMealDetail implements OnInit {
  meal$!: Observable<any>;
  ingredients$!: Observable<any[]>;

  constructor(
    private apiService: ApiDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.loadApiRecById(id);
    this.loadIngredients();
  }

  loadApiRecById(id: string) {
    this.meal$ = this.apiService.getRecipesById(id).pipe(
      map((data: any) => data.meals?.[0])
    );
  }

  loadIngredients() {
    this.ingredients$ = this.meal$.pipe(
      map(meal => this.getIngredients(meal))
    );
  }

  getIngredients(meal: any) {
  const ingredients: { name: string; measure: string }[] = [];

  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (name && name.trim()) {
      ingredients.push({
        name,
        measure
      });
    }
  }
    return ingredients;
  }

  onBack() {
    this.router.navigate(['/personalTrainer'])
  }

}
