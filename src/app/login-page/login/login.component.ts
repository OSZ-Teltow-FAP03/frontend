import { FormBuilder, Validators } from '@angular/forms';
import { Login } from '../../shared/interfaces/auth';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { getErrorMessage } from 'src/app/shared/functions/get-error-message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Output() login = new EventEmitter<Login>();
  @Output() changePage = new EventEmitter<string>();
  @Input() loading: boolean | null = false;

  constructor(private readonly fb: FormBuilder) {}

  nfb = this.fb.nonNullable;

  getErrorMessage = getErrorMessage;

  loginForm = this.nfb.group({
    username: this.nfb.control<string>('', [Validators.required]),
    password: this.nfb.control<string>('', [Validators.required]),
  });

  //TODO: Fehlerausgabe bei nicht möglich einloggen
}
