import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { switchMap, startWith, map, shareReplay } from 'rxjs/operators';
import { Page, PaginationEndpoint } from './pagination';
import { SimpleDataSource } from './simple-data-source';

export class PaginationDataSource<T, Q> implements SimpleDataSource<T> {
  private pageNumber = new Subject<number>();
  private pageSize = new BehaviorSubject<number>(10);
  private sort: BehaviorSubject<Sort>;
  private query: BehaviorSubject<Q>;

  public page$: Observable<Page<T>>;

  constructor(
    endpoint: PaginationEndpoint<T, Q>,
    initialSort: Sort,
    initialQuery: Q
  ) {
    this.sort = new BehaviorSubject<Sort>(initialSort);
    this.query = new BehaviorSubject<Q>(initialQuery);
    this.page$ = combineLatest([this.sort, this.query]).pipe(
      switchMap(([sort, query]) =>
        this.pageNumber.pipe(
          startWith(0),
          switchMap(page =>
            this.pageSize.pipe(
              switchMap(size => endpoint({ page, sort, size }, query))
            )
          )
        )
      ),
      shareReplay(1)
    );
  }

  sortBy(sort: Partial<Sort>): void {
    const lastSort = this.sort.getValue();
    const nextSort = { ...lastSort, ...sort };
    this.sort.next(nextSort);
  }

  queryBy(query: Partial<Q>): void {
    const lastQuery = this.query.getValue();
    const nextQuery = { ...lastQuery, ...query };
    this.query.next(nextQuery);
  }

  fetch(page: PageEvent): void {
    this.pageNumber.next(page.pageIndex);
    this.pageSize.next(page.pageSize);
  }

  connect(): Observable<Array<T>> {
    return this.page$.pipe(map(page => page.content));
  }

  disconnect(): void {}
}
