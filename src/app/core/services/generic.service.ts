import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AbstractGeneric } from '../contracts/generic.contract';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '@/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class GenericService<T> implements AbstractGeneric<T> {
  private http = inject(HttpClient);

  getAll(endpoint: string): Observable<T[]> {
    return this.http
      .get<T[]>(environment.API_URL + endpoint)
      .pipe(catchError(this.handleError));
  }

  getOne(endpoint: string, id: string | number): Observable<T> {
    return this.http
      .get<T[]>(environment.API_URL + endpoint + id)
      .pipe(catchError(this.handleError));
  }

  create(endpoint: string, body: T): Observable<T> {
    return this.http
      .post<T>(environment.API_URL + endpoint, body)
      .pipe(catchError(this.handleError));
  }

  update(endpoint: string, id: string | number, body: T): Observable<T> {
    return this.http
      .put<T>(environment.API_URL + endpoint + id, body)
      .pipe(catchError(this.handleError));
  }

  delete(endpoint: string, id: string | number): Observable<void> {
    return this.http
      .delete<T>(environment.API_URL + endpoint + id)
      .pipe(catchError(this.handleError));
  }

  private handleError(e: HttpErrorResponse): Observable<any> {
    let errorMessage = '';
    if (e.error instanceof ErrorEvent)
      errorMessage = `Error: ${e.error.message}`;
    else errorMessage = `Status: ${e.status} - ${e.statusText}`;
    console.log(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
