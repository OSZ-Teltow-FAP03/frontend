import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title = '';
  @Input() showSearch = true;
  @Output() search = new EventEmitter<string>();

  constructor(private readonly fb: FormBuilder) {}

  nfb = this.fb.nonNullable;

  searchForm = this.nfb.group({
    search: this.nfb.control<string>(''),
  });
}
