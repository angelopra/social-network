import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot
} from '@angular/router';
import { UserDto } from '../models/user.dto';
import { UserService } from '../services/user/user.service';

export const userResolver: ResolveFn<UserDto> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const userService = inject(UserService);
  const userId = Number(route.params['userId'])
  return userService.get(userId);
}
