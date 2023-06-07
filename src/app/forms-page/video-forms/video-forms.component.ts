import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
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
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-forms',
  templateUrl: './video-forms.component.html',
  styleUrls: ['./video-forms.component.scss'],
})
export class VideoFormsComponent {
  @Output() submitForm = new EventEmitter<{
    movieData: Partial<BasicMovieData>;
    movieFile: File | Array<File> | null;
    soundFile: File | Array<File> | null;
    previewImage: File | null;
  }>();
  @Output() addVideo = new EventEmitter<File | Array<File> | null>();
  @Output() addSound = new EventEmitter<File | Array<File> | null>();
  @Output() addPreviewImage = new EventEmitter<File | null>();

  _movie!: Movie | null;
  get movie(): Movie | null {
    return this._movie;
  }
  @Input() set movie(value: Movie | null) {
    this._movie = value;
    if (value !== null) {
      this.setFormValue(value);
    }
  }

  @Input() disabled: boolean | null = false;

  addVideoFile = false;
  addSoundFile = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {}

  getErrorMessage = getErrorMessage;

  nfb = this.fb.nonNullable;

  setFormValue(x: Movie) {
    const noValue = '';

    this.videoForm.patchValue({
      title: x.Filmtitel,
      soundformat: x.Tonformat ?? noValue,
      imageformat: x.Bildformat ?? noValue,
      framerate: x.Bildfrequenz ?? noValue,
      colourdepth: x.Farbtiefe ?? noValue,
      videocontainer: x.Videocontainer ?? noValue,
      soundtracing: x.Tonspurbelegung ?? noValue,
      duration: x.Dauer?.slice(0, 5) ?? noValue,
      videocodec: x.Videocodec ?? noValue,
      resolution: x.Auflösung ?? noValue,
      releasedate:
        new Date(x.Erscheinungsdatum).getFullYear() +
        '-' +
        (new Date(x.Erscheinungsdatum).getMonth() + 1)
          .toString()
          .padStart(2, '0') +
        '-' +
        new Date(x.Erscheinungsdatum).getUTCDate().toString().padStart(2, '0'),
      author: x.Autor ?? noValue,
      programtype: x.Programmtyp ?? noValue,
      narrativesentence: x.Erzählsatz,
      comment: x.Bemerkung ?? noValue,
      creationdate:
        new Date(x.Erstellungsdatum).getFullYear() +
        '-' +
        (new Date(x.Erscheinungsdatum).getMonth() + 1)
          .toString()
          .padStart(2, '0') +
        '-' +
        new Date(x.Erstellungsdatum).getUTCDate().toString().padStart(2, '0'),
      testpiece: x.Prüfstück,
      status: x.Status,
      apprenticeshipyear: x.Lehrjahr ?? noValue,
      class: x.Klasse ?? noValue,
      contributors: x.Mitwirkende,
      keywords: x.Stichworte,
      rating: x.Bewertungen ?? noValue,
    });

    if (this.disabled) {
      this.videoForm.controls.class.disable();
      this.videoForm.controls.contributors.disable();
      this.videoForm.controls.rating.disable();
      this.videoForm.controls.apprenticeshipyear.disable();
      this.videoForm.controls.status.disable();
      this.videoForm.controls.keywords.disable();
      this.videoForm.controls.testpiece.disable();
      this.videoForm.controls.title.disable();
      this.videoForm.controls.soundformat.disable();
      this.videoForm.controls.imageformat.disable();
      this.videoForm.controls.framerate.disable();
      this.videoForm.controls.colourdepth.disable();
      this.videoForm.controls.videocontainer.disable();
      this.videoForm.controls.soundtracing.disable();
      this.videoForm.controls.duration.disable();
      this.videoForm.controls.videocodec.disable();
      this.videoForm.controls.resolution.disable();
      this.videoForm.controls.releasedate.disable();
      this.videoForm.controls.author.disable();
      this.videoForm.controls.programtype.disable();
      this.videoForm.controls.narrativesentence.disable();
      this.videoForm.controls.comment.disable();
      this.videoForm.controls.creationdate.disable();
      this.videoForm.controls.class.disable();
      this.videoForm.controls.contributors.disable();
      this.videoForm.controls.rating.disable();
      this.videoForm.controls.apprenticeshipyear.disable();
      this.videoForm.controls.status.disable();
      this.videoForm.controls.keywords.disable();
      this.videoForm.controls.testpiece.disable();
    }
  }

  videoForm = this.nfb.group({
    file: [''],
    sound: [''],
    image: [''],
    title: ['', [Validators.required, Validators.maxLength(50)]],
    soundformat: [''],
    imageformat: [''],
    framerate: ['', Validators.maxLength(10)],
    colourdepth: ['', Validators.maxLength(10)],
    videocontainer: [''],
    soundtracing: [''],
    duration: [''],
    videocodec: [''],
    resolution: [''],
    releasedate: ['', Validators.required],
    author: ['', [Validators.required]],
    programtype: ['', Validators.required],
    narrativesentence: ['', [Validators.required, Validators.maxLength(1000)]],
    comment: ['', Validators.maxLength(100)],
    creationdate: ['', Validators.required],
    class: [''],
    contributors: ['', Validators.required],
    rating: ['', Validators.maxLength(200)],
    apprenticeshipyear: ['', Validators.required],
    status: ['', Validators.required],
    keywords: ['', Validators.required],
    testpiece: [false],
  });

  submit() {
    const movie: Partial<BasicMovieData> = {
      Erscheinungsdatum: this.videoForm.controls.releasedate.value,
      Erstellungsdatum: this.videoForm.controls.creationdate.value,
      Erzählsatz: this.videoForm.controls.narrativesentence.value,
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
      movieFile: this.videoForm.controls.file.value as unknown as
        | File
        | Array<File>
        | null,
      soundFile: this.videoForm.controls.sound.value as unknown as
        | File
        | Array<File>
        | null,
      previewImage: this.videoForm.controls.image
        .value as unknown as File | null,
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
