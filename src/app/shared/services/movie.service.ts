/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable, Inject } from '@angular/core';
import { API_TOKEN } from '../api-token';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PROD_TOKEN } from '../production';
import {
  ApiMovieData,
  Auflösung,
  Bildformat,
  Lehrjahr,
  Movie,
  Programmtyp,
  Status,
  Tonformat,
  Videocodec,
  Videocontainer,
} from '../interfaces/movie';
import { Page, PageRequest } from '../pagination/pagination';
import { Query } from '../interfaces/query';
import { Observable, take, tap, BehaviorSubject, map, finalize } from 'rxjs';
import { compare } from '../functions/compare';
import { File } from '../interfaces/file';
import { EncryptedApiResponse } from '../interfaces/api-response';
import { decrypt, encrypt } from '../functions/crypto';
import { SECRET_TOKEN } from '../secret-key';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from './auth.service';
import { createBodyUrlencoded } from '../functions/create-body-urlencoded';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  storedMovie = new BehaviorSubject<Movie | null>(null);

  private _movieList$ = new BehaviorSubject<Array<Movie>>([]);

  get movieToEdit(): Observable<Movie | null> {
    return this.storedMovie.asObservable();
  }

  get movieList(): Observable<Array<Movie>> {
    return this._movieList$.asObservable();
  }

  get loading() {
    return this._loading$.asObservable();
  }

  private _loading$ = new BehaviorSubject<boolean>(false);

  filmsApi = `${this.api}/films`;

  constructor(
    @Inject(API_TOKEN) private readonly api: string,
    @Inject(SECRET_TOKEN) private readonly key: string,
    @Inject(PROD_TOKEN) private readonly prod: boolean,
    private readonly http: HttpClient,
    private readonly sanitizer: DomSanitizer,
    private readonly auth: AuthService
  ) {}

  getAllMovies(): Observable<Array<Movie>> {
    return this.http.get<EncryptedApiResponse>(`${this.filmsApi}/get`).pipe(
      tap(() => this._loading$.next(true)),
      finalize(() => this._loading$.next(false)),
      map(res => {
        if (res.data) {
          const data = decrypt(res.data, this.key);
          if (data === false) {
            return [];
          }
          const unsanitizedMovies = JSON.parse(data) as Array<ApiMovieData>;
          const movies = unsanitizedMovies.map(movie => {
            if (movie.Vorschaubild?.length > 0) {
              const sanitizedImg = this.sanitizer.bypassSecurityTrustUrl(
                'data:image/png;base64,' + movie.Vorschaubild
              );
              return { ...movie, Vorschaubild: sanitizedImg } as Movie;
            }
            const sanitizedImg = this.sanitizer.bypassSecurityTrustUrl('');
            return { ...movie, Vorschaubild: sanitizedImg };
          });
          return movies;
        }
        return [];
      }),
      map(movies => {
        movies.forEach(movie => {
          //TODO: Change Arrays to its corresponding types
          if (
            ['mono', 'stereo', 'dolby', 'dts', 'mpeg', 'mp3'].includes(
              movie.Tonformat ?? ''
            )
          ) {
            movie.Tonformat as Tonformat;
          } else {
            movie.Tonformat = undefined;
          }
          if (['4:3', '16:9', '21:9'].includes(movie.Bildformat ?? '')) {
            movie.Bildformat as Bildformat;
          } else {
            movie.Bildformat = undefined;
          }
          if (
            [
              'mp4',
              'mov',
              'wmv',
              'avi',
              'avchd',
              'flv',
              'f4v',
              'swf',
              'mkv',
              'webm',
              'html5',
              'html5',
              'quicktime',
              'asf',
              'mpeg',
              'mxf',
              'dv',
            ].includes(movie.Videocontainer ?? '')
          ) {
            movie.Videocontainer as Videocontainer;
          } else {
            movie.Videocontainer = undefined;
          }
          if (
            ['h.264', 'h.265', 'ffmpeg', 'apple', 'pro res'].includes(
              movie.Videocodec ?? ''
            )
          ) {
            movie.Videocodec as Videocodec;
          } else {
            movie.Videocodec = undefined;
          }
          if (
            ['hd720', 'hd1080', 'uhd4k', 'uhd8k'].includes(
              movie.Auflösung ?? ''
            )
          ) {
            movie.Auflösung as Auflösung;
          } else {
            movie.Auflösung = undefined;
          }
          if (
            [
              'unterricht',
              'wettbewerb',
              'abschlusssendung',
              'projekt vt',
            ].includes(movie.Programmtyp ?? '')
          ) {
            movie.Programmtyp as Programmtyp;
          } else {
            movie.Programmtyp = 'unterricht';
          }
          if (['1', '2', '3'].includes(movie.Lehrjahr ?? '')) {
            movie.Lehrjahr as Lehrjahr;
          } else {
            movie.Lehrjahr = undefined;
          }
          if (
            ['in ausbildung', 'ausbildung beendet'].includes(movie.Status ?? '')
          ) {
            movie.Status as Status;
          } else {
            movie.Status = 'in ausbildung';
          }
          movie.Status = movie.Status as Status;
        });
        return movies;
      })
    );
  }

  getMovieByID(id: number): Observable<Movie | null> {
    return this.getAllMovies().pipe(
      map(movies => {
        const movie = movies.find(x => x.ID === id);
        if (movie === undefined) {
          return null;
        }
        return movie;
      })
    );
  }

  searchMovies(query: Map<keyof Movie, string>) {
    this.movieList.pipe(
      map(movies => {
        const newMovieList: Array<Movie> = [];
        movies.forEach(movie => {
          Object.keys(movie).forEach(key => {
            if (query.has(key as keyof Movie)) {
              if (movie[key as keyof Movie] === query.get(key as keyof Movie)) {
                newMovieList.push(movie);
              }
            }
          });
          return newMovieList;
        });
      })
    );
  }

  createMovie(movie: Partial<Movie>) {
    const value = createBodyUrlencoded(
      [
        { key: 'Filmtitel', value: movie.Filmtitel! },
        { key: 'Status', value: movie.Status! },
        { key: 'Lehrjahr', value: movie.Lehrjahr! },
        { key: 'Stichworte', value: movie.Stichworte! },
        { key: 'Prüfstück', value: movie.Prüfstück! },
        { key: 'Programmtyp', value: movie.Programmtyp! },
        { key: 'Erzählsatz', value: movie.Erzählsatz! },
        {
          key: 'Upload',
          value:
            movie.Upload ??
            new Date().getUTCFullYear() +
              '-' +
              new Date().getUTCMonth() +
              '-' +
              new Date().getUTCDay(),
        },
        { key: 'Erstellungsdatum', value: movie.Erstellungsdatum! },
        { key: 'Mitwirkende', value: movie.Mitwirkende! },
        { key: 'Erscheinungsdatum', value: movie.Erscheinungsdatum! },
        { key: 'Tonformat', value: movie.Tonformat ?? '' },
        { key: 'Bildformat', value: movie.Bildformat ?? '' },
        { key: 'Bildfrequenz', value: movie.Bildfrequenz ?? '' },
        { key: 'Farbtiefe', value: movie.Farbtiefe ?? '' },
        { key: 'Videocontainer', value: movie.Videocontainer ?? '' },
        { key: 'Tonspurbelegung', value: movie.Tonspurbelegung ?? '' },
        { key: 'Timecode_Anfang', value: movie.Timecode_Anfang ?? '' },
        { key: 'Timecode_Ende', value: movie.Timecode_Ende ?? '' },
        { key: 'Dauer', value: movie.Dauer ?? '' },
        { key: 'Videocodec', value: movie.Videocodec ?? '' },
        { key: 'Auflösung', value: movie.Auflösung ?? '' },
        { key: 'Vorschaubild', value: movie.Vorschaubild ?? '' },
        { key: 'Autor', value: movie.Autor ?? '' },
        { key: 'Bemerkung', value: movie.Bemerkung ?? '' },
        { key: 'Bewertungen', value: movie.Bewertungen ?? '' },
        { key: 'Klasse', value: movie.Klasse ?? '' },
      ],
      this.key
    );

    const body = new HttpParams({
      fromObject: value,
    });

    return this.http.put<Movie>(`${this.filmsApi}/create`, body);
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
    if (movie.Erzählsatz && movie.Erzählsatz !== movieToEdit.Erzählsatz) {
      params.set('Erzählsatz', movie.Erzählsatz);
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

    return this.http.patch<Movie>(`${this.filmsApi}/update`, {
      Upload: movie.Upload,
      Erstellungsdatum: movie.Erstellungsdatum,
      Erscheinungsdatum: movie.Erscheinungsdatum,
      ...params,
    });
  }
  deleteMovie(id: number) {
    return this.http.delete<Movie>(`${this.filmsApi}/delete`, {
      params: { FilmID: id },
    });
  }
  listFilesOfFilm(id: number): Observable<Array<File>> {
    return this.http
      .get<EncryptedApiResponse>(`${this.filmsApi}/listFiles`, {
        params: { FilmID: id },
      })
      .pipe(
        map(x => {
          if (x.data) {
            const data = decrypt(x.data, this.key);
            if (data === false) {
              return [];
            }
            return JSON.parse(data) as Array<File>;
          }
          return [];
        })
      );
  }
  storeMovieToEdit(movie: Movie) {
    this.storedMovie.next(movie);
  }
  page(request: PageRequest, query: Query): Observable<Page<Movie>> {
    return this.getAllMovies().pipe(
      take(1),
      map(movies => {
        if (query.search.length > 0) {
          movies = movies.filter(
            movie =>
              movie.ID.toString()
                .toLowerCase()
                .includes(query.search.toLowerCase()) ||
              movie.Filmtitel.toLowerCase().includes(
                query.search.toLowerCase()
              ) ||
              movie.Klasse?.toLowerCase().includes(
                query.search.toLowerCase()
              ) ||
              movie.Dauer?.toLowerCase().includes(query.search.toLowerCase()) ||
              movie.Tonformat?.toLowerCase().includes(
                query.search.toLowerCase()
              ) ||
              movie.Bildformat?.toLowerCase().includes(
                query.search.toLowerCase()
              ) ||
              movie.Bildfrequenz?.toLowerCase().includes(
                query.search.toLowerCase()
              ) ||
              movie.Farbtiefe?.toLowerCase().includes(
                query.search.toLowerCase()
              ) ||
              movie.Videocontainer?.toLowerCase().includes(
                query.search.toLowerCase()
              ) ||
              movie.Tonspurbelegung?.toLowerCase().includes(
                query.search.toLowerCase()
              ) ||
              movie.Timecode_Anfang?.toLowerCase().includes(
                query.search.toLowerCase()
              ) ||
              movie.Timecode_Ende?.toLowerCase().includes(
                query.search.toLowerCase()
              ) ||
              movie.Videocodec?.toLowerCase().includes(
                query.search.toLowerCase()
              ) ||
              movie.Auflösung?.toLowerCase().includes(
                query.search.toLowerCase()
              ) ||
              movie.Erstellungsdatum.toString()
                .toLowerCase()
                .includes(query.search.toLowerCase()) ||
              movie.Autor?.toLowerCase().includes(query.search.toLowerCase()) ||
              movie.Programmtyp.toLowerCase().includes(
                query.search.toLowerCase()
              ) ||
              movie.Erzählsatz.toLowerCase().includes(
                query.search.toLowerCase()
              ) ||
              movie.Bemerkung?.toLowerCase().includes(
                query.search.toLowerCase()
              ) ||
              movie.Mitwirkende.toLowerCase().includes(
                query.search.toLowerCase()
              ) ||
              movie.Bewertungen?.toLowerCase().includes(
                query.search.toLowerCase()
              ) ||
              movie.Upload.toString()
                .toLowerCase()
                .includes(query.search.toLowerCase()) ||
              movie.Status.toLowerCase().includes(query.search.toLowerCase()) ||
              movie.Lehrjahr?.toLowerCase().includes(
                query.search.toLowerCase()
              ) ||
              movie.Stichworte.toLowerCase().includes(
                query.search.toLowerCase()
              )
          );
        }
        return movies;
      }),
      map(movies => {
        const sort = request.sort;
        return movies.sort((a, b) => {
          const isAsc = sort.direction === 'asc';
          switch (sort.active) {
            case 'ID':
              return compare(a.ID, b.ID, isAsc);
            default:
              return 0;
          }
        });
      }),
      map(movies => {
        return {
          content: movies,
          number: request.page,
          size: request.size,
          totalElements: movies.length,
        };
      }),
      map(page => {
        page.content = page.content.slice(
          request.page * request.size,
          request.page * request.size + request.size
        );
        return page;
      })
    );
  }
}
