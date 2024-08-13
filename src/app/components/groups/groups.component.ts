import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ContentListOptions } from 'src/app/interfaces/content-list-options';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent {
  userGroups$: Observable<any[]> = this.userService.getGroups();

  listOptions: ContentListOptions<any> = {
    image: {
      src: p => p.picture,
      alt: p => `${p.name} group picture`,
    },
    title: {
      displayWith: p => p.name,
    },
    date: {
      displayWith: p => p.lastPost?.createdAt ?? p.createdAt,
    },
    content: {
      displayWith: p => p.lastPost ? `${p.lastPost.firstName} ${p.lastPost.lastName} posted about ${p.lastPost.tags?.[0] ?? 'something'}. Check it out!` : 'Welcome! Create the first post for this group!',
    },
    onClick: p => this.router.navigate(['/groups', p.id]),
  };

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }
}
