import { inject } from "@angular/core";
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { UserGroupDto } from "../models";
import { UserService } from "../services/user/user.service";

export const userGroupResolver: ResolveFn<UserGroupDto | undefined> = (route: ActivatedRouteSnapshot, _: RouterStateSnapshot) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const userGroup: UserGroupDto | undefined = router.getCurrentNavigation()?.extras.state?.['userGroup'];
  const groupId = route.params['groupId'];

  return userGroup ?? userService.current?.groups.find(g => g.id === groupId);
}
