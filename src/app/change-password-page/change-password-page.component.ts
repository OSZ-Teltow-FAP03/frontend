import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { getErrorMessage } from '../shared/functions/get-error-message';
import { matchValidator } from '../shared/validators/match-validator';

@Component({
  selector: 'app-change-password-page',
  templateUrl: './change-password-page.component.html',
  styleUrls: ['./change-password-page.component.scss'],
})
export class ChangePasswordPageComponent {
  constructor(private readonly fb: FormBuilder) {}

  nfb = this.fb.nonNullable;

  getErrorMessage = getErrorMessage;

  changePasswordForm = this.nfb.group({
    password: this.nfb.control<string>('', [
      Validators.required,
      matchValidator('confirmPassword', true),
    ]),
    confirmPassword: this.nfb.control<string>('', [
      Validators.required,
      matchValidator('password'),
    ]),
  });
}
