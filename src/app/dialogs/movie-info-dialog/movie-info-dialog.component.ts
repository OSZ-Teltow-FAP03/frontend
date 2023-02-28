import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { File } from 'src/app/shared/interfaces/file';
import { Movie } from 'src/app/shared/interfaces/movie';
import { MovieService } from 'src/app/shared/services/movie.service';

@Component({
  selector: 'app-movie-info-dialog',
  templateUrl: './movie-info-dialog.component.html',
  styleUrls: ['./movie-info-dialog.component.scss'],
})
export class MovieInfoDialogComponent {
  hover = false;
  hasMovieFile = false;
  movieFile: File | null = null;
  hasSoundFile = false;
  soundFile: File | null = null;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Movie,
    public dialogRef: MatDialogRef<MovieInfoDialogComponent>,
    private readonly movieService: MovieService,
    private readonly router: Router
  ) {
    movieService.listFilesOfFilm(data.ID).subscribe({
      next: filesArray => {
        filesArray.forEach(file => {
          switch (file.type) {
            case 'Movie':
              this.hasMovieFile = true;
              this.movieFile = file;
              break;
            case 'Sound':
              this.hasSoundFile = true;
              this.soundFile = file;
              break;
          }
        });
      },
    });
  }
  edit() {
    this.dialogRef.close();
    this.movieService.storeMovieToEdit(this.data);
    this.router.navigate(['/edit-video', this.data.ID]);
  }
  download() {
    console.log('download');
  }
  playMovie() {
    this.dialogRef.close();
    this.router.navigate(['player']);
    console.log('play movie');
  }
  playSound() {
    console.log('play sound');
  }
  moreInfo() {
    console.log('more info');
  }
}
