import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import envCommon from 'src/environments/environment.common';
import { parseTemplate } from 'url-template';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  constructor(private http: HttpClient) {}

  request(followedId: string): Observable<void> {
    const url = parseTemplate(envCommon.apiRoutes.follow.request).expand({ followedId });
    return this.http.post<void>(url, null);
  }

  stopFollowing(followedId: string): Observable<void> {
    const url = parseTemplate(envCommon.apiRoutes.follow.stopFollowing).expand({ followedId });
    return this.http.delete<void>(url);
  }

  accept(followerId: string): Observable<void> {
    const url = parseTemplate(envCommon.apiRoutes.follow.accept).expand({ followerId });
    return this.http.put<void>(url, null);
  }

  deny(followerId: string): Observable<void> {
    const url = parseTemplate(envCommon.apiRoutes.follow.deny).expand({ followerId });
    return this.http.delete<void>(url);
  }

}
