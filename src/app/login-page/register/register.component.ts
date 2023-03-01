import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { getErrorMessage } from 'src/app/shared/functions/get-error-message';
import { RegisterUser } from 'src/app/shared/interfaces/user';
import { matchValidator } from 'src/app/shared/validators/match-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  @Output() back = new EventEmitter<string>();
  @Output() register = new EventEmitter<RegisterUser>();

  constructor(private readonly fb: FormBuilder) {}

  nfb = this.fb.nonNullable;

  getErrorMessage = getErrorMessage;

  registerForm = this.nfb.group({
    username: this.nfb.control<string>('', [Validators.required]),
    foreName: this.nfb.control<string>('', [Validators.required]),
    lastName: this.nfb.control<string>('', [Validators.required]),
    password: this.nfb.control<string>('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
      ),
      matchValidator('confirmPassword', true),
    ]),
    confirmPassword: this.nfb.control<string>('', [
      Validators.required,
      matchValidator('password'),
    ]),
    email: this.nfb.control<string>('', [
      Validators.required,
      Validators.email,
    ]),
  });
}
