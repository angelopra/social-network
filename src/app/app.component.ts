import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { LoadingService } from './services/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private auth: AuthService,
    public loadingService: LoadingService,
  ) {}

  get isLoggedIn() {
    return this.auth.isAuthenticated();
  }
}
