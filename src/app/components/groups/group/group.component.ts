import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CreatePostDto, PostDto, UserGroupDto } from 'src/app/models';
import { FeedService } from 'src/app/services/feed/feed.service';
import { GroupService } from 'src/app/services/group/group.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { Loader } from 'src/app/utils/loader';
import { NewPostComponent } from '../../new-post/new-post.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent {
  readonly loader = new Loader();

  group?: UserGroupDto;
  posts: PostDto[] = [];

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
    private dialog: MatDialog,
    private loadingService: LoadingService,
    private feedService: FeedService,
    private snackBar: MatSnackBar,
  ) {
    this.route.data.subscribe(({ userGroup }) => {
      this.group = userGroup;
      this.loadMore();
    });
  }

  openPostCreation(): void {
    if (!this.group) {
      throw new Error('group should be defined');
    }

    this.dialog.open(NewPostComponent, { data: this.group.id }).afterClosed().subscribe((res?: CreatePostDto) => {
      if (res) {
        this.loadingService.isLoading = true;
        this.feedService.createPost(res).subscribe(createdPost => {
          this.posts.unshift(createdPost);
          this.snackBar.open('Post created successfully!', '✓', { verticalPosition: 'top', duration: 3000 });
        }).add(() => this.loadingService.isLoading = false);
      }
    });
  }

  private loadMore(): void {
    if (!this.group) {
      throw new Error('group should be defined');
    }

    this.loader.isLoading = true;
    this.groupService.getGroupPosts(this.group.id).subscribe(p => this.posts = p.items).add(() => this.loader.isLoading = false);
  }
}
