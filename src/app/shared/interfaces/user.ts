export interface User {
  ID: number;
  name: string;
  lastname: string;
  username: string;
  email: string;
  role?: string;
}
export interface RegisterUser {
  name: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
}
