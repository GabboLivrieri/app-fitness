import { Routes } from '@angular/router';
import { authGuard } from './auth/auth-guard';

import { Home } from './pages/home/home';
import { Profile } from './pages/profile/profile';

import { WorkoutPage } from './pages/workout/workout-page/workout-page';
import { WorkoutDetail } from './pages/workout/workout-detail/workout-detail';

import { MealPage } from './pages/meal/meal-page/meal-page';
import { MealDetail } from './pages/meal/meal-detail/meal-detail';

import { PersonalTrainerPage } from './pages/personal-trainer/personal-trainer/personal-trainer';
import { ApiMealDetail } from './pages/personal-trainer/api-meal-detail/api-meal-detail';
import { ApiWorkoutDetail } from './pages/personal-trainer/api-workout-detail/api-workout-detail';

import { Support } from './pages/support/support';
import { Info } from './pages/info/info';

import { LoginForm } from './components/authentication/login/login';
import { SignupForm } from './components/authentication/signup/signup';

import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: Home },
  { path: 'login', component: LoginForm },
  { path: 'signup', component: SignupForm },

  {
    path: '',
    canActivateChild: [authGuard],
    children: [
      { path: 'profile', component: Profile },

      { path: 'workouts', component: WorkoutPage },
      { path: 'workouts/:id', component: WorkoutDetail },

      { path: 'meals', component: MealPage },
      { path: 'meals/:id', component: MealDetail },

      { path: 'personalTrainer', component: PersonalTrainerPage },
      { path: 'personalTrainer/meal/:id', component: ApiMealDetail },
      { path: 'personalTrainer/workout/:id', component: ApiWorkoutDetail },

      { path: 'support', component: Support },
    ]
  },
  
  { path: 'info', component: Info },
  { path: '404', component: NotFound },
  { path: '**', redirectTo: '404' }
];