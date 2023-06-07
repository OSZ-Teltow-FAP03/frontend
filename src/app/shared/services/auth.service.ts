import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap, Observable, map, finalize } from 'rxjs';
import { API_TOKEN } from '../api-token';
import { createBodyUrlencoded } from '../functions/create-body-urlencoded';
import { decrypt } from '../functions/crypto';
import { EncryptedApiResponse } from '../interfaces/api-response';
import { Login } from '../interfaces/auth';
import { RegisterUser, User } from '../interfaces/user';
import { SECRET_TOKEN } from '../secret-key';
import { PROD_TOKEN } from '../production';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    @Inject(API_TOKEN) private readonly api: string,
    @Inject(PROD_TOKEN) private readonly prod: boolean,
    @Inject(SECRET_TOKEN) private readonly key: string,
    private readonly router: Router,
    private readonly cookie: CookieService
  ) {}

  authApi = `${this.api}/auth`;
  loggedInBool = new BehaviorSubject(false);
  private user: User | null = null;

  get loggedInUser(): User | null {
    return this.user;
  }

  login(login: Login): Observable<User | null> {
    const value = createBodyUrlencoded(
      [
        { key: 'email', value: login.username },
        { key: 'password', value: login.password },
      ],
      this.key
    );
    const body = new HttpParams({
      fromObject: value,
    });
    return this.http
      .post<EncryptedApiResponse>(`${this.authApi}/login`, body, {
        observe: 'response' as const,
      })
      .pipe(
        map(res => {
          if (res.body?.data) {
            const data = decrypt(res.body?.data, this.key);
            if (data === false) {
              return null;
            }
            this.user = JSON.parse(data) as User;
            return this.user;
          }
          return null;
        }),
        finalize(() => {
          this.loggedInBool.next(true);
        })
      );
  }

  register(user: RegisterUser): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };

    const value = createBodyUrlencoded(
      [
        { key: 'name', value: user.name },
        { key: 'lastname', value: user.lastname },
        { key: 'username', value: user.username },
        { key: 'email', value: user.email },
        { key: 'password', value: user.password },
      ],
      this.key
    );
    const body = new HttpParams({
      fromObject: value,
    });
    return this.http.post<User>(`${this.authApi}/register`, body, httpOptions);
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
