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
    this.authService.login(data).subscribe({
      next: bool => {
        if (bool) {
          this.router.navigate(['archive']);
        }
      },
    }); // TODO: success handling (notification)
  }

  register(data: User) {
    this.authService.register(data).subscribe({
      next: user => {
        console.log(user);
        this.page = 'Login';
      },
    }); // TODO: success handling (notification)
  }

  sendEmail(email: string) {
    this.authService.sendResetEmail(email).subscribe({
      next: bool => {
        if (bool) {
          this.page = 'Login';
        }
      },
    }); // TODO: success handling (notification)
  }
}
