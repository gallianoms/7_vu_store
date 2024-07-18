import { AuthService } from '@/app/core/services/auth.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  private authService =  inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',  Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
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
}
