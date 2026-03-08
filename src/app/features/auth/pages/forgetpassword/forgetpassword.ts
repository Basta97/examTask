import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './forgetpassword.html',
  styleUrl: './forgetpassword.css',
})
export class Forgetpassword {
  forgetForm: FormGroup;
  isSent = false;
  emailSentTo = '';

  constructor(private fb: FormBuilder) {
    this.forgetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgetForm.valid) {
      this.emailSentTo = this.forgetForm.value.email;
      console.log('Password reset link sent to:', this.emailSentTo);
      this.isSent = true;
    } else {
      this.forgetForm.markAllAsTouched();
    }
  }

  resendLink() {
    console.log('Resending link to:', this.emailSentTo);
    // Add resend logic here
  }

  backToInput() {
    this.isSent = false;
  }
}
