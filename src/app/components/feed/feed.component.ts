import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.dto';
import { FeedService } from 'src/app/services/feed/feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent {
  posts$: Observable<Post[]> = this.feedService.getPosts();

  constructor(private feedService: FeedService) {}
}
