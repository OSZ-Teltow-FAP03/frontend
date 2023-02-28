import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concat, Observable, Subscription, switchMap, of } from 'rxjs';
import {
  ApiMovieData,
  BasicMovieData,
  Movie,
} from '../shared/interfaces/movie';
import { FileService } from '../shared/services/file.service';
import { MovieService } from '../shared/services/movie.service';

@Component({
  selector: 'app-forms-page',
  templateUrl: './forms-page.component.html',
  styleUrls: ['./forms-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormsPageComponent implements OnInit, OnDestroy {
  constructor(
    private readonly movieService: MovieService,
    private readonly fileService: FileService,
    private route: ActivatedRoute
  ) {}

  id!: number;
  sub!: Subscription;
  movie$: Observable<ApiMovieData | null> = of(null);

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
    });
    if (typeof this.id === 'number') {
      this.movie$ = this.movieService.getMovieByID(this.id);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  createMovie(val: {
    movieData: Partial<BasicMovieData>;
    movieFile: File | null;
    soundFile: File | null;
    previewImage: File | null;
  }) {
    this.movieService
      .createMovie(val.movieData)
      .pipe(
        switchMap(x => {
          return concat(
            this.fileService.uploadFile(val.movieFile, x.ID),
            this.fileService.uploadFile(val.soundFile, x.ID),
            this.fileService.uploadFile(val.previewImage, x.ID)
          );
        })
      )
      .subscribe(val => console.log(val));
  }
}
