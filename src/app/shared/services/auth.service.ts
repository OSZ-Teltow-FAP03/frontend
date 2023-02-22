import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of, tap } from 'rxjs';
import { API_TOKEN } from '../api-token';
import { Login } from '../interfaces/auth';
import { User } from '../interfaces/user';
import { PROD_TOKEN } from '../production';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    @Inject(API_TOKEN) private readonly api: string,
    @Inject(PROD_TOKEN) private readonly prod: boolean,
    private readonly router: Router
  ) {}

  authApi = `${this.api}/auth`;

  loggedInUser: User | null = null;

  loggedInBool = new BehaviorSubject(false);

  login(login: Login) {
    if (this.prod === false) {
      this.loggedInUser = {
        name: 'Jochen',
        lastname: 'Schweizer',
        email: 'email@email.com',
        password: login.password,
        username: login.username,
      };
      this.loggedInBool.next(true);
      return of(true);
    }
    return this.http.post<boolean>(`${this.authApi}/login`, login).pipe(
      tap(bool => {
        this.loggedInBool.next(bool);
      })
    );
  }
  register(user: User) {
    if (this.prod === false) {
      return of(user);
    }
    return this.http.post<User>(`${this.authApi}/register`, user);
  }
  logout() {
    if (this.prod === false) {
      return of(true).pipe(
        tap(() => {
          console.log('User ausgeloggt');
          this.router.navigate(['/login']);
          this.loggedInBool.next(false);
        })
      );
    }
    return this.http.get<boolean>(`${this.authApi}/logout`).pipe(
      tap(() => {
        this.loggedInBool.next(false);
        this.router.navigate(['/login']);
      })
    );
  }
  passwordReset(password: string) {
    if (this.prod === false) {
      console.log('reset password');
      return of(true);
    }
    return this.http.post<boolean>(`${this.authApi}/reset`, password);
  }

  sendResetEmail(email: string) {
    if (this.prod === false) {
      console.log('Email zum Passwort zurücksetzten geschickt.');
      return of(true);
    }
    return this.http.post<boolean>(`${this.authApi}/send-email`, email);
  }
}
