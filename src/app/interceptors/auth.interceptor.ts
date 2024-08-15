import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!req.url.endsWith('!AUTH!')) {
      return next.handle(req);
    }

    const authReq = req.clone({
      setHeaders: { idToken: this.auth.idToken },
      url: req.url.replace('!AUTH!', ''),
    });

    return next.handle(authReq);
  }
}
