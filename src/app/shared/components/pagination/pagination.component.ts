import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() pageSize = 10;
  @Input() length = 0;
  @Input() pageIndex = 0;
  @Output() paginator = new EventEmitter<PageEvent>();

  paginationChange(change: PageEvent) {
    this.paginator.emit(change);
  }
}
