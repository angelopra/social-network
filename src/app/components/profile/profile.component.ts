import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserDto } from 'src/app/models/user.dto';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user?: UserDto;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
  ) {
    this.route.data.subscribe(({ user }) => this.user = user);
    this.route.data.subscribe(({ user }) => console.log);
  }

  logout() {
    this.auth.logout();
  }
}
