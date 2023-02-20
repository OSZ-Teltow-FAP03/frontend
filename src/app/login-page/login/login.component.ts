import { FormBuilder, Validators } from '@angular/forms';
import { LoginData } from './../../shared/interfaces/login';
import { Component, Output, EventEmitter } from '@angular/core';
import { getErrorMessage } from 'src/app/shared/functions/get-error-message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Output() login = new EventEmitter<LoginData>();
  @Output() changePage = new EventEmitter<string>();

  constructor(private readonly fb: FormBuilder) {}

  nfb = this.fb.nonNullable;

  getErrorMessage = getErrorMessage;

  loginForm = this.nfb.group({
    username: this.nfb.control<string>('', [Validators.required]),
    password: this.nfb.control<string>('', [Validators.required]),
  });
}
