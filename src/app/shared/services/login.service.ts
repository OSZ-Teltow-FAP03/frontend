import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  canLogin = new BehaviorSubject(true);

  loggedInBool = new BehaviorSubject(false);

  set loggedIn(value: boolean) {
    this.loggedInBool.next(value);
  }

  login(username: string, password: string) {
    console.log(username, password);
    return this.canLogin.asObservable();
  }
  register() {
    console.log('registrieren');
  }
  logout() {
    console.log('login');
  }
  passwordReset() {
    console.log('login');
  }
  sendEmail() {
    console.log('login');
  }
}
