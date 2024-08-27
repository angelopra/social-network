import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ContentListOptions } from 'src/app/interfaces/content-list-options';
import { PostDto } from 'src/app/models';
import { FeedService } from 'src/app/services/feed/feed.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { NewPostComponent } from '../new-post/new-post.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnDestroy {
  posts: PostDto[] = [];
  listOptions: ContentListOptions<PostDto> = {
    image: {
      src: p => p.author.profilePictureUrl ?? 'assets/img/default-profile.jpg',
      alt: p => `${p.author.firstName} ${p.author.lastName}'s profile picture`,
      onClick: p => this.router.navigate(['/profile', p.author.id]),
    },
    title: {
      displayWith: p => `${p.author.firstName} ${p.author.lastName}`,
      onClick: p => this.router.navigate(['/profile', p.author.id]),
    },
    date: {
      displayWith: p => p.createdAtUtc,
    },
    content: {
      displayWith: p => p.content,
    },
  };
  isLoading = false;

  constructor(
    private feedService: FeedService,
    private dialog: MatDialog,
    private loadingService: LoadingService,
    private snackBar: MatSnackBar,
    private router: Router,
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
        this.feedService.createPost(res).subscribe(() => {
          setTimeout(() => this.loadingService.isLoading = false);
          this.snackBar.open('Post created successfully!', '✓', { verticalPosition: 'top', duration: 3000 });
        });
      }
    });
  }

  private loadMore(): void {
    this.isLoading = true;
    this.feedService.get().subscribe(p => this.posts = p).add(() => this.isLoading = false);
  }
}
