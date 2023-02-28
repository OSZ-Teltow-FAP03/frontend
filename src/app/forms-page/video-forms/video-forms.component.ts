import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  ApiMovieData,
  Auflösung,
  BasicMovieData,
  Bildformat,
  Lehrjahr,
  Movie,
  Programmtyp,
  Status,
  Tonformat,
  Videocodec,
  Videocontainer,
} from 'src/app/shared/interfaces/movie';
import { getErrorMessage } from 'src/app/shared/functions/get-error-message';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-video-forms',
  templateUrl: './video-forms.component.html',
  styleUrls: ['./video-forms.component.scss'],
})
export class VideoFormsComponent {
  @Output() submitForm = new EventEmitter<{
    movieData: Partial<BasicMovieData>;
    movieFile: File | null;
    soundFile: File | null;
    previewImage: File | null;
  }>();
  @Output() addVideo = new EventEmitter<File | null>();
  @Output() addSound = new EventEmitter<File | null>();
  @Output() addPreviewImage = new EventEmitter<File | null>();

  _movie!: ApiMovieData | null;
  get movie(): ApiMovieData | null {
    return this._movie;
  }
  @Input() set movie(value: ApiMovieData | null) {
    this._movie = value;
    if (value !== null) {
      this.setFormValue(value);
    }
  }

  addVideoFile = false;
  addSoundFile = false;

  constructor(private readonly fb: FormBuilder) {
    console.log(this.movie);
  }

  getErrorMessage = getErrorMessage;

  nfb = this.fb.nonNullable;

  setFormValue(x: ApiMovieData) {
    console.log(x.Erscheinungsdatum);
    console.log(x.Erscheinungsdatum.getMonth());

    this.videoForm.controls.title.setValue(x.Filmtitel);
    this.videoForm.controls.soundformat.setValue(x.Tonformat ?? '');
    this.videoForm.controls.imageformat.setValue(x.Bildformat ?? '');
    this.videoForm.controls.framerate.setValue(x.Bildfrequenz ?? '');
    this.videoForm.controls.colourdepth.setValue(x.Farbtiefe ?? '');
    this.videoForm.controls.videocontainer.setValue(x.Videocontainer ?? '');
    this.videoForm.controls.soundtracing.setValue(x.Tonspurbelegung ?? '');
    this.videoForm.controls.duration.setValue(x.Dauer ?? '');
    this.videoForm.controls.videocodec.setValue(x.Videocodec ?? '');
    this.videoForm.controls.resolution.setValue(x.Auflösung ?? '');
    this.videoForm.controls.releasedate.setValue(
      x.Erscheinungsdatum.getFullYear() +
        '-' +
        (x.Erscheinungsdatum.getMonth() + 1).toString().padStart(2, '0') +
        '-' +
        x.Erscheinungsdatum.getUTCDate().toString().padStart(2, '0')
    );
    this.videoForm.controls.author.setValue(x.Autor ?? '');
    this.videoForm.controls.programtype.setValue(x.Programmtyp ?? '');
    this.videoForm.controls.narrativesentence.setValue(x.Erzaehlsatz);
    this.videoForm.controls.comment.setValue(x.Bemerkung ?? '');
    this.videoForm.controls.creationdate.setValue(
      x.Erstellungsdatum.getFullYear() +
        '-' +
        (x.Erscheinungsdatum.getMonth() + 1).toString().padStart(2, '0') +
        '-' +
        x.Erstellungsdatum.getUTCDate().toString().padStart(2, '0')
    );
    this.videoForm.controls.class.setValue(x.Klasse ?? '');

    this.videoForm.controls.contributors.setValue(x.Mitwirkende);
    this.videoForm.controls.rating.setValue(x.Bewertungen ?? '');
    this.videoForm.controls.apprenticeshipyear.setValue(x.Lehrjahr ?? '');
    this.videoForm.controls.status.setValue(x.Status);
    this.videoForm.controls.keywords.setValue(x.Stichworte);
    this.videoForm.controls.testpiece.setValue(x.Prüfstück);
  }

