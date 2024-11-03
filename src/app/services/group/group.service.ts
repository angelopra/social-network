import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateGroupDto } from 'src/app/models';
import envCommon from 'src/environments/environment.common';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) {}

  create(newGroup: CreateGroupDto): Observable<string> {
    return this.http.post<string>(envCommon.apiRoutes.group.create, newGroup);
  }
}
