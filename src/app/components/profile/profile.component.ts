import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentListOptions } from 'src/app/interfaces/content-list-options';
import { UserDto, UserPostDto } from 'src/app/models';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user?: UserDto;
  posts: UserPostDto[] = [];

  listOptions: ContentListOptions<UserPostDto> = {
    image: {
      src: _ => this.user?.profilePictureUrl ?? '',
      alt: _ => `${this.user?.firstName} ${this.user?.lastName}'s profile picture`,
    },
    title: {
      displayWith: _ => `${this.user?.firstName} ${this.user?.lastName}`,
    },
    date: {
      displayWith: p => p.createdAtUtc,
    },
    content: {
      displayWith: p => p.content,
    },
  };

  constructor(
    public readonly location: Location,
    private route: ActivatedRoute,
    private auth: AuthService,
    private userService: UserService,
  ) {
    this.route.data.subscribe(({ user }) => {
      this.user = user as UserDto;
      this.userService.getUserPosts(this.user.id).subscribe(p => this.posts = p);
    });
  }

  get loggedUserId(): string {
    return this.userService.current?.id ?? '';
  }

  logout(): void {
    this.auth.logout();
  }
}
