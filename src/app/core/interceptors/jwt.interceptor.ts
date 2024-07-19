import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '@/app/core/services/local-storage.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageService = inject(LocalStorageService);
  const token = localStorageService.getItem('access_token');

  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }

  return next(req);
};
