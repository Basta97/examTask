import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-info.html',
  styleUrl: './register-info.css',
})
export class RegisterInfo {
  @Output() submitInfo = new EventEmitter<{
    firstname: string;
    lastname: string;
    username: string;
    phone: string;
  }>();

  infoForm: FormGroup;
  showErrorBox = false;

  constructor(private formBuilder: FormBuilder) {
    this.infoForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{8,15}$/)]],
    });
  }

  closeErrorBox() {
    this.showErrorBox = false;
  }

  onSubmit() {
    if (this.infoForm.valid) {
      this.submitInfo.emit(this.infoForm.value);
    } else {
      this.infoForm.markAllAsTouched();
    }
  }

  get firstNameCtrl() { return this.infoForm.get('firstname'); }
  get lastNameCtrl() { return this.infoForm.get('lastname'); }
  get usernameCtrl() { return this.infoForm.get('username'); }
  get phoneCtrl() { return this.infoForm.get('phone'); }
}
