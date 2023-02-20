import { LoginData, RegisterData } from './../shared/interfaces/login';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LoginService } from '../shared/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  page = 'Login' || 'Register' || 'Password-Reset';

  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router
  ) {
    this.page = 'Login';
  }

  login(data: LoginData) {
    console.log(data);
    this.loginService.login(data.username, data.password).subscribe({
      next: bool => {
        if (bool) {
          this.loginService.loggedIn = true;
          this.router.navigate(['archive']);
        }
      },
    });
  }

  register(data: RegisterData) {
    console.log(data);
    this.loginService.register();
  }

  sendEmail(emailAdress: string) {
    console.log(emailAdress);
    this.loginService.sendEmail();
  }
}
