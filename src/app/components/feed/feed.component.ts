import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostDto } from 'src/app/models';
import { FeedService } from 'src/app/services/feed/feed.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { Loader } from 'src/app/utils/loader';
import { NewPostComponent } from '../new-post/new-post.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnDestroy {
  posts: PostDto[] = [];

  readonly loader = new Loader();

  constructor(
    private feedService: FeedService,
    private dialog: MatDialog,
    private loadingService: LoadingService,
    private snackBar: MatSnackBar,
  ) {
    this.loadMore();
  }

  ngOnDestroy(): void {
    this.feedService.scrolled = window.scrollY;
  }

  openPostCreation(): void {
    this.dialog.open(NewPostComponent).afterClosed().subscribe(res => {
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
    this.loader.isLoading = true;
    this.feedService.get().subscribe(p => this.posts = p.items).add(() => this.loader.isLoading = false);
  }
}
