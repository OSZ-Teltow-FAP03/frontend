import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { User, UserQuery } from '../shared/interfaces/user';
import { PaginationDataSource } from '../shared/pagination/pagination-data-source';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-user-management-page',
  templateUrl: './user-management-page.component.html',
  styleUrls: ['./user-management-page.component.scss'],
})
export class UserManagementPageComponent {
  constructor(private readonly userService: UserService) {}

  initialSort: Sort = { active: 'ID', direction: 'asc' };
  initalQuery: UserQuery = { search: '' };

  dataSource = new PaginationDataSource<User, UserQuery>(
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
    //TODO: open Dialog
    this.userService.updateUserRole(user.ID, user.role).subscribe();
  }

  deleteUser(user: User) {
    //TODO: open confirmation Dialog
    this.userService.deletUser(user.ID).subscribe();
  }
}
