import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((e: HttpErrorResponse) => {
      let errorMessage = '';

      if (e.error instanceof ErrorEvent) {
        errorMessage = `Client Error: ${e.error.message}`;
      } else {
        console.log(req);
        if (req.url.includes('auth')) return throwError(() => e);
        if (req.url.includes('users') && req.method === 'POST')
          return throwError(() => e);
        errorMessage = `Server Error: ${e.status} ${e.statusText}`;
      }

      router.navigate(['/error'], { queryParams: { message: errorMessage } });
      return throwError(() => errorMessage);
    }),
  );
};
