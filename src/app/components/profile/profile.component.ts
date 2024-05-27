import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDto } from 'src/app/models/user.dto';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user?: UserDto;

  constructor(
    public location: Location,
    private route: ActivatedRoute,
    private auth: AuthService,
    private userService: UserService,
  ) {
    this.route.data.subscribe(({ user }) => this.user = user);
  }

  get loggedUserId(): string {
    return this.userService.current?.id ?? '';
  }

  logout(): void {
    this.auth.logout();
  }
}
