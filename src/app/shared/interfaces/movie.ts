import { SafeUrl } from '@angular/platform-browser';

export interface BasicMovieData {
  ID: number;
  Filmtitel: string;
  Erscheinungsdatum: string;
  Klasse?: string;
  Dauer?: string;
  Tonformat?: Tonformat;
  Bildformat?: Bildformat;
  Bildfrequenz?: string;
  Farbtiefe?: string;
  Videocontainer?: Videocontainer;
  Tonspurbelegung?: string;
  Timecode_Anfang?: string;
  Timecode_Ende?: string;
  Videocodec?: Videocodec;
  Auflösung?: Auflösung;
  Erstellungsdatum: string;
  Autor?: string;
  Programmtyp: Programmtyp;
  Erzählsatz: string;
  Bemerkung?: string;
  Mitwirkende: string;
  Bewertungen?: string;
  Upload: string;
  Status: Status;
  Lehrjahr?: Lehrjahr;
  Stichworte: string;
  Prüfstück: boolean;
}

export interface ApiMovieData extends BasicMovieData {
  Vorschaubild: string; // Base64 string
}

export interface Movie extends BasicMovieData {
  Vorschaubild: SafeUrl;
}

export type Tonformat = 'mono' | 'stereo' | 'dolby' | 'dts' | 'mpeg' | 'mp3';
export type Bildformat = '4:3' | '16:9' | '21:9';
export type Videocontainer =
  | 'mp4'
  | 'mov'
  | 'wmv'
  | 'avi'
  | 'avchd'
  | 'flv'
  | 'f4v'
  | 'swf'
  | 'mkv'
  | 'webm'
  | 'html5'
  | 'html5'
  | 'quicktime'
  | 'asf'
  | 'mpeg'
  | 'mxf'
  | 'dv';
export type Videocodec = 'h.264' | 'h.265' | 'ffmpeg' | 'apple' | 'pro res';
export type Auflösung = 'hd720' | 'hd1080' | 'uhd4k' | 'uhd8k';
export type Programmtyp =
  | 'unterricht'
  | 'wettbewerb'
  | 'abschlusssendung'
  | 'projekt vt';
export type Lehrjahr = '1' | '2' | '3';
export type Status = 'in ausbildung' | 'ausbildung beendet';
