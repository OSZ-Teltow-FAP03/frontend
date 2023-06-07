import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, retry, of, finalize, tap } from 'rxjs';
import { LoadingService } from './services/loading.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private readonly loadingService: LoadingService) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(() => (this.loadingService.laoding = true)),
      catchError((err: HttpErrorResponse) => {
        let errorMsg = '';
        if (err.status === 0) {
          errorMsg =
            'Es konnte keine Verbindung zum Backend hergestellt werden (0)';
        } else {
          errorMsg = `${err.error.msg} (${err.error.code})`;
        }
        return of();
      }),
      finalize(() => (this.loadingService.laoding = false))
    );
  }
}
