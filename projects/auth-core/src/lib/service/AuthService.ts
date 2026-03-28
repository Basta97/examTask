import { inject, Injectable } from '@angular/core';
import {
  ConfirmEmailVerification,
  LoginResponse,
  LoginUser,
  RegisterUser,
  User,
  VerifyEmail,
} from '../models/user';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthApi } from '../base/AuthApi';
import { AuthEndPoints } from '../enums/authEndPoints';
import { authAdaptor } from '../adaptor/authAdapter';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AuthApi {
  private readonly _Http: HttpClient = inject(HttpClient);
  private readonly _authAdapter: authAdaptor = inject(authAdaptor);

  register(user: RegisterUser): Observable<any> {
    return this._Http.post(AuthEndPoints.REGISTER, user).pipe(
      map((res: any) => this._authAdapter.adapt(res)),
      catchError((err) => of(err.error)),
    );
  }
  login(user: LoginUser): Observable<LoginResponse> {
    return this._Http.post(AuthEndPoints.LOGIN, user).pipe(
      map((res: any) => this._authAdapter.adapt(res)),
      catchError((err) => of(err.error)),
    );
  }
  verifyEmail(email: VerifyEmail): Observable<any> {
    return this._Http.post(AuthEndPoints.SEND_EMAIL_VERIFICATION, email).pipe(
      map((res: any) => this._authAdapter.adapt(res)),
      catchError((err) => of(err.error)),
    );
  }
  confirmEmail(confirm: ConfirmEmailVerification): Observable<any> {
    return this._Http.post(AuthEndPoints.CONFIRM_EMAIL_VERIFICATION, confirm).pipe(
      map((res: any) => this._authAdapter.adapt(res)),
      catchError((err) => of(err.error)),
    );
  }
  forgotPassword(email: string): Observable<any> {
    return this._Http.post(AuthEndPoints.FORGOT_PASSWORD, { email }).pipe(
      map((res: any) => this._authAdapter.adapt(res)),
      catchError((err) => of(err.error)),
    );
  }
}
