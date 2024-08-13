import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent {
  query = this.nnfb.control('');
  results: any[] = [];

  constructor(
    private nnfb: NonNullableFormBuilder,
    private userService: UserService,
  ) {}

  search() {
    this.results = this.query.value ? this.userService.search(this.query.value) : [];
  }
}
