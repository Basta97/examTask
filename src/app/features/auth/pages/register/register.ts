import { CommonModule } from '@angular/common';
import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'authCore';
import { RegisterEmail } from './pages/register-email/register-email';
import { VerifyEmail } from './pages/verify-email/verify-email';
import { RegisterInfo } from './pages/register-info/register-info';
import { RegisterPass } from './pages/register-pass/register-pass';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, 
    RegisterEmail,
    VerifyEmail,
    RegisterInfo,
    RegisterPass
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  step = 1;
  isSubmitting = false;
  showErrorBox = false;
  errorMessage = 'Something went wrong';

  // Collected data
  userEmail = '';
  userInfo: any = null;

  isStep(stepNumber: number): boolean {
    return this.step === stepNumber;
  }

  closeErrorBox(): void {
    this.showErrorBox = false;
    this.cdr.detectChanges();
  }

  // --- Step 1: Email ---
  onEmailSubmit(email: string) {
    console.log('--- Email Submit Triggered ---', email);
    this.userEmail = email;
    this.isSubmitting = true;
    this.showErrorBox = false;
    this.cdr.detectChanges();

    this.authService.verifyEmail({ email } as any).subscribe({
      next: (res: any) => {
        console.log('verifyEmail NEXT:', res);
        this.isSubmitting = false;

        // Check for error payload being masked as success
        if (res?.status === false || res?.code >= 400 || (res?.message && res.message.toLowerCase().includes('already exists'))) {
            this.errorMessage = res.message || 'Error occurred';
            this.showErrorBox = true;
            this.cdr.detectChanges();
            return;
        }

        // Proceed to OTP step
        this.step = 2;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('verifyEmail ERROR:', err);
        this.isSubmitting = false;
        this.errorMessage = err.message || err.error?.message || 'Failed to send verification email.';
        this.showErrorBox = true;
        this.cdr.detectChanges();
      }
    });
  }

  // --- Step 2: OTP ---
  onOtpSubmit(code: string) {
    console.log('--- OTP Submit Triggered ---', code);
    this.isSubmitting = true;
    this.showErrorBox = false;
    this.cdr.detectChanges();

    this.authService.confirmEmail({ email: this.userEmail, code } as any).subscribe({
      next: (res: any) => {
        console.log('confirmEmail NEXT:', res);
        this.isSubmitting = false;

        if (res?.status === false || res?.code >= 400 || (res?.message && (res.message.toLowerCase().includes('invalid') || res.message.toLowerCase().includes('expired')))) {
            this.errorMessage = res.message || 'Invalid code. Please try again.';
            this.showErrorBox = true;
            this.cdr.detectChanges();
            return;
        }

        // Proceed to profile info step
        this.step = 3;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('confirmEmail ERROR:', err);
        this.isSubmitting = false;
        if (err?.message === 'success' || err?.message === 'Account confirmed successfully') {
            this.step = 3;
        } else {
            this.errorMessage = err.message || err.error?.message || 'Invalid code. Please try again.';
            this.showErrorBox = true;
        }
        this.cdr.detectChanges();
      }
    });
  }

  onEditEmail() {
    this.step = 1;
  }

  // --- Step 3: Info ---
  onInfoSubmit(info: any) {
    this.userInfo = info;
    this.step = 4;
  }

  // --- Step 4: Password ---
  onPasswordSubmit(password: string) {
    this.isSubmitting = true;
    this.showErrorBox = false;

    const payload = {
      firstName: this.userInfo.firstname,
      lastName: this.userInfo.lastname,
      username: this.userInfo.username,
      email: this.userEmail,
      phone: this.userInfo.phone,
      password: password,
      confirmPassword: password
    };

    this.authService.register(payload as any).subscribe({
      next: (res: any) => {
        this.isSubmitting = false;
        
        // If it's a caught API error (e.g. 400 Validation Error)
        if (res?.status === false || res?.code >= 400) {
            let errorText = res.message || 'Registration failed. Please check your details.';
            // The /register endpoint returns an 'errors' array on validation failure
            if (res.errors && Array.isArray(res.errors)) {
               errorText = res.errors.map((e: any) => e.message).join(' | ');
            }
            this.errorMessage = errorText;
            this.showErrorBox = true;
            this.cdr.detectChanges();
            return;
        }

        // Otherwise it was a HTTP 200/201 success payload modified by the adapter
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        this.isSubmitting = false;
        this.errorMessage = err.message || err.error?.message || 'Registration failed. Please try again.';
        this.showErrorBox = true;
        this.cdr.detectChanges();
      }
    });
  }
}
