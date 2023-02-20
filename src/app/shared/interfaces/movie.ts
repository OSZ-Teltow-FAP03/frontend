import { Time } from '@angular/common';
import { SafeUrl } from '@angular/platform-browser';

export interface ApiMovieData {
  ID: number;
  Filmtitel: string;
  Erscheinungsdatum: Date;
  Klasse: string;
  Dauer: Time;
  Tonformat: Tonformat; // TODO: welche gibt es
  Bildformat: Bildformat; // TODO: welche gibt es
  Bildfrequenz: string;
  Farbtiefe: string;
  Videocontainer: string;
  Tonspurbelegung: string; //TODO: welche gibt es
  Timecode_Anfang: Time;
  Timecode_Ende: Time;
  Videocodec: Videocodec; // TODO: welche gibt es
  Auflösung: string;
  Erstellungsdatum: Date;
  Autor: string;
  Programmtyp: Programmtyp; // TODO: welche gibt es
  Erzaehlsatz: string;
  Bemerkung: string;
  Mitwirkende: string;
  Bewertungen: string;
  Upload: Date;
  Status: Status; // TODO: welche gibt es
  Lehrjahr: string;
  Stichworte: string;
  Vorschaubild: string; // Base64 string
}

export interface Movie {
  ID: number;
  Filmtitel: string;
  Erscheinungsdatum: Date;
  Klasse: string;
  Dauer: Time;
  Tonformat: Tonformat; // TODO: welche gibt es
  Bildformat: Bildformat; // TODO: welche gibt es
  Bildfrequenz: string;
  Farbtiefe: string;
  Videocontainer: string;
  Tonspurbelegung: string; //TODO: welche gibt es
  Timecode_Anfang: Time;
  Timecode_Ende: Time;
  Videocodec: Videocodec; // TODO: welche gibt es
  Auflösung: string;
  Erstellungsdatum: Date;
  Autor: string;
  Programmtyp: Programmtyp; // TODO: welche gibt es
  Erzaehlsatz: string;
  Bemerkung: string;
  Mitwirkende: string;
  Bewertungen: string;
  Upload: Date;
  Status: Status; // TODO: welche gibt es
  Lehrjahr: string;
  Stichworte: string;
  Vorschaubild: SafeUrl;
}

export type Tonformat = '11' | '12' | '13' | '4';
export type Bildformat = '12' | '13' | '4';
export type Programmtyp = '12' | '13' | '4';
export type Status = '11' | '12' | '13' | '4';
export type Videocodec = '11' | '12' | '13' | '4';
