import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movie } from 'src/app/shared/interfaces/movie';

@Component({
  selector: 'app-movie-info-dialog',
  templateUrl: './movie-info-dialog.component.html',
  styleUrls: ['./movie-info-dialog.component.scss'],
})
export class MovieInfoDialogComponent {
  hover = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Movie,
    public dialogRef: MatDialogRef<MovieInfoDialogComponent>
  ) {}
  edit() {
    console.log('edit');
  }
  download() {
    console.log('download');
  }
  playMovie() {
    console.log('play movie');
  }
  playSound() {
    console.log('play sound');
  }
  moreInfo() {
    console.log('more info');
  }
}
