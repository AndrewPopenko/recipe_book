import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Api } from '../api/api';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../auth/user.model';
import { Router } from '@angular/router';

export interface AutResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: number;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly newUser: User = new User('', '', null, new Date());
  user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    this.newUser,
  );

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {}

  signup(email: string, password: string): Observable<AutResponseData> {
    const params = new HttpParams().append('key', Api.key);
    const body = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    return this.httpClient
      .post<AutResponseData>(Api.signup, body, { params })
      .pipe(
        catchError(this.handlingError),
        tap((autRespData: AutResponseData) =>
          this.handlingAuthentication(
            autRespData.email,
            autRespData.localId,
            autRespData.idToken,
            +autRespData.expiresIn,
          ),
        ),
      );
  }

  login(email: string, password: string): Observable<AutResponseData> {
    const params = new HttpParams().append('key', Api.key);
    const body = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    return this.httpClient
      .post<AutResponseData>(Api.signin, body, { params })
      .pipe(
        catchError(this.handlingError),
        tap((autRespData: AutResponseData) =>
          this.handlingAuthentication(
            autRespData.email,
            autRespData.localId,
            autRespData.idToken,
            +autRespData.expiresIn,
          ),
        ),
      );
  }

  private handlingAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number,
  ) {
    const expirationDate: Date = new Date(
      new Date().getTime() + expiresIn * 1000,
    );
    const user: User = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }

  private handlingError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';

    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage =
          'There is no user record corresponding to this identifier. The user may have been deleted';
        break;
      case 'INVALID_PASSWORD':
        errorMessage =
          'The password is invalid or the user does not have a password';
        break;
    }

    return throwError(errorMessage);
  }

  logout() {
    this.user.next(this.newUser);
    this.router.navigate(['/auth']);
  }
}
