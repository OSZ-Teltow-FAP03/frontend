import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html',
  styleUrls: ['./user-actions.component.scss'],
})
export class UserActionsComponent {
  @Input() selectedRow = new Map<
    number,
    { array: User; displayText: string }
  >();
  @Output() search = new EventEmitter<string>();
  @Output() delete = new EventEmitter<User>();
  @Output() updateRole = new EventEmitter<User>();

  constructor(private readonly fb: FormBuilder) {}

  nfb = this.fb.nonNullable;

  searchForm = this.nfb.group({ search: [''] });
}
