import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/aut.service';
import { exhaustMap, filter, take } from 'rxjs/operators';
import { User } from './user.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return this.authService.user.pipe(
      take(1),
      filter((user): user is User => !!user),
      exhaustMap((user: User) => {
        console.log(user.token);
        if (user.token === null) {
          return next.handle(request);
        }
        const modifiedReq = request.clone({
          params: new HttpParams().set('auth', user.token!),
        });
        return next.handle(modifiedReq);
      }),
    );
  }
}
