export interface BackendResponse {
  msg: string;
  code: number;
  err?: Error;
  data?: { data: string; iv: string; auth: string };
}
