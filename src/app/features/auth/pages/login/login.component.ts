import { AuthService } from '@/app/core/services/auth.service';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  private authService =  inject(AuthService);
  private router = inject(Router);

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {  
        console.log('Login successful', response);
        if (response.access_token && response.refresh_token) {
          this.authService.saveTokens(response.access_token.toString(), response.refresh_token.toString());
          this.router.navigate(['']);
        }
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }
}
