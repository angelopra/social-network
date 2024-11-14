import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

const INVALID_JWT_MESSAGE = 'Invalid Jwt';

@Injectable()
export class BaseInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private snackBar: MatSnackBar) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const baseReq = req.clone({ url: environment.apiUrl + req.url });
    return next.handle(baseReq).pipe(catchError(err => {
      if (typeof err.error === 'string') {
        this.snackBar.open(err.error, 'X', { verticalPosition: 'top' });
      }
      if (err.status === HttpStatusCode.Unauthorized && err.error.title === INVALID_JWT_MESSAGE) {
        this.auth.logout();
      }
      return throwError(() => err);
    }));
  }
}
