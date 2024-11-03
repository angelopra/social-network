import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupDto, UserGroupDto } from 'src/app/models';
import { UserService } from 'src/app/services/user/user.service';
import { CreateGroupDialogComponent } from './create-group-dialog/create-group-dialog.component';
import { GroupService } from 'src/app/services/group/group.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { GROUPS_URL } from 'src/app/app.config';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent {
  filter = new FormControl('', { nonNullable: true });
  groups: UserGroupDto[] = this.userService.current?.groups ?? [];

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private groupService: GroupService,
    private loadingService: LoadingService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.filter.valueChanges.subscribe(v => this.groups = (userService.current?.groups ?? []).filter(g => g.name.toLowerCase().includes(v.toLowerCase())))
  }

  getGroupMessage(g: UserGroupDto): string {
    return g.lastPost ? `${g.lastPost.author.firstName} ${g.lastPost.author.lastName} posted about ${g.lastPost.tags?.[0] ?? 'something'}. Check it out!` : 'Welcome! Create the first post for this group!';
  }

  clearSearch(): void {
    this.filter.reset();
  }

  openGroupCreation(): void {
    this.dialog.open(CreateGroupDialogComponent).afterClosed().subscribe((newGroup?: CreateGroupDto) => {
      if (newGroup) {
        this.loadingService.isLoading = true;
        this.groupService.create(newGroup).subscribe(newGroupId => {
          this.loadingService.isLoading = false;
          this.navToGroup({ ...newGroup, id: newGroupId, createdAtUtc: new Date() });
        });
      }
    });
  }

  navToGroup(userGroup: UserGroupDto): void {
    this.router.navigate([GROUPS_URL, userGroup.id], { state: { userGroup } })
  }
}