  videoForm = this.nfb.group({
    file: [null],
    sound: [null],
    image: [null],
    title: [
      this.movie?.Filmtitel ?? '',
      [Validators.required, Validators.maxLength(50)],
    ],
    soundformat: [this.movie?.Tonformat ?? ''],
    imageformat: [this.movie?.Bildformat ?? ''],
    framerate: [this.movie?.Bildfrequenz ?? '', Validators.maxLength(10)],
    colourdepth: [this.movie?.Farbtiefe ?? '', Validators.maxLength(10)],
    videocontainer: [this.movie?.Videocontainer ?? ''],
    soundtracing: [this.movie?.Tonspurbelegung ?? ''],
    duration: [this.movie?.Dauer ?? ''],
    videocodec: [this.movie?.Videocodec ?? ''],
    resolution: [this.movie?.Auflösung ?? ''],
    releasedate: [this.movie?.Erscheinungsdatum ?? '', Validators.required],
    author: [this.movie?.Autor ?? ''],
    programtype: [this.movie?.Programmtyp ?? '', Validators.required],
    narrativesentence: [
      this.movie?.Erzaehlsatz ?? '',
      [Validators.required, Validators.maxLength(1000)],
    ],
    comment: [this.movie?.Bemerkung ?? '', Validators.maxLength(100)],
    creationdate: [this.movie?.Erstellungsdatum ?? '', Validators.required],
    class: [this.movie?.Klasse ?? ''],
    contributors: [this.movie?.Mitwirkende ?? '', Validators.required],
    rating: [this.movie?.Bewertungen ?? '', Validators.maxLength(200)],
    apprenticeshipyear: [this.movie?.Lehrjahr ?? '', Validators.required],
    status: [this.movie?.Status ?? '', Validators.required],
    keywords: [this.movie?.Stichworte ?? '', Validators.required],
    testpiece: [this.movie?.Prüfstück ?? false],
  });

  submit() {
    console.log(this.videoForm.value);
    const movie: Partial<BasicMovieData> = {
      Erscheinungsdatum: new Date(this.videoForm.controls.releasedate.value),
      Erstellungsdatum: new Date(this.videoForm.controls.creationdate.value),
      Erzaehlsatz: this.videoForm.controls.narrativesentence.value,
      Filmtitel: this.videoForm.controls.title.value,
      Mitwirkende: this.videoForm.controls.contributors.value,
      Programmtyp: this.videoForm.controls.programtype.value as Programmtyp,
      Prüfstück: this.videoForm.controls.testpiece.value,
      Status: this.videoForm.controls.status.value as Status,
      Stichworte: this.videoForm.controls.keywords.value,
    };

    if (this.videoForm.controls.soundformat.value.length > 0) {
      movie.Tonformat = this.videoForm.controls.soundformat.value as Tonformat;
    }
    if (this.videoForm.controls.imageformat.value.length > 0) {
      movie.Bildformat = this.videoForm.controls.imageformat
        .value as Bildformat;
    }
    if (this.videoForm.controls.videocontainer.value.length > 0) {
      movie.Videocontainer = this.videoForm.controls.videocontainer
        .value as Videocontainer;
    }
    if (this.videoForm.controls.soundtracing.value.length > 0) {
      movie.Tonspurbelegung = this.videoForm.controls.soundtracing.value;
    }
    if (this.videoForm.controls.duration.value.length > 0) {
      movie.Dauer = this.videoForm.controls.duration.value;
    }
    if (this.videoForm.controls.videocodec.value.length > 0) {
      movie.Videocodec = this.videoForm.controls.videocodec.value as Videocodec;
    }
    if (this.videoForm.controls.resolution.value.length > 0) {
      movie.Auflösung = this.videoForm.controls.resolution.value as Auflösung;
    }
    if (this.videoForm.controls.author.value.length > 0) {
      movie.Autor = this.videoForm.controls.author.value;
    }
    if (this.videoForm.controls.comment.value.length > 0) {
      movie.Bemerkung = this.videoForm.controls.comment.value;
    }
    if (this.videoForm.controls.class.value.length > 0) {
      movie.Klasse = this.videoForm.controls.class.value;
    }
    if (this.videoForm.controls.rating.value.length > 0) {
      movie.Bewertungen = this.videoForm.controls.rating.value;
    }
    if (this.videoForm.controls.status.value.length > 0) {
      movie.Status = this.videoForm.controls.status.value as Status;
    }
    if (this.videoForm.controls.apprenticeshipyear.value.length > 0) {
      movie.Lehrjahr = this.videoForm.controls.apprenticeshipyear
        .value as Lehrjahr;
    }
    this.submitForm.emit({
      movieData: movie,
      movieFile: this.videoForm.controls.file.value,
      soundFile: this.videoForm.controls.sound.value,
      previewImage: this.videoForm.controls.image.value,
    });
  }

  toggleVideoFile() {
    this.addVideoFile = !this.addVideoFile;
    if (this.addVideoFile === true) {
      this.videoForm.controls.file.addValidators(Validators.required);
      this.videoForm.controls.image.addValidators(Validators.required);
    } else {
      this.videoForm.controls.file.removeValidators(Validators.required);
      this.videoForm.controls.image.removeValidators(Validators.required);
    }
  }

  toggleSoundFile() {
    this.addSoundFile = !this.addSoundFile;
    if (this.addSoundFile === true) {
      this.videoForm.controls.sound.addValidators(Validators.required);
    } else {
      this.videoForm.controls.sound.removeValidators(Validators.required);
    }
  }
}
