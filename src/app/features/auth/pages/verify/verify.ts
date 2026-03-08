import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './verify.html',
  styleUrl: './verify.css',
})
export class Verify implements OnInit {
  verifyForm: FormGroup;
  timer = 60;
  canResend = false;

  constructor(private fb: FormBuilder) {
    this.verifyForm = this.fb.group({
      otp: this.fb.array(new Array(6).fill('').map(() => ['', [Validators.required, Validators.maxLength(1), Validators.pattern('^[0-9]$')]]))
    });
  }

  ngOnInit() {
    this.startTimer();
  }

  get otpArray() {
    return this.verifyForm.get('otp') as FormArray;
  }

  startTimer() {
    this.timer = 60;
    this.canResend = false;
    const interval = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        this.canResend = true;
        clearInterval(interval);
      }
    }, 1000);
  }

  onInputChange(event: any, index: number) {
    const input = event.target;
    const value = input.value;

    if (value && index < 5) {
      const nextInput = input.parentElement.nextElementSibling?.querySelector('input');
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  onKeyDown(event: any, index: number) {
    if (event.key === 'Backspace' && !this.otpArray.at(index).value && index > 0) {
      const prevInput = event.target.parentElement.previousElementSibling?.querySelector('input');
      if (prevInput) {
        prevInput.focus();
      }
    }
  }

  resendCode() {
    if (this.canResend) {
      console.log('Resending code...');
      this.startTimer();
    }
  }

  onSubmit() {
    if (this.verifyForm.valid) {
      const otpValue = this.verifyForm.value.otp.join('');
      console.log('Verifying OTP:', otpValue);
    } else {
      console.log('Invalid OTP');
    }
  }
}
