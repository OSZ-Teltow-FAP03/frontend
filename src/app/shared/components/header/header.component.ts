import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title = '';
  @Input() showSearch = true;
  @Output() search = new EventEmitter<string>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService
  ) {}

  nfb = this.fb.nonNullable;

  searchForm = this.nfb.group({
    search: this.nfb.control<string>(''),
  });

  logout() {
    this.authService.logout().subscribe();
  }
}
