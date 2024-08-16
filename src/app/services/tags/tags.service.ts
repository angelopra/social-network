import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TagDto } from 'src/app/models';
import envCommon from 'src/environments/environment.common';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<TagDto[]> {
    return this.http.get<TagDto[]>(envCommon.apiRoutes.tag.getAll);
  }
}
