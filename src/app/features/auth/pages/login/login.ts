import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'authCore';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;
  showPassword = false;
  showErrorBox = false;
  errMsg = 'Something went wrong';
  isSubmitting = false;
  _authService = inject(AuthService);
  private readonly router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.showErrorBox = false;
      return;
    }

    this.isSubmitting = true;
    const { username, password } = this.loginForm.value;

    const payload = { username, password };

    this._authService.login(payload as any).subscribe((res: any) => {
      this.isSubmitting = false;

      if (res && typeof res === 'object' && typeof res.token === 'string' && res.token.length > 0) {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('authToken', res.token);
        }
        this.showErrorBox = false;
        this.router.navigate(['/']);
        return;
      }

      this.errMsg = res?.message || 'Invalid email or password';
      this.showErrorBox = true;
      console.error('Login failed:', res);
    });
  }

  closeErrorBox() {
    this.showErrorBox = false;
  }
}
