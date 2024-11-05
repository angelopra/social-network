import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatePostDto, PostDto, SearchResult, Slice } from 'src/app/models';
import envCommon from 'src/environments/environment.common';
import { parseTemplate } from 'url-template';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  scrolled = 0;

  constructor(private http: HttpClient) {}

  get(slice?: Slice): Observable<SearchResult<PostDto>> {
    const options = { params: new HttpParams().appendAll({ ...slice }) };

    return this.http.get<SearchResult<PostDto>>(envCommon.apiRoutes.user.feed, options);
  }

  createPost(newPost: CreatePostDto): Observable<PostDto> {
    return this.http.post<PostDto>(envCommon.apiRoutes.post.create, newPost);
  }

  deletePost(postId: string): Observable<void> {
    const path = parseTemplate(envCommon.apiRoutes.post.delete).expand({ postId });

    return this.http.delete<void>(path);
  }
}
