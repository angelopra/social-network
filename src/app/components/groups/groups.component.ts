import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupDto } from 'src/app/models/group.dto';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent {
  userGroups$: Observable<GroupDto[]> = this.userService.getGroups();

  constructor(private userService: UserService) {}
}
