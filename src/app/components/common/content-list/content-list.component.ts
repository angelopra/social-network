import { Component, Input } from '@angular/core';
import { PostDto } from 'src/app/models';
import { ConfirmationService } from 'src/app/services/confirmation/confirmation.service';
import { FeedService } from 'src/app/services/feed/feed.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-content-list[posts]',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent {
  @Input() posts: PostDto[] = [];

  constructor(
    private userService: UserService,
    private feedService: FeedService,
    private confirmationService: ConfirmationService,
    private loadingService: LoadingService,
  ) {}

  deletePost(post: PostDto): void {
    this.confirmationService.fire(
      () => {
        this.loadingService.isLoading = true;
        this.feedService.deletePost(post.id).subscribe(() => {
          this.posts.splice(this.posts.indexOf(post), 1);
        }).add(() => this.loadingService.isLoading = false);
      },
      { title: 'Are you sure you want to unfollow this user?' },
    );
  }

  userIsTheAuthor = (post: PostDto) => this.userService.current?.id === post.author.id;
}
