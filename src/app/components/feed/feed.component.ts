import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, tap } from 'rxjs';
import { PostDto } from 'src/app/models/post.dto';
import { FeedService } from 'src/app/services/feed/feed.service';
import { NewPostComponent } from '../new-post/new-post.component';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContentListOptions } from 'src/app/interfaces/content-list-options';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnDestroy {
  posts$: Observable<PostDto[]> = this.feedService.getFeed().pipe(
    tap(() => setTimeout(() => window.scroll(0, this.feedService.scrolled))),
  );
  listOptions: ContentListOptions<PostDto> = {
    image: {
      src: p => p.profilePicture,
      alt: p => `${p.firstName} ${p.lastName}'s profile picture`,
      onClick: p => this.router.navigate(['/profile', p.userId]),
    },
    title: {
      displayWith: p => `${p.firstName} ${p.lastName}`,
      onClick: p => this.router.navigate(['/profile', p.userId]),
    },
    date: {
      displayWith: p => p.createdAt,
    },
    content: {
      displayWith: p => p.content,
    },
  };

  constructor(
    private feedService: FeedService,
    private dialog: MatDialog,
    private loadingService: LoadingService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnDestroy(): void {
    this.feedService.scrolled = window.scrollY;
  }

  openPostCreation(): void {
    this.dialog.open(NewPostComponent).afterClosed().subscribe(res => {
      if (res) {
        this.loadingService.isLoading = true;
        this.feedService.createPost().subscribe(() => {
          setTimeout(() => this.loadingService.isLoading = false);
          this.snackBar.open('Post created successfully!', '✓', { verticalPosition: 'top', duration: 3000 });
        });
      }
    });
  }
}
