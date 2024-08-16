import { Component, Input } from '@angular/core';
import { ResumedUserDto } from 'src/app/models';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  @Input() users: ResumedUserDto[] = [];
}
