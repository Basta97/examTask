import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-pass',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-pass.html',
  styleUrl: './register-pass.css',
})
export class RegisterPass {
  @Output() submitPassword = new EventEmitter<string>();

  passForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  showErrorBox = false;

  constructor(private formBuilder: FormBuilder) {
    this.passForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmpassword: ['', [Validators.required]],
    }, { validators: this.passwordsMatchValidator('password', 'confirmpassword') });
  }

  closeErrorBox() {
    this.showErrorBox = false;
  }

  onSubmit() {
    if (this.passForm.valid) {
      this.submitPassword.emit(this.passForm.value.password);
    } else {
      this.passForm.markAllAsTouched();
    }
  }

  togglePasswordVisibility() { this.showPassword = !this.showPassword; }
  toggleConfirmPasswordVisibility() { this.showConfirmPassword = !this.showConfirmPassword; }

  get passwordCtrl() { return this.passForm.get('password'); }
  get confirmPasswordCtrl() { return this.passForm.get('confirmpassword'); }

  private passwordsMatchValidator(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get(passwordKey)?.value;
      const confirmPassword = group.get(confirmPasswordKey)?.value;
      if (!password || !confirmPassword) return null;
      return password === confirmPassword ? null : { passwordMismatch: true };
    };
  }
}
