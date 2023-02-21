import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { API_TOKEN } from '../api-token';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(
    @Inject(API_TOKEN) private readonly api: string,
    private readonly http: HttpClient
  ) {}

  filesApi = `${this.api}/files`;

  streamFile(id: number) {
    this.http.get(`${this.filesApi}/stream`, {
      params: { FileID: id },
    });
  }
  downlaodFile(id: number) {
    this.http.get(`${this.filesApi}/download`, {
      params: { FileID: id },
    });
  }
  uplaodFile(file: any, id: number) {
    this.http.post(`${this.filesApi}/upload`, {
      params: { FilmID: id, file: file },
    });
  }
}
