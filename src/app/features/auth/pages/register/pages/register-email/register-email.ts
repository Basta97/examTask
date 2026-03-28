import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-email',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register-email.html',
  styleUrl: './register-email.css',
})
export class RegisterEmail {
  @Output() submitEmail = new EventEmitter<string>();

  registerForm: FormGroup;
  showErrorBox = false;

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get emailCtrl() {
    return this.registerForm.get('email');
  }

  closeErrorBox() {
    this.showErrorBox = false;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.submitEmail.emit(this.registerForm.value.email);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
