import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MaterialModule } from '../../../modules/material-module';
import { Workout } from '../../../models/workout-model';
import { ApiDataService } from '../../../services/api-data-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { CapitalizePipe } from '../../../pipes/capitalize-pipe';
import { CaloriesPipe } from '../../../pipes/calories-pipe';
import { CreatedAtFormatPipe } from '../../../pipes/created-at-format-pipe';
import { DifficultyDirective } from '../../../directives/difficulty-directive';

@Component({
  selector: 'app-api-workout-detail',
  imports: [MaterialModule, AsyncPipe, CapitalizePipe, CaloriesPipe, CreatedAtFormatPipe, DifficultyDirective],
  templateUrl: './api-workout-detail.html',
  styleUrl: './api-workout-detail.css',
})
export class ApiWorkoutDetail implements OnInit {

  workout$!: Observable<Workout>;

  constructor(
    private apiService: ApiDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadWorkout();
  }

  loadWorkout() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/personalTrainer']);
      return;
    }

    this.workout$ = this.apiService.getWorkoutsById(id);
  }

  onBack() {
    this.router.navigate(['/personalTrainer']);
  }
}
