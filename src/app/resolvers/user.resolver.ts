import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot
} from '@angular/router';
import { UserDto } from '../models/user/user.dto';
import { UserService } from '../services/user/user.service';

export const userResolver: ResolveFn<UserDto> = (route: ActivatedRouteSnapshot, _: RouterStateSnapshot) => {
  const userService = inject(UserService);
  const userId = route.params['userId'];
  return userService.get(userId);
}
