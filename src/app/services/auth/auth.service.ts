import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { HOME_URL, LOGIN_URL } from 'src/app/app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loggedOut$ = new Subject<void>();

  constructor(
    private router: Router,
    private socialAuthService: SocialAuthService,
  ) {
    this.socialAuthService.authState.subscribe(user => {
      sessionStorage.setItem('idToken', user.idToken);
      router.navigateByUrl(HOME_URL);
    });
  }

  get loggedOut$(): Observable<void> {
    return this._loggedOut$.asObservable();
  }

  get idToken(): string {
    return sessionStorage.getItem('idToken') ?? '';
  }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('idToken');
    return !!token;
  }

  logout(): void {
    sessionStorage.removeItem('idToken');
    this.router.navigateByUrl(LOGIN_URL);
    this._loggedOut$.next();
  }
}
