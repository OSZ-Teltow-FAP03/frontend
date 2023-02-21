import { Login } from '../shared/interfaces/auth';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../shared/interfaces/user';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  page = 'Login' || 'Register' || 'Password-Reset';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.page = 'Login';
  }

  login(data: Login) {
    console.log(data);
    this.authService.login(data.username, data.password).subscribe({
      next: bool => {
        if (bool) {
          this.authService.loggedIn = true;
          this.router.navigate(['archive']);
        }
      },
    });
  }

  register(data: User) {
    console.log(data);
    this.authService.register();
  }

  sendEmail(emailAdress: string) {
    console.log(emailAdress);
    this.authService.sendEmail();
  }
}
