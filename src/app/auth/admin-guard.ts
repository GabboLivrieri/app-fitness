import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from './auth';
import { Router } from '@angular/router';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  if (auth.isAdmin()) {
    return true;
  }

  router.navigate(['/home']);
  return false;
};