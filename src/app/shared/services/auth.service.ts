import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of, tap, Observable } from 'rxjs';
import { API_TOKEN } from '../api-token';
import { encrypt } from '../functions/crypto';
import { Login } from '../interfaces/auth';
import { RegisterUser, User } from '../interfaces/user';
import { PROD_TOKEN } from '../production';
import { SECRET_TOKEN } from '../secret-key';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    @Inject(API_TOKEN) private readonly api: string,
    @Inject(PROD_TOKEN) private readonly prod: boolean,
    @Inject(SECRET_TOKEN) private readonly key:string
    private readonly router: Router
  ) {}

  authApi = `${this.api}/auth`;

  loggedInUser: User | null = null;

  loggedInBool = new BehaviorSubject(false);

  login(login: Login) {
    return this.http.post<boolean>(`${this.authApi}/login`, login).pipe(
      tap(bool => {
        this.loggedInBool.next(bool);
      })
    );
  }
  register(user: RegisterUser): Observable<User> {
    return this.http.post<User>(`${this.authApi}/register`, {
      name: encrypt(user.name, this.key),
      lastname: encrypt(user.lastname, this.key),
      username: encrypt(user.username, this.key),
      email: encrypt(user.email, this.key),
      password: encrypt(user.password, this.key),
    });
  }
  logout() {
    return this.http.get<boolean>(`${this.authApi}/logout`).pipe(
      tap(() => {
        this.loggedInBool.next(false);
        this.router.navigate(['/login']);
      })
    );
  }
  passwordReset(password: string) {
    return this.http.post<boolean>(`${this.authApi}/reset`, password);
  }

  sendResetEmail(email: string) {
    return this.http.post<boolean>(`${this.authApi}/send-email`, email);
  }
}
