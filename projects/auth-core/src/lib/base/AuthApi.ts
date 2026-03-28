import { Observable } from 'rxjs';
import { ConfirmEmailVerification, LoginResponse, User, VerifyEmail } from '../models/user';

export abstract class AuthApi {
  abstract register(user: User): Observable<any>;
  abstract login(user: User): Observable<LoginResponse>;
  abstract verifyEmail(email: VerifyEmail): Observable<any>;
  abstract confirmEmail(confirm: ConfirmEmailVerification): Observable<any>;
  abstract forgotPassword(email: string): Observable<any>;
}
