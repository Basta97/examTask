import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.css',
})
export class VerifyEmail {
  @Input() email: string = '';
  @Output() submitOtp = new EventEmitter<string>();
  @Output() editEmail = new EventEmitter<void>();

  otpForm: FormGroup;
  showErrorBox = false;

  constructor(private fb: FormBuilder) {
    this.otpForm = this.fb.group({
      code1: ['', [Validators.required, Validators.maxLength(1)]],
      code2: ['', [Validators.required, Validators.maxLength(1)]],
      code3: ['', [Validators.required, Validators.maxLength(1)]],
      code4: ['', [Validators.required, Validators.maxLength(1)]],
      code5: ['', [Validators.required, Validators.maxLength(1)]],
      code6: ['', [Validators.required, Validators.maxLength(1)]],
    });
  }

  onInput(event: any, nextInputId: string | null) {
    const input = event.target;
    if (input.value && nextInputId) {
      document.getElementById(nextInputId)?.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, prevInputId: string | null, formControlName: string) {
    if (event.key === 'Backspace' && !this.otpForm.get(formControlName)?.value && prevInputId) {
      document.getElementById(prevInputId)?.focus();
    }
  }

  onSubmit() {
    if (this.otpForm.valid) {
      const vals = this.otpForm.value;
      const code = `${vals.code1}${vals.code2}${vals.code3}${vals.code4}${vals.code5}${vals.code6}`;
      this.submitOtp.emit(code);
    } else {
      this.otpForm.markAllAsTouched();
    }
  }

  onEdit() {
    this.editEmail.emit();
  }

  closeErrorBox() {
    this.showErrorBox = false;
  }
}
