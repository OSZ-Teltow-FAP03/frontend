import { InjectionToken } from '@angular/core';

export const PROD_TOKEN = new InjectionToken<boolean>(
  'holds the token to determine if application is in production mode'
);
