import { MatPaginatorIntl } from '@angular/material/paginator';

export function CustomPaginator() {
  const customPaginatorIntl: MatPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'Einträge pro Seite:';
  customPaginatorIntl.getRangeLabel = (
    page: number,
    pageSize: number,
    length: number
  ) =>
    `Eintrag ${page * pageSize + 1} bis ${
      page * pageSize + pageSize > length ? length : page * pageSize + pageSize
    } von ${length}`;

  return customPaginatorIntl;
}
