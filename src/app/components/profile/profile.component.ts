import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContentListOptions } from 'src/app/interfaces/content-list-options';
import { ResumedUserDto, UserDto, UserPostDto } from 'src/app/models';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConfirmationService } from 'src/app/services/confirmation/confirmation.service';
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
  isEditingAbout = false;
  isLoadingAboutChanges = false;
  aboutControl = this.nnfb.control('');

  listOptions: ContentListOptions<UserPostDto> = {
    image: {
      src: _ => this.user?.profilePictureUrl ?? 'assets/img/default-profile.jpg',
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
    private nnfb: NonNullableFormBuilder,
    private confirmationService: ConfirmationService,
  ) {
    this.route.data.subscribe(({ user }) => {
      this.user = user as UserDto;
      this.userService.getUserPosts(this.user.id).subscribe(p => this.posts = p.items);
      this.aboutControl = nnfb.control(this.user.about ?? '');
    });
  }

  get isSelfProfile(): boolean {
    return this.userService.current?.id === this.user?.id;
  }

  get isFollowing(): boolean {
    return !!this.user?.followers.some(f => f.id === this.userService.current?.id);
  }

  get requestedToFollow(): boolean {
    return !!this.userService.current?.followRequests.ours.some(r => r.id === this.user?.id);
  }

  get followRequests(): ResumedUserDto[] {
    return this.userService.current?.followRequests.theirs ?? [];
  }

  logout(): void {
    this.confirmationService.fire(
      () => {
        this.auth.logout();
      },
      { title: 'Logout?' },
    );
  }

  follow(): void {
    if (!this.user) {
      throw new Error('user should be defined');
    }

    this.followService.request(this.user).subscribe();
  }

  unfollow(): void {
    if (!this.user) {
      throw new Error('user should be defined');
    }
    const user = this.user;

    if (this.isFollowing) {
      this.confirmationService.fire(
        () => {
          this.followService.stopFollowing(user).subscribe();
        },
        { title: 'Are you sure you want to unfollow this user?' },
      );
    } else {
      this.followService.stopFollowing(user).subscribe();
    }
  }

  saveAbout(): void {
    if (!this.user) {
      throw new Error('user should be defined');
    }
    const user = this.user;
    const newAbout = this.aboutControl.value;

    this.confirmationService.fire(
      () => {
        this.isLoadingAboutChanges = true;
        this.userService.updateCurrentAbout(newAbout).subscribe(() => {
          this.isEditingAbout = false;
          user.about = newAbout;
          this.aboutControl = this.nnfb.control(newAbout);
        }).add(() => this.isLoadingAboutChanges = false);
      },
      { title: 'Are you sure you want to update your profile?' },
    )
  }
}
