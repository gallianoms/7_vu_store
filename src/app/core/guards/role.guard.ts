import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
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
