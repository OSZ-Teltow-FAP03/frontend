export interface loginData {
  username: string;
  password: string;
}

export interface registerData extends loginData {
  email: string;
  foreName: string;
  lastName: string;
}
