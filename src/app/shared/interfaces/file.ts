export interface File {
  type: Type;
  path: string;
} //TODO: Dateiart z.B: bei Film mp4 usw.

export type Type = 'Movie' | 'Sound';
