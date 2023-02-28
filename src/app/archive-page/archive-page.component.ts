import { Component, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, Subject, ReplaySubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MovieInfoDialogComponent } from '../dialogs/movie-info-dialog/movie-info-dialog.component';
import { MovieService } from '../shared/services/movie.service';
import { ApiMovieData, Movie } from '../shared/interfaces/movie';
import { Sort } from '@angular/material/sort';
import { Query } from '../shared/interfaces/query';
import { PaginationDataSource } from '../shared/pagination/pagination-data-source';

@Component({
  selector: 'app-archive-page',
  templateUrl: './archive-page.component.html',
  styleUrls: ['./archive-page.component.scss'],
})
export class ArchivePageComponent implements OnDestroy {
  sanitizedMovieList$ = new BehaviorSubject<Array<Movie>>([]);
  movieList$ = new ReplaySubject<Array<ApiMovieData>>(1);
  sub = new Subject<boolean>();

  constructor(
    private readonly sanitizer: DomSanitizer,
    private readonly dialog: MatDialog,
    private readonly movieService: MovieService
  ) {
    this.dataSource.connect().subscribe(val => {
      this.movieList$.next(val);
    });

    this.movieList$.subscribe(val => {
      console.log(val);
      const list = val.map(movie => {
        if (movie.Vorschaubild.length > 0) {
          console.log('bild');
          const sanitizedImg = sanitizer.bypassSecurityTrustUrl(
            'data:image/png;base64,' + movie.Vorschaubild
          );
          return { ...movie, Vorschaubild: sanitizedImg };
        }
        const sanitizedImg = sanitizer.bypassSecurityTrustUrl('');
        return { ...movie, Vorschaubild: sanitizedImg };
      });
      console.log(list);
      this.sanitizedMovieList$.next(list);
    });
  }

  ngOnDestroy() {
    this.dataSource.disconnect();
  }

  initialSort: Sort = { active: 'ID', direction: 'desc' };
  initalQuery: Query = { search: '' };

  dataSource = new PaginationDataSource<ApiMovieData, Query>(
    (request, query) => this.movieService.page(request, query),
    this.initialSort,
    this.initalQuery
  );

  search(string: string) {
    this.dataSource.queryBy({ search: string });
  }

  openMovie(movie: Movie) {
    this.dialog.open(MovieInfoDialogComponent, {
      data: movie,
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      maxWidth: '1000px',
      width: '100%',
      height: '100%',
      maxHeight: '500px',
    });
  }
}
