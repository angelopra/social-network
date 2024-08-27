import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContentListOptions } from 'src/app/interfaces/content-list-options';
import { UserGroupDto } from 'src/app/models';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent {
  listOptions: ContentListOptions<UserGroupDto> = {
    image: {
      src: p => p.pictureUrl ?? 'assets/img/default-group.jpg',
      alt: p => `${p.name} group picture`,
    },
    title: {
      displayWith: p => p.name,
    },
    date: {
      displayWith: p => p.lastPost?.createdAtUtc ?? p.createdAtUtc,
    },
    content: {
      displayWith: p => p.lastPost ? `${p.lastPost.author.firstName} ${p.lastPost.author.lastName} posted about ${p.lastPost.tags?.[0] ?? 'something'}. Check it out!` : 'Welcome! Create the first post for this group!',
    },
    onClick: p => this.router.navigate(['/groups', p.id]),
  };

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  get groups(): UserGroupDto[] {
    return this.userService.current?.groups ?? [];
  }
}
