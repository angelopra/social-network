import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HOME_URL, LOGIN_URL } from 'src/app/app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  login(username: string, password: string): void {
    localStorage.setItem('token', 'abcdef');
    this.router.navigateByUrl(HOME_URL);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl(LOGIN_URL);
  }
}
