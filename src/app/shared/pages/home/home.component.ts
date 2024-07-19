import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@/app/core/services/auth.service';

import { User } from '@/app/core/interfaces/user/user.interface';
import { UserService } from '@/app/core/services/userIdRol.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  user: User | null = null;

  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

  ngOnInit() {
    const token = this.authService.getAccessToken();
    if (token) {
      const userId = this.userIdFromToken(token);
      this.userService.getUserById(userId).subscribe({
        next: (user: User) => {
          this.user = user;
        },
        error: error => {
          console.error('Error fetching user data', error);
        },
      });
    }
  }

  private userIdFromToken(token: string): number {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub;
  }

  logout() {
    this.authService.logout();
    this.user = null;
    this.router.navigate(['']);
  }

  navigateToLogin() {
    this.router.navigate(['auth/login']);
  }

  navigateToRegister() {
    this.router.navigate(['auth/register']);
  }
}
