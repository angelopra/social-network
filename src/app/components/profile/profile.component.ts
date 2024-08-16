import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { remove } from 'lodash-es';
import { ContentListOptions } from 'src/app/interfaces/content-list-options';
import { UserDto, UserPostDto } from 'src/app/models';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FollowService } from 'src/app/services/follow/follow.service';
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
    private followService: FollowService,
  ) {
    this.route.data.subscribe(({ user }) => {
      this.user = user as UserDto;
      this.userService.getUserPosts(this.user.id).subscribe(p => this.posts = p);
    });
  }

  get loggedUserId(): string {
    return this.userService.current?.id ?? '';
  }

  get isFollowing(): boolean {
    return !!this.user?.followers.some(f => f.id === this.userService.current?.id);
  }

  get requestedToFollow(): boolean {
    return !!this.userService.current?.followRequests.ours.some(r => r.id === this.user?.id);
  }

  logout(): void {
    this.auth.logout();
  }

  follow(): void {
    if (!this.user) {
      throw new Error('user should be defined');
    }
    const user = this.user;

    this.followService.request(this.user.id).subscribe(() => this.userService.current?.followRequests.ours.push(user));
  }

  unfollow(): void {
    if (!this.user) {
      throw new Error('user should be defined');
    }
    const user = this.user;

    this.followService.stopFollowing(user.id).subscribe(() => {
      remove(user.followers, f => f.id === this.userService.current?.id);
      remove(this.userService.current!.followRequests.ours, f => f.id === user.id);
    });
  }
}
