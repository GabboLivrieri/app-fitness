import { Component, OnInit } from '@angular/core';
import { Meal } from '../../../models/meal-model';
import { MealService } from '../../../services/meal-service';
import { EditMeal } from '../../../components/meal/edit-meal/edit-meal';

import { CapitalizePipe } from '../../../pipes/capitalize-pipe';
import { CreatedAtFormatPipe } from '../../../pipes/created-at-format-pipe';
import { CaloriesPipe } from '../../../pipes/calories-pipe';
import { MaterialModule } from '../../../modules/material-module';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-meal-detail',
  imports: [MaterialModule, AsyncPipe, CaloriesPipe, CreatedAtFormatPipe, CapitalizePipe],
  templateUrl: './meal-detail.html',
  styleUrl: './meal-detail.css',
})
export class MealDetail implements OnInit {
  
  meal$?: Observable<Meal | undefined>;

  constructor(
    private mealService: MealService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ){}

  ngOnInit(): void {
    this.loadMeal();
  }

  loadMeal() {
    const id = this.route.snapshot.paramMap.get('id');

    if(!id){
      this.router.navigate(['/meals']);
      return;
    }

    this.meal$ = this.mealService.getById(id);
  }

  onEditMeal(meal: Meal){
    const dialogRef = this.dialog.open(EditMeal, {
      width: '600px',
      data: meal
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result){
          this.meal$ = this.mealService.getById(result.id);
        }
      });
  }

  deleteMeal(id: string){
    this.mealService.delete(id).subscribe(() => {
      this.router.navigate(['/meals']);
    });
  }

  onBack(){
    this.router.navigate(['/meals']);
  }
}
