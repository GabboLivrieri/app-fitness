import { CanActivateFn, CanActivateChildFn } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Auth } from './auth';

const checkAuth = (): boolean => {
  const auth = inject(Auth);
  const platformId = inject(PLATFORM_ID);

  const tokenInMemory = auth.getToken();
  const tokenInStorage = isPlatformBrowser(platformId) 
    ? localStorage.getItem('token') 
    : null;

  if (tokenInMemory || tokenInStorage) {
    return true;
  }

  return false;
};

export const authGuard: CanActivateFn = () => checkAuth();
export const authChildGuard: CanActivateChildFn = () => checkAuth();