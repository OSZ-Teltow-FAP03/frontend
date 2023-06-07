import { Login } from '../shared/interfaces/auth';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { take, Observable } from 'rxjs';
import { RegisterUser } from '../shared/interfaces/user';
import { LoadingService } from '../shared/services/loading.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  page = 'Login' || 'Register' || 'Password-Reset';
  loading$: Observable<boolean>;
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly loadingService: LoadingService,
    private readonly cookie: CookieService
  ) {
    this.page = 'Login';
    this.authService.loggedInBool.pipe(take(1)).subscribe(bool => {
      if (bool) {
        this.router.navigate(['archive']);
      }
    });
    this.loading$ = loadingService.loading$;

    const sessionId = this.cookie.getAll();
    if (sessionId !== undefined) {
      this.cookie.delete('session_id');
    }
  }

  login(data: Login) {
    this.authService.login(data).subscribe({
      next: user => {
        if (user) {
          this.router.navigate(['archive']);
        }
      },
    });
  }

  register(data: RegisterUser) {
    this.authService.register(data).subscribe({
      next: user => {
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
