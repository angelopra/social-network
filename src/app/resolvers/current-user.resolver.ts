import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot } from "@angular/router";
import { CurrentUserDto } from "../models";
import { UserService } from "../services/user/user.service";

export const currentUserResolver: ResolveFn<CurrentUserDto> = (route: ActivatedRouteSnapshot, _: RouterStateSnapshot) => {
  const userService = inject(UserService);

  return userService.getCurrent();
}
