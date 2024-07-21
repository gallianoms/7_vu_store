import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UrlImageValidator {
  constructor(private http: HttpClient) {}

  validate(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }

      const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
      if (!urlPattern.test(control.value)) {
        return of({ invalidUrl: true });
      }

      return this.http.get(control.value, { responseType: 'blob' }).pipe(
        map((blob: Blob) => {
          if (blob.type.startsWith('image/')) {
            return null;
          } else {
            return { invalidImage: true };
          }
        }),
        catchError(() => of({ invalidImage: true }))
      );
    };
  }
}
