import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  concat,
  BehaviorSubject,
  Subscription,
  switchMap,
  tap,
  Observable,
  of,
  take,
} from 'rxjs';
import { BasicMovieData, Movie } from '../shared/interfaces/movie';
import { FileService } from '../shared/services/file.service';
import { MovieService } from '../shared/services/movie.service';

@Component({
  selector: 'app-forms-page',
  templateUrl: './forms-page.component.html',
  styleUrls: ['./forms-page.component.scss'],
})
export class FormsPageComponent implements OnInit, OnDestroy {
  constructor(
    private readonly movieService: MovieService,
    private readonly fileService: FileService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}
  sub!: Subscription;
  movie$: Observable<Movie | null> = of(null);
  disabled$ = new BehaviorSubject<boolean>(false);

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = +params['id'];
      if (
        this.route.snapshot.url[0].toString() === ('edit-video' || 'new-video')
      ) {
        this.disabled$.next(false);
      } else {
        this.disabled$.next(true);
      }
      if (typeof id === 'number' && !isNaN(id)) {
        this.movie$ = this.movieService.getMovieByID(id).pipe(
          tap(x => {
            if (x === null) {
              this.router.navigate(['new-video']);
            }
          })
        );
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  formSubmit(val: {
    movieData: Partial<BasicMovieData>;
    movieFile: File | Array<File> | null;
    soundFile: File | Array<File> | null;
    previewImage: File | null;
  }) {
    if (this.route.snapshot.url[0].toString() === 'edit-video') {
      this.createMovie(val);
    } else {
      this.editMovie(val);
    }
  }

  createMovie(val: {
    movieData: Partial<BasicMovieData>;
    movieFile: File | Array<File> | null;
    soundFile: File | Array<File> | null;
    previewImage: File | null;
  }) {
    this.movieService
      .createMovie(val.movieData)
      .pipe(
        switchMap(x => {
          return concat(
            this.fileService.uploadFile(val.movieFile, x.ID),
            this.fileService.uploadFile(val.soundFile, x.ID), //TODO: change
            this.fileService.uploadFile(val.previewImage, x.ID)
          );
        })
      )
      .subscribe();
  }

  editMovie(val: {
    movieData: Partial<BasicMovieData>;
    movieFile: File | Array<File> | null;
    soundFile: File | Array<File> | null;
    previewImage: File | null;
  }) {
    if (val.movieData.ID) {
      this.movieService
        .getMovieByID(val.movieData.ID)
        .pipe(take(1))
        .subscribe(x => {
          if (x !== null) {
            this.movieService.editMovie(val.movieData, x).pipe(
              switchMap(x => {
                return concat(
                  this.fileService.uploadFile(val.movieFile, x.ID),
                  this.fileService.uploadFile(val.soundFile, x.ID),
                  this.fileService.uploadFile(val.previewImage, x.ID)
                );
              })
            );
            //TODO: ELSE ERROR
          }
        });
    }
  }
}
