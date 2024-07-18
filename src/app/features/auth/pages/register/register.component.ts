import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '@/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      avatar: ['', Validators.required]
    });
  }

  register() {
    if (this.registerForm.valid) {
      const { name, email, password, avatar } = this.registerForm.value;
      this.authService.register(name, email, password, avatar).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          this.router.navigate(['']);
        },
        error: (error) => {
          console.error('Registration failed', error);
        }
      });
    }
  }
}
