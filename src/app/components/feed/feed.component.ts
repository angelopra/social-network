import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { PostDto } from 'src/app/models/post.dto';
import { FeedService } from 'src/app/services/feed/feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnDestroy {
  posts$: Observable<PostDto[]> = this.feedService.getFeed().pipe(
    tap(() => setTimeout(() => window.scroll(0, this.feedService.scrolled))),
  );

  constructor(
    private feedService: FeedService,
  ) {}

  ngOnDestroy(): void {
    this.feedService.scrolled = window.scrollY;
  }
}
