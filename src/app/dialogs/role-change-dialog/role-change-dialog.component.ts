import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role } from 'src/app/shared/interfaces/auth';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-role-change-dialog',
  templateUrl: './role-change-dialog.component.html',
  styleUrls: ['./role-change-dialog.component.scss'],
})
export class RoleChangeDialogComponent {
  roles: Array<Role> = [
    { name: 'Schüler' },
    { name: 'Prüfer' },
    { name: 'Lehrer' },
    { name: 'Admin' },
    { name: 'Gast' },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly user: User,
    public readonly dialogRef: MatDialogRef<RoleChangeDialogComponent>,
    private readonly fb: FormBuilder
  ) {}

  nfb = this.fb.nonNullable;

  rolechangeForm = this.nfb.group({
    role: ['', Validators.required],
  });

  changeRole(role: Role) {
    const user: User = { role: role.name, ...this.user };
    this.dialogRef.close(user);
  }
}
