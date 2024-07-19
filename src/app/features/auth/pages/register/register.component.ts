import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '@/app/core/services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '@/app/shared/services/notification.service';

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
  private notificationService = inject(NotificationService);

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
          this.notificationService.showSuccess('Register successful');
          this.router.navigate(['auth/login']);
        },
        error: (error) => {
          console.error('Registration failed', error);
          this.notificationService.showSuccess('Register failed');
        }
      });
    }
  }
}
