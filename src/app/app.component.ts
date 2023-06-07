import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MovieService } from './shared/services/movie.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';

  constructor(
    private readonly cookie: CookieService,
    private readonly movieService: MovieService
  ) {}

  loading$ = this.movieService.loading.pipe(delay(3000));
}
