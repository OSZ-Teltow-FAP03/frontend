import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  page = 'Login' || 'Register' || 'Password-Reset';
  constructor(private readonly fb: FormBuilder) {
    this.page = 'Login';
  }

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  login() {
    console.log('login');
  }

  getErrorMessage() {
    if (this.loginForm.hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.hasError('email') ? 'Not a valid email' : '';
  }
}
