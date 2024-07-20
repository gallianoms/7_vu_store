import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AbstractGeneric } from '../contracts/generic.contract';
import { Observable } from 'rxjs';
import { environment } from '@/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class GenericService<T> implements AbstractGeneric<T> {
  private http = inject(HttpClient);

  getAll(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(environment.API_URL + endpoint);
  }

  getOne(endpoint: string, id: string | number): Observable<T> {
    return this.http.get<T>(environment.API_URL + endpoint + id);
  }

  create(endpoint: string, body: T): Observable<T> {
    return this.http.post<T>(environment.API_URL + endpoint, body);
  }

  update(endpoint: string, id: string | number, body: T): Observable<T> {
    return this.http.put<T>(environment.API_URL + endpoint + id, body);
  }
  delete(endpoint: string, id: string | number): Observable<void> {
    return this.http.delete<void>(environment.API_URL + endpoint + id);
  }
}
