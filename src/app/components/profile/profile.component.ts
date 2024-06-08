import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { PostDto } from 'src/app/models/post.dto';
import { UserDto } from 'src/app/models/user.dto';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FeedService } from 'src/app/services/feed/feed.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user?: UserDto;
  posts$?: Observable<PostDto[]>;

  constructor(
    public location: Location,
    private route: ActivatedRoute,
    private auth: AuthService,
    private userService: UserService,
    private feedService: FeedService,
  ) {
    this.route.data.subscribe(({ user }) => {
      this.user = user
      this.posts$ = this.feedService.getFeed().pipe(map(posts => posts.filter(p => p.userId === this.user?.id)))
    });
  }

  get loggedUserId(): string {
    return this.userService.current?.id ?? '';
  }

  logout(): void {
    this.auth.logout();
  }
}
