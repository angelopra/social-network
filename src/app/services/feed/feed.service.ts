import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatePostDto, PostDto, Slice } from 'src/app/models';
import envCommon from 'src/environments/environment.common';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  scrolled = 0;

  constructor(private http: HttpClient) {}

  get(slice?: Slice): Observable<PostDto[]> {
    const options = { params: new HttpParams().appendAll({ ...slice }) };
    return this.http.get<PostDto[]>(envCommon.apiRoutes.user.feed, options);
  }

  createPost(newPost: CreatePostDto): Observable<string> {
    return this.http.post<string>(envCommon.apiRoutes.post.create, newPost);
  }
}
