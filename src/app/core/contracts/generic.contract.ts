import { Observable } from 'rxjs';

export abstract class AbstractGeneric<T> {
  abstract getAll(endpoint: string): Observable<T[]>;
  abstract getOne(endpoint: string, id: string | number): Observable<T>;
  abstract create(endpoint: string, body: T): Observable<T>;
  abstract update(
    endpoint: string,
    id: string | number,
    body: T,
  ): Observable<T>;
  abstract delete(endpoint: string, id: string | number): Observable<void>;
}
