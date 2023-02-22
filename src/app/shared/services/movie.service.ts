import { Injectable, Inject } from '@angular/core';
import { Movie } from '../interfaces/movie';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_TOKEN } from '../api-token';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  storedMovie = new BehaviorSubject<Movie | null>(null);

  get movieToPlay(): Observable<Movie | null> {
    return this.storedMovie.asObservable();
  }

  filmsApi = `${this.api}/films`;

  constructor(
    @Inject(API_TOKEN) private readonly api: string,
    private readonly http: HttpClient
  ) {}

  getAllMovies() {
    this.http.get<Array<Movie>>(`${this.filmsApi}/get`);
  }
  searchMovies(query: string) {
    this.http.get<Movie>(`${this.filmsApi}/get`, {
      params: { filmQuery: query },
    });
  }
  createMovie(movie: Partial<Movie>) {
    this.http.post<Movie>(`${this.filmsApi}/create`, {
      params: {
        Filmtitel: movie.Filmtitel, // encrypted string -- Required
        Status: movie.Status, // encrypted string -- Required
        Lehrjahr: movie.Lehrjahr, // encrypted integer -- Required
        Stichworte: movie.Stichworte, // encrypted string -- Required
        Prüfstück: movie.Prüfstück, // encrypted 1 or 0 -- Required
        Programmtyp: movie.Programmtyp, // encrypted string -- Required
        Erzählsatz: movie.Erzaehlsatz, // encrypted string -- Required
        Upload: movie.Upload, // encrypted date -- Required
        Erstellungsdatum: movie.Erstellungsdatum, // encrypted date -- Required
        Mitwirkende: movie.Mitwirkende, // encrypted string -- Required
        Erscheinungsdatum: movie.Stichworte, // encrypted date -- Required
        Tonformat: movie.Tonformat, // encrypted string -- Optional
        Bildformat: movie.Bildformat, // encrypted string -- Optional
        Bildfrequenz: movie.Bildfrequenz, // encrypted string -- Optional
        Farbtiefe: movie.Farbtiefe, // encrypted string -- Optional
        Videocontainer: movie.Videocontainer, // encrypted string -- Optional
        Tonspurbelegung: movie.Tonspurbelegung, // encrypted string -- Optional
        Timecode_Anfang: movie.Timecode_Anfang, // encrypted string -- Optional
        Timecode_Ende: movie.Timecode_Ende, // encrypted string -- Optional
        Dauer: movie.Dauer, // encrypted string -- Optional
        Videocodec: movie.Videocodec, // encrypted string -- Optional
        Auflösung: movie.Auflösung, // encrypted string -- Optional
        Vorschaubild: movie.Vorschaubild, // encrypted string -- Optional
        Autor: movie.Autor, // encrypted string -- Optional
        Bemerkung: movie.Bemerkung, // encrypted string -- Optional
        Bewertungen: movie.Bewertungen, // encrypted string -- Optional
        Klasse: movie.Klasse, // encrypted string-- Optional
      },
    });
  }
  editMovie(movie: Partial<Movie>, movieToEdit: Movie) {
    const params = new HttpParams();
    if (movie.Filmtitel && movie.Filmtitel !== movieToEdit.Filmtitel) {
      params.set('Filmtitel', movie.Filmtitel);
    }
    if (movie.Status && movie.Status !== movieToEdit.Status) {
      params.set('Status', movie.Status);
    }
    if (movie.Lehrjahr && movie.Lehrjahr !== movieToEdit.Lehrjahr) {
      params.set('Lehrjahr', movie.Lehrjahr);
    }
    if (movie.Stichworte && movie.Stichworte !== movieToEdit.Stichworte) {
      params.set('Stichworte', movie.Stichworte);
    }
    if (movie.Prüfstück && movie.Prüfstück !== movieToEdit.Prüfstück) {
      params.set('Prüfstück', movie.Prüfstück);
    }
    if (movie.Programmtyp && movie.Programmtyp !== movieToEdit.Programmtyp) {
      params.set('Programmtyp', movie.Programmtyp);
    }
    if (movie.Erzaehlsatz && movie.Erzaehlsatz !== movieToEdit.Erzaehlsatz) {
      params.set('Erzählsatz', movie.Erzaehlsatz);
    }
    if (movie.Mitwirkende && movie.Mitwirkende !== movieToEdit.Mitwirkende) {
      params.set('Mitwirkende', movie.Mitwirkende);
    }
    if (movie.Tonformat && movie.Tonformat !== movieToEdit.Tonformat) {
      params.set('Tonformat', movie.Tonformat);
    }
    if (movie.Bildformat && movie.Bildformat !== movieToEdit.Bildformat) {
      params.set('Bildformat', movie.Bildformat);
    }
    if (movie.Bildfrequenz && movie.Bildfrequenz !== movieToEdit.Bildfrequenz) {
      params.set('Bildfrequenz', movie.Bildfrequenz);
    }
    if (movie.Farbtiefe && movie.Farbtiefe !== movieToEdit.Farbtiefe) {
      params.set('Farbtiefe', movie.Farbtiefe);
    }
    if (
      movie.Videocontainer &&
      movie.Videocontainer !== movieToEdit.Videocontainer
    ) {
      params.set('Videocontainer', movie.Videocontainer);
    }
    if (
      movie.Tonspurbelegung &&
      movie.Tonspurbelegung !== movieToEdit.Tonspurbelegung
    ) {
      params.set('Tonspurbelegung', movie.Tonspurbelegung);
    }
    if (
      movie.Timecode_Anfang &&
      movie.Timecode_Anfang !== movieToEdit.Timecode_Anfang
    ) {
      params.set('Timecode_Anfang', movie.Timecode_Anfang);
    }
    if (
      movie.Timecode_Ende &&
      movie.Timecode_Ende !== movieToEdit.Timecode_Ende
    ) {
      params.set('Timecode_Ende', movie.Timecode_Ende);
    }
    if (movie.Dauer && movie.Dauer !== movieToEdit.Dauer) {
      params.set('Dauer', movie.Dauer);
    }
    if (movie.Videocodec && movie.Videocodec !== movieToEdit.Videocodec) {
      params.set('Videocodec', movie.Videocodec);
    }
    if (movie.Auflösung && movie.Auflösung !== movieToEdit.Auflösung) {
      params.set('Auflösung', movie.Auflösung);
    }
    if (movie.Vorschaubild && movie.Vorschaubild !== movieToEdit.Vorschaubild) {
      //TODO: File upload
    }
    if (movie.Autor && movie.Autor !== movieToEdit.Autor) {
      params.set('Autor', movie.Autor);
    }
    if (movie.Bemerkung && movie.Bemerkung !== movieToEdit.Bemerkung) {
      params.set('Bemerkung', movie.Bemerkung);
    }
    if (movie.Bemerkung && movie.Bemerkung !== movieToEdit.Bemerkung) {
      params.set('Bemerkung', movie.Bemerkung);
    }
    if (movie.Klasse && movie.Klasse !== movieToEdit.Klasse) {
      params.set('Klasse', movie.Klasse);
    }

    this.http.patch<Movie>(`${this.filmsApi}/update`, {
      Upload: movie.Upload,
      Erstellungsdatum: movie.Erstellungsdatum,
      Erscheinungsdatum: movie.Erscheinungsdatum,
      ...params,
    });
  }
  deleteMovie(id: number) {
    this.http.delete<Movie>(`${this.filmsApi}/delete`, {
      params: { FilmID: id },
    });
  }
  listFilesOfFilm(id: number) {
    this.http.get<Movie>(`${this.filmsApi}/listFiles`, {
      params: { FilmID: id },
    });
  }
  storeMovieToPlay(movie: Movie) {
    this.storedMovie.next(movie);
  }
}
