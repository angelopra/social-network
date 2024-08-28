import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ResumedUserDto, UserDto } from 'src/app/models';
import envCommon from 'src/environments/environment.common';
import { parseTemplate } from 'url-template';
import { UserService } from '../user/user.service';
import { remove } from 'lodash-es';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  constructor(private http: HttpClient, private userService: UserService) {}

  request(followed: UserDto): Observable<void> {
    const url = parseTemplate(envCommon.apiRoutes.follow.request).expand({ followedId: followed.id });
    return this.http.post<void>(url, null).pipe(tap(() => this.userService.current?.followRequests.ours.push(followed)));
  }

  stopFollowing(followed: UserDto): Observable<void> {
    const url = parseTemplate(envCommon.apiRoutes.follow.stopFollowing).expand({ followedId: followed.id });
    return this.http.delete<void>(url).pipe(tap(() => {
      remove(followed.followers, f => f.id === this.userService.current?.id);
      remove(this.userService.current?.followRequests.ours ?? [], f => f.id === followed.id);
    }));
  }

  accept(follower: ResumedUserDto): Observable<void> {
    const url = parseTemplate(envCommon.apiRoutes.follow.accept).expand({ followerId: follower.id });
    return this.http.put<void>(url, null).pipe(tap(() => {
      remove(this.userService.current?.followRequests.theirs ?? [], f => f.id === follower.id);
      this.userService.current?.followers?.unshift(follower);
    }));
  }

  deny(follower: ResumedUserDto): Observable<void> {
    const url = parseTemplate(envCommon.apiRoutes.follow.deny).expand({ followerId: follower.id });
    return this.http.delete<void>(url).pipe(tap(() => {
      remove(this.userService.current?.followRequests.theirs ?? [], f => f.id === follower.id);
      remove(this.userService.current?.followers ?? [], f => f.id === follower.id)
    }));
  }
}
