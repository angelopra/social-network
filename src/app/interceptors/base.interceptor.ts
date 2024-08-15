import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class BaseInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const baseReq = req.clone({ url: environment.apiUrl + req.url });
    return next.handle(baseReq).pipe(catchError(err => {
      console.log(err)
      if (err.status === HttpStatusCode.Unauthorized) {
        this.auth.logout();
      }
      return throwError(() => err);
    }));
  }
}
