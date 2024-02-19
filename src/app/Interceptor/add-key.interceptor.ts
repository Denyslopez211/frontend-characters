import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

import { environment } from '@environments/environments';
import { ErrorService } from './error.service';

@Injectable()
export class AddKeyInterceptor implements HttpInterceptor {
  private readonly errorService = inject(ErrorService);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        'X-RapidAPI-host': environment.rapid_host,
        'X-RapidAPI-Key': environment.rapid_key,
      },
    });

    return next
      .handle(request)
      .pipe(
        catchError((err: HttpErrorResponse) =>
          this.errorService.messageError(err)
        )
      );
  }
}
