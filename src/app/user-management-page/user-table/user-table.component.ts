import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/shared/interfaces/user';
import { Query } from 'src/app/shared/interfaces/query';
import { PaginationDataSource } from 'src/app/shared/pagination/pagination-data-source';
import { BehaviorSubject } from 'rxjs';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent {
  selectedRow = new Map<number, { array: User; displayText: string }>();

  dataSourceInit$ = new BehaviorSubject<boolean>(false);

  _dataSource!: PaginationDataSource<User, Query>;

  @Input() set dataSource(value: PaginationDataSource<User, Query>) {
    this._dataSource = value;
    this.dataSourceInit$.next(true);
  }
  get dataSource(): PaginationDataSource<User, Query> {
    return this._dataSource;
  }

  @Output() sort = new EventEmitter<Sort>();
  @Output() row = new EventEmitter<
    Map<number, { array: User; displayText: string }>
  >();

  displayedColumns: Array<string> = [
    'ID',
    'Name, Vorname',
    'Username',
    'Email',
    'Rolle',
  ];

  sortData(data: Sort) {
    this.sort.emit(data);
  }

  selectRow(row: User) {
    if (this.selectedRow.has(row.ID)) {
      this.selectedRow.delete(row.ID);
      this.row.emit(this.selectedRow);
    } else {
      this.selectedRow.clear();
      this.selectedRow.set(row.ID, {
        array: row,
        displayText: row.lastname + ', ' + row.name,
      });
      this.row.emit(this.selectedRow);
    }
  }
}
