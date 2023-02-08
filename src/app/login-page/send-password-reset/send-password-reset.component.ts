import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-send-password-reset',
  templateUrl: './send-password-reset.component.html',
  styleUrls: ['./send-password-reset.component.scss'],
})
export class SendPasswordResetComponent {
  @Output() sendMail = new EventEmitter<string>();
  @Output() back = new EventEmitter<string>();
  @Input() email = '';

  constructor(private readonly fb: FormBuilder) {}

  nfb = this.fb.nonNullable;

  resetForm = this.nfb.group({
    email: this.nfb.control<string>('', [
      Validators.required,
      Validators.email,
    ]),
  });
}
