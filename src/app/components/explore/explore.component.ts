import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { debounceTime, finalize, Observable, of, switchMap, tap } from 'rxjs';
import { ResumedUserDto, SearchResult } from 'src/app/models';
import { UserService } from 'src/app/services/user/user.service';
import envCommon from 'src/environments/environment.common';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent {
  query = this.nnfb.control('');
  results: SearchResult<ResumedUserDto> = { items: [], count: 0 };
  isLoading = false;
  offset = 0;

  constructor(
    private nnfb: NonNullableFormBuilder,
    private userService: UserService,
  ) {
    this.query.valueChanges.pipe(
      tap(() => this.offset = 0),
      debounceTime(envCommon.debounceTimeMs),
      switchMap(() => this.search()),
    ).subscribe();
  }

  get showLoadMore(): boolean {
    return this.results.count > this.results.items.length;
  }

  loadMore(): void {
    this.offset += envCommon.searchLimit;
    const prevResults = this.results.items;
    this.search().subscribe(() => this.results.items.unshift(...prevResults));
  }

  private search(): Observable<SearchResult<ResumedUserDto>> {
    this.isLoading = true;
    return (this.query.value ?
      this.userService.search({ name: this.query.value, limit: envCommon.searchLimit, offset: this.offset }) :
      of({ items: [], count: 0 }))
      .pipe(
        tap(res => this.results = res),
        finalize(() => this.isLoading = false)
      );
  }

  clear(): void {
    this.query.reset();
  }
}
