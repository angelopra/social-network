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
      localStorage.setItem('idToken', user.idToken);
      router.navigateByUrl(HOME_URL);
    });
  }

  get loggedOut$(): Observable<void> {
    return this._loggedOut$.asObservable();
  }

  get idToken(): string {
    return localStorage.getItem('idToken') ?? '';
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('idToken');
    return !!token;
  }

  logout(): void {
    localStorage.removeItem('idToken');
    this.router.navigateByUrl(LOGIN_URL);
    this._loggedOut$.next();
  }
}
