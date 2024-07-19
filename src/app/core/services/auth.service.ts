import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@/environments/environment.development';
import { User } from '../interfaces/user/user.interface';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrlBase}/auth/login`;
  private apiUrlReg = `${environment.apiUrlBase}/users`;
  private http = inject(HttpClient);
  private localStorageService = inject(LocalStorageService);

  login(email: string, password: string): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = { email, password };
    return this.http.post<User>(this.apiUrl, body, { headers });
  }

  saveTokens(accessToken: string, refreshToken: string): void {
    this.localStorageService.setItem('access_token', accessToken);
    this.localStorageService.setItem('refresh_token', refreshToken);
  }

  getAccessToken(): string | null {
    return this.localStorageService.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return this.localStorageService.getItem('refresh_token');
  }

  clearTokens(): void {
    this.localStorageService.removeItem('access_token');
    this.localStorageService.removeItem('refresh_token');
  }

  logout(): void {
    this.clearTokens();
  }
  /* user register */

  register(name: string, email: string, password: string, avatar: string): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = { name, email, password, avatar };
    return this.http.post<User>(this.apiUrlReg, body, { headers });
  }

}
