import { LoadService } from '@/app/shared/services/loading-overlay/load.service';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';

export const loadInterceptor: HttpInterceptorFn = (req, next) => {
  const loadService = inject(LoadService);

  if (req.headers.get('X-LOADING') === 'false') {
    return next(req);
  }

  loadService.showLoader();
  
  return next(req).pipe(
    finalize(() => loadService.hideLoader())
  );
};
