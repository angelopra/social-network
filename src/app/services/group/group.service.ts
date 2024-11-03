import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateGroupDto, PostDto, SearchResult, Slice } from 'src/app/models';
import envCommon from 'src/environments/environment.common';
import { parseTemplate } from 'url-template';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) {}

  create(newGroup: CreateGroupDto): Observable<string> {
    return this.http.post<string>(envCommon.apiRoutes.group.create, newGroup);
  }

  getGroupPosts(groupId: string, slice?: Slice): Observable<SearchResult<PostDto>> {
    const path = parseTemplate(envCommon.apiRoutes.group.getPosts).expand({ groupId });
    const options = { params: new HttpParams().appendAll({ ...slice }) };

    return this.http.get<SearchResult<PostDto>>(path, options);
  }
}
