import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const localStorage = inject(LocalStorageService);
  const router = inject(Router);

  let isToken = false;

  isToken = !!localStorage.getItem('access_token');
  if (isToken) {
    return true;
  } else {
    router.navigate(['auth/login']);
    return false;
  }
};
