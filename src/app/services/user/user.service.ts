import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, share, tap } from 'rxjs';
import { CurrentUserDto, ResumedUserDto, SearchResult, Slice, UserDto, UserPostDto, UserSearchQueryParams } from 'src/app/models';
import envCommon from 'src/environments/environment.common';
import { parseTemplate } from 'url-template';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public current?: CurrentUserDto & {
    followers?: ResumedUserDto[];
    followings?: ResumedUserDto[];
  };

  private currentRequest$?: Observable<CurrentUserDto>;

  constructor(private http: HttpClient, private authService: AuthService) {
    authService.loggedOut$.subscribe(() => this.current = undefined);
  }

  get(userId: string): Observable<UserDto> {
    const url = parseTemplate(envCommon.apiRoutes.user.getById).expand({ userId });
    return this.http.get<UserDto>(url).pipe(tap(u => {
      if (u.id === this.current?.id) {
        this.current.followers = u.followers;
        this.current.followings = u.followings;
      }
    }));
  }

  getUserPosts(userId: string, slice?: Slice): Observable<UserPostDto[]> {
    let url = parseTemplate(envCommon.apiRoutes.user.posts).expand({ userId });

    if (this.authService.idToken) {
      url += '!AUTH!';
    }

    const options = { params: new HttpParams().appendAll({ ...slice }) };

    return this.http.get<UserPostDto[]>(url, options);
  }

  search(params: UserSearchQueryParams): Observable<SearchResult<ResumedUserDto>> {
    const options = { params: new HttpParams().appendAll({ ...params }) };
    return this.http.get<SearchResult<ResumedUserDto>>(envCommon.apiRoutes.user.search, options);
  }

  getCurrent(): Observable<CurrentUserDto> {
    if (!this.currentRequest$) {
      this.currentRequest$ = this.http.get<CurrentUserDto>(envCommon.apiRoutes.user.current).pipe(
        tap(u => this.current = u),
        tap(() => this.currentRequest$ = undefined),
        share(),
      );
    }

    return this.currentRequest$;
  }
}
