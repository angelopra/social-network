import { Component, Input } from '@angular/core';
import { ResumedUserDto } from 'src/app/models';
import { FollowService } from 'src/app/services/follow/follow.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  @Input() users: ResumedUserDto[] = [];
  @Input() isFollowRequestList = false;
  @Input() isFollowersList = false;

  constructor(private followService: FollowService) {}

  accept(user: ResumedUserDto, event: MouseEvent): void {
    event.stopPropagation();

    this.followService.accept(user).subscribe();
  }

  deny(user: ResumedUserDto, event: MouseEvent): void {
    event.stopPropagation();

    this.followService.deny(user).subscribe();
  }
}
