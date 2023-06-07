import { EncryptedData } from './encrypted-data';

export interface EncryptedApiResponse {
  code: number;
  msg: string;
  data?: EncryptedData;
}
export interface DecryptedApiResponse<P> {
  code: number;
  msg: string;
  data?: P;
}
