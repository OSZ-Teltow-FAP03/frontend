import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog/confirmation-dialog.component';
import { RoleChangeDialogComponent } from '../dialogs/role-change-dialog/role-change-dialog.component';
import { User } from '../shared/interfaces/user';
import { Query } from '../shared/interfaces/query';
import { PaginationDataSource } from '../shared/pagination/pagination-data-source';
import { UserService } from '../shared/services/user.service';
import { filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-user-management-page',
  templateUrl: './user-management-page.component.html',
  styleUrls: ['./user-management-page.component.scss'],
})
export class UserManagementPageComponent {
  constructor(
    private readonly userService: UserService,
    public dialog: MatDialog
  ) {}

  initialSort: Sort = { active: 'ID', direction: 'asc' };
  initalQuery: Query = { search: '' };

  dataSource = new PaginationDataSource<User, Query>(
    (request, query) => this.userService.page(request, query),
    this.initialSort,
    this.initalQuery
  );

  selectedRow = new Map<number, { array: User; displayText: string }>();

  sortChange(sort: Sort) {
    this.dataSource.sortBy(sort);
  }

  rowChange(row: Map<number, { array: User; displayText: string }>) {
    this.selectedRow = new Map(row);
    console.log(this.selectedRow);
  }

  search(string: string) {
    this.dataSource.queryBy({ search: string });
  }

  updateRole(user: User) {
    this.dialog
      .open(RoleChangeDialogComponent, {
        data: user,
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '500ms',
        maxWidth: '480px',
        width: '100%',
        disableClose: true,
      })
      .afterClosed()
      .pipe(
        filter(x => x !== undefined),
        switchMap((user: User) =>
          this.userService.updateUserRole(user.ID, user.role)
        )
      )
      .subscribe(); //success handling
  }

  deleteUser(user: User) {
    this.dialog
      .open(ConfirmationDialogComponent, {
        data: { data: user, delete: true },
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '500ms',
        maxWidth: '480px',
        width: '100%',
        disableClose: true,
      })
      .afterClosed()
      .pipe(
        filter(x => x !== undefined),
        switchMap((user: User) => this.userService.deletUser(user.ID))
      )
      .subscribe(x => {
        if (x) {
          console.log('gelöscht');
        }
      });
  }
}
