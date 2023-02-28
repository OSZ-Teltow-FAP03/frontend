import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {
  constructor(
    @Inject(DIALOG_DATA)
    public readonly dialogData: { data: User; delete: boolean },
    public readonly dialogRef: MatDialogRef<ConfirmationDialogComponent>
  ) {}
}
