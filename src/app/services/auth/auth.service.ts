import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HOME_URL, LOGIN_URL } from 'src/app/app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {  
  user?: SocialUser;

  constructor(
    private router: Router,
    private socialAuthService: SocialAuthService,
  ) {
    this.socialAuthService.authState.subscribe(user => {
      this.user = user;
      localStorage.setItem('idToken', user.idToken);
      router.navigateByUrl(HOME_URL);
    });
  }

  get loggedUserId(): string {
    return '1';
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('idToken');
    return !!token;
  }

  logout(): void {
    localStorage.removeItem('idToken');
    this.router.navigateByUrl(LOGIN_URL);
  }
}
