import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

import { Profile } from './pages/profile/profile';

import { WorkoutPage } from './pages/workout/workout-page/workout-page';
import { WorkoutDetail } from './pages/workout/workout-detail/workout-detail';

import { MealPage } from './pages/meal/meal-page/meal-page';
import { MealDetail } from './pages/meal/meal-detail/meal-detail';

import { PersonalTrainer } from './pages/personal-trainer/personal-trainer/personal-trainer';
import { ApiMealDetail } from './pages/personal-trainer/api-meal-detail/api-meal-detail';
import { ApiWorkoutDetail } from './pages/personal-trainer/api-workout-detail/api-workout-detail';

import { Support } from './pages/support/support';
import { Info } from './pages/info/info';

import { NotFound } from './pages/not-found/not-found';




export const routes: Routes = [
    { path: '', redirectTo: 'Home', pathMatch: 'full'},
    { path: 'home', component: Home},
    { path: 'profile', component: Profile},

    { path: 'workouts', component: WorkoutPage},
    { path: 'workouts/:id', component: WorkoutDetail},

    { path: 'meals', component: MealPage},
    { path: 'meals/:id', component: MealDetail},
    { path: 'personalTrainer', component: PersonalTrainer},

    { path: 'personalTrainer/meal/:id', component: ApiMealDetail},
    { path: 'personalTrainer/workout/:id', component: ApiWorkoutDetail},

    { path: 'support', component: Support},
    { path: 'info', component: Info},

    {path: '404', component: NotFound},
    {path: '**', redirectTo: '404'}
];
