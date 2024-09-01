import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { ResumedUserDto } from '../models';
import { UserService } from '../services/user/user.service';

export const resumedUserResolver: ResolveFn<ResumedUserDto> = (route: ActivatedRouteSnapshot, _: RouterStateSnapshot) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const resumedUser: ResumedUserDto | undefined = router.getCurrentNavigation()?.extras.state?.['resumedUser'];
  const userId = route.params['userId'];

  return resumedUser ?? userService.get(userId);
}
