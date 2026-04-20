import { CanActivateFn, CanActivateChildFn } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from './auth';

const checkAuth = (): boolean => {
  const auth = inject(Auth);

  if (auth.getToken()) {
    return true;
  }

  return false;
};

export const authGuard: CanActivateFn = () => {
  return checkAuth();
};

export const authChildGuard: CanActivateChildFn = () => {
  return checkAuth();
};