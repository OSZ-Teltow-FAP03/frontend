import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from 'src/app/shared/interfaces/movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent {
  @Input() movieList: Array<Movie> | null = null;
  @Output() openMovie = new EventEmitter<Movie>();
  columns = 1;

  constructor(private readonly breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([Breakpoints.Small]).subscribe(result => {
      if (result.matches) {
        this.columns = 2;
      }
    });
    breakpointObserver.observe([Breakpoints.Medium]).subscribe(result => {
      if (result.matches) {
        this.columns = 3;
      }
    });

    breakpointObserver.observe([Breakpoints.Large]).subscribe(result => {
      if (result.matches) {
        this.columns = 4;
      }
    });
    breakpointObserver.observe([Breakpoints.XLarge]).subscribe(result => {
      if (result.matches) {
        this.columns = 5;
      }
    });
  }

  toDate(string: string) {
    return new Date(string);
  }
}
