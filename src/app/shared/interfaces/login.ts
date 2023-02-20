export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData extends LoginData {
  email: string;
  foreName: string;
  lastName: string;
}
